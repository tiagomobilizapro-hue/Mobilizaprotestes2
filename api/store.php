<?php
declare(strict_types=1);
require __DIR__ . '/bootstrap.php';

$pdo = mobi_pdo();

$user = mobi_current_user();
if (!$user) {
    mobi_json(['ok'=>false,'message'=>'Sessão expirada. Faça login novamente.'], 401);
}

const MOBI_STATE_KEY = 'mobilizaprp-state-v3';

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);
if (!is_array($input)) $input = $_POST;
if ($method === 'POST') mobi_require_csrf($input);

function mobi_store_allowed_key($key) {
    $key = (string)$key;
    if ($key === '' || strlen($key) > 190) return false;
    $blocked = [
        'mobilizaprp-access-users-v1',
        'mobilizaprp-current-user-cpf-v1',
        'mobilizapro_access_session',
        'mobi_access_session',
        'MOBI_ACCESS_SESSION_KEY'
    ];
    if (in_array($key, $blocked, true)) return false;
    if (stripos($key, 'session') !== false) return false;
    if (stripos($key, 'access-users') !== false) return false;
    return true;
}
function mobi_digits($v, $max = 50) { return substr(preg_replace('/\D+/', '', (string)$v), 0, $max); }
function mobi_str($v, $max = 255) { $v = trim((string)$v); return function_exists('mb_substr') ? mb_substr($v, 0, $max, 'UTF-8') : substr($v, 0, $max); }
function mobi_date_or_null($v) { $v = trim((string)$v); return preg_match('/^\d{4}-\d{2}-\d{2}$/', $v) ? $v : null; }
function mobi_json_payload($v) { return json_encode($v, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES); }

function mobi_audit(PDO $pdo, string $table, string $key, string $action, array $user, array $detail = []): void {
    try {
        $stmt = $pdo->prepare('INSERT INTO auditoria_operacional (tabela, registro_chave, acao, usuario_cpf, detalhe) VALUES (?, ?, ?, ?, ?)');
        $stmt->execute([$table, $key, $action, $user['cpf'] ?? null, mobi_json_payload($detail)]);
    } catch (Throwable $e) {
        // Auditoria não pode impedir o salvamento operacional.
    }
}

function mobi_decode_state($value) {
    $state = json_decode((string)$value, true);
    if (!is_array($state)) return ['trainingMatrix'=>[], 'candidates'=>[], 'solicitations'=>[]];
    return [
        'trainingMatrix' => isset($state['trainingMatrix']) && is_array($state['trainingMatrix']) ? $state['trainingMatrix'] : [],
        'candidates' => isset($state['candidates']) && is_array($state['candidates']) ? $state['candidates'] : [],
        'solicitations' => isset($state['solicitations']) && is_array($state['solicitations']) ? $state['solicitations'] : [],
    ];
}

function mobi_save_real_state(PDO $pdo, array $state, array $user) {
    $by = $user['cpf'] ?? null;
    $pdo->beginTransaction();
    try {
        $matrixJson = mobi_json_payload($state['trainingMatrix']);
        $stmt = $pdo->prepare('INSERT INTO training_matrix_store (id, payload, atualizado_por) VALUES (1, ?, ?) ON DUPLICATE KEY UPDATE payload = VALUES(payload), atualizado_por = VALUES(atualizado_por), atualizado_em = CURRENT_TIMESTAMP');
        $stmt->execute([$matrixJson, $by]);

        $seenSolic = [];
        $solStmt = $pdo->prepare("INSERT INTO solicitacoes_mo
            (rm, digital_obra, data_solicitacao, funcao, quantidade, turno, status, cancel_reason, canceled_at, payload, criado_por, atualizado_por, ativo, excluido_em)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,1,NULL)
            ON DUPLICATE KEY UPDATE data_solicitacao=VALUES(data_solicitacao), quantidade=VALUES(quantidade), turno=VALUES(turno), status=VALUES(status), cancel_reason=VALUES(cancel_reason), canceled_at=VALUES(canceled_at), payload=VALUES(payload), atualizado_por=VALUES(atualizado_por), atualizado_em=CURRENT_TIMESTAMP, ativo=1, excluido_em=NULL");
        foreach ($state['solicitations'] as $s) {
            if (!is_array($s)) continue;
            $rm = mobi_digits($s['rm'] ?? '', 24);
            $func = mb_strtoupper(mobi_str($s['func'] ?? 'SEM FUNCAO', 120), 'UTF-8');
            if ($rm === '' || $func === '') continue;
            $obra = mb_strtoupper(mobi_str($s['digital_obra'] ?? $s['digitalObra'] ?? $s['obra_digital'] ?? '', 40), 'UTF-8');
            $qty = max(1, min(999, (int)($s['qty'] ?? 1)));
            $canceled = !empty($s['canceled']) || mb_strtoupper((string)($s['status'] ?? ''), 'UTF-8') === 'CANCELADA';
            $status = $canceled ? 'CANCELADA' : 'ABERTA';
            $turno = mb_strtoupper(mobi_str($s['turno'] ?? 'DIURNO', 12), 'UTF-8') === 'NOTURNO' ? 'NOTURNO' : 'DIURNO';
            $key = $rm . '|' . $obra . '|' . $func;
            $seenSolic[] = $key;
            $solStmt->execute([
                $rm, $obra, mobi_str($s['date'] ?? '', 20), $func, $qty, $turno, $status,
                mobi_str($s['cancel_reason'] ?? $s['cancelReason'] ?? '', 500), mobi_str($s['canceled_at'] ?? $s['canceledAt'] ?? '', 30),
                mobi_json_payload($s), $by, $by
            ]);
        }
        // Segurança multiusuário:
        // Não inativa registros ausentes no payload do navegador.
        // Cache antigo não pode remover dados reais do banco.
        // Exclusões devem passar por ação explícita do usuário.

        $seenCand = [];
        $candStmt = $pdo->prepare("INSERT INTO candidatos
            (legacy_id, nome, cpf, telefone, cidade, estado, funcao, rm, digital_obra, recrutado_em, aso_previsto, aso_marcado_em, aso_alerta, admissao_prevista, aso_real, admitido_em, treinamento_inicio_previsto, treinamento_inicio_real, treinamento_fim_previsto, treinamento_fim_real, cracha_ok, cracha_postado_em, cracha_liberacao_dias, cracha_real_em, alojado, alojamento_realizado, declinado_em, motivo_declinio, payload, criado_por, atualizado_por, ativo, excluido_em)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,1,NULL)
            ON DUPLICATE KEY UPDATE nome=VALUES(nome), cpf=VALUES(cpf), telefone=VALUES(telefone), cidade=VALUES(cidade), estado=VALUES(estado), funcao=VALUES(funcao), rm=VALUES(rm), digital_obra=VALUES(digital_obra), recrutado_em=VALUES(recrutado_em), aso_previsto=VALUES(aso_previsto), aso_marcado_em=VALUES(aso_marcado_em), aso_alerta=VALUES(aso_alerta), admissao_prevista=VALUES(admissao_prevista), aso_real=VALUES(aso_real), admitido_em=VALUES(admitido_em), treinamento_inicio_previsto=VALUES(treinamento_inicio_previsto), treinamento_inicio_real=VALUES(treinamento_inicio_real), treinamento_fim_previsto=VALUES(treinamento_fim_previsto), treinamento_fim_real=VALUES(treinamento_fim_real), cracha_ok=VALUES(cracha_ok), cracha_postado_em=VALUES(cracha_postado_em), cracha_liberacao_dias=VALUES(cracha_liberacao_dias), cracha_real_em=VALUES(cracha_real_em), alojado=VALUES(alojado), alojamento_realizado=VALUES(alojamento_realizado), declinado_em=VALUES(declinado_em), motivo_declinio=VALUES(motivo_declinio), payload=VALUES(payload), atualizado_por=VALUES(atualizado_por), atualizado_em=CURRENT_TIMESTAMP, ativo=1, excluido_em=NULL");
        foreach ($state['candidates'] as $i => $c) {
            if (!is_array($c)) continue;
            $legacyId = (int)($c['id'] ?? ($i + 1));
            if ($legacyId <= 0) $legacyId = $i + 1;
            $seenCand[] = $legacyId;
            $candStmt->execute([
                $legacyId,
                mb_strtoupper(mobi_str($c['name'] ?? 'PESSOA SEM NOME', 140), 'UTF-8'),
                mobi_digits($c['cpf'] ?? '', 11) ?: null,
                mobi_digits($c['phone'] ?? '', 20) ?: null,
                mb_strtoupper(mobi_str($c['city'] ?? '', 100), 'UTF-8') ?: null,
                mb_strtoupper(mobi_str($c['state'] ?? '', 2), 'UTF-8') ?: null,
                mb_strtoupper(mobi_str($c['func'] ?? 'SEM FUNCAO', 120), 'UTF-8'),
                mobi_digits($c['rm'] ?? $c['solicitation_rm'] ?? '', 24) ?: null,
                mb_strtoupper(mobi_str($c['digital_obra'] ?? $c['digitalObra'] ?? '', 40), 'UTF-8') ?: null,
                mobi_date_or_null($c['recruited'] ?? null),
                mobi_date_or_null($c['aso_planned'] ?? $c['asoPrevista'] ?? null),
                mobi_date_or_null($c['aso_marcado_em'] ?? $c['aso_marked_at'] ?? $c['aso_agendado'] ?? null),
                !empty($c['aso_alerta']) || !empty($c['asoAlert']) || !empty($c['needs_aso']) ? 1 : 0,
                mobi_date_or_null($c['admission_planned'] ?? $c['activation_planned'] ?? null),
                mobi_date_or_null($c['aso'] ?? $c['aso_real'] ?? null),
                mobi_date_or_null($c['admitted'] ?? $c['activation_real'] ?? null),
                mobi_date_or_null($c['training_start_planned'] ?? null),
                mobi_date_or_null($c['training_start_real'] ?? null),
                mobi_date_or_null($c['training_end_planned'] ?? null),
                mobi_date_or_null($c['training_end_real'] ?? null),
                !empty($c['badge_ok']) ? 1 : 0,
                mobi_date_or_null($c['badge_posted_date'] ?? null),
                max(0, min(60, (int)($c['badge_release_days'] ?? 5))),
                mobi_date_or_null($c['badge_real_date'] ?? $c['badge_emission_real'] ?? null),
                !empty($c['alojado']) ? 1 : 0,
                mb_strtoupper(mobi_str($c['alojamento_realizado'] ?? 'NAO', 3), 'UTF-8') === 'SIM' ? 'SIM' : 'NAO',
                mobi_date_or_null($c['declined_date'] ?? null),
                mobi_str($c['declined_reason'] ?? '', 240),
                mobi_json_payload($c),
                $by, $by
            ]);
        }
        // Segurança multiusuário:
        // Não inativa candidatos ausentes no payload do navegador.
        // Isso evita perda de informação quando alguém salva uma tela com cache antigo.
        $pdo->commit();
    } catch (Throwable $e) {
        $pdo->rollBack();
        throw $e;
    }
}

function mobi_load_real_state(PDO $pdo) {
    $matrix = [];
    $m = $pdo->query('SELECT payload FROM training_matrix_store WHERE id=1')->fetch();
    if ($m && $m['payload']) {
        $decoded = json_decode($m['payload'], true);
        if (is_array($decoded)) $matrix = $decoded;
    }
    if (!$matrix) {
        $old = $pdo->prepare('SELECT store_value FROM app_store WHERE store_key=? LIMIT 1');
        $old->execute([MOBI_STATE_KEY]);
        $raw = $old->fetchColumn();
        if ($raw) {
            $state = mobi_decode_state($raw);
            if ($state['trainingMatrix'] || $state['candidates'] || $state['solicitations']) {
                // Migração silenciosa do app_store antigo para tabelas reais.
                mobi_save_real_state($pdo, $state, ['cpf'=>'system']);
                $matrix = $state['trainingMatrix'];
            }
        }
    }

    $solicitations = [];
    $rows = $pdo->query('SELECT * FROM solicitacoes_mo WHERE ativo = 1 ORDER BY id ASC')->fetchAll();
    foreach ($rows as $r) {
        $p = $r['payload'] ? json_decode($r['payload'], true) : [];
        if (!is_array($p)) $p = [];
        $solicitations[] = array_merge($p, [
            'rm' => $r['rm'],
            'digital_obra' => $r['digital_obra'],
            'date' => $r['data_solicitacao'],
            'func' => $r['funcao'],
            'qty' => (int)$r['quantidade'],
            'turno' => $r['turno'] ?? 'DIURNO',
            'canceled' => $r['status'] === 'CANCELADA',
            'status' => $r['status'],
            'cancel_reason' => $r['cancel_reason'] ?? '',
            'canceled_at' => $r['canceled_at'] ?? ''
        ]);
    }
    $candidates = [];
    $rows = $pdo->query('SELECT * FROM candidatos WHERE ativo = 1 ORDER BY legacy_id ASC, id ASC')->fetchAll();
    foreach ($rows as $r) {
        $p = $r['payload'] ? json_decode($r['payload'], true) : [];
        if (!is_array($p)) $p = [];
        $candidates[] = array_merge($p, [
            'id' => (int)($r['legacy_id'] ?: $r['id']),
            'name' => $r['nome'],
            'cpf' => $r['cpf'] ?? '',
            'phone' => $r['telefone'] ?? '',
            'city' => $r['cidade'] ?? '',
            'state' => $r['estado'] ?? '',
            'func' => $r['funcao'],
            'rm' => $r['rm'] ?? '',
            'digital_obra' => $r['digital_obra'] ?? '',
            'recruited' => $r['recrutado_em'] ?? '',
            'aso_planned' => $r['aso_previsto'] ?? '',
            'aso_marcado_em' => $r['aso_marcado_em'] ?? '',
            'aso_alerta' => ((int)($r['aso_alerta'] ?? 0)) === 1,
            'admission_planned' => $r['admissao_prevista'] ?? '',
            'aso' => $r['aso_real'] ?? '',
            'admitted' => $r['admitido_em'] ?? '',
            'training_start_planned' => $r['treinamento_inicio_previsto'] ?? '',
            'training_start_real' => $r['treinamento_inicio_real'] ?? '',
            'training_end_planned' => $r['treinamento_fim_previsto'] ?? '',
            'training_end_real' => $r['treinamento_fim_real'] ?? '',
            'badge_ok' => ((int)$r['cracha_ok']) === 1,
            'badge_posted_date' => $r['cracha_postado_em'] ?? '',
            'badge_release_days' => (int)$r['cracha_liberacao_dias'],
            'badge_real_date' => $r['cracha_real_em'] ?? '',
            'alojado' => ((int)$r['alojado']) === 1,
            'alojamento_realizado' => $r['alojamento_realizado'] ?? 'NAO',
            'declined_date' => $r['declinado_em'] ?? '',
            'declined_reason' => $r['motivo_declinio'] ?? ''
        ]);
    }
    return ['trainingMatrix'=>$matrix, 'candidates'=>$candidates, 'solicitations'=>$solicitations];
}

function mobi_state_token(PDO $pdo) {
    $parts = [];
    foreach (['solicitacoes_mo','candidatos','training_matrix_store','app_store'] as $t) {
        try {
            $parts[] = $t . ':' . implode(',', $pdo->query("SELECT COUNT(*) AS c, COALESCE(MAX(UNIX_TIMESTAMP(atualizado_em)),0) AS m FROM $t")->fetch(PDO::FETCH_NUM));
        } catch (Throwable $e) {
            try {
                $parts[] = $t . ':' . implode(',', $pdo->query("SELECT COUNT(*) AS c, COALESCE(MAX(UNIX_TIMESTAMP(updated_at)),0) AS m FROM $t")->fetch(PDO::FETCH_NUM));
            } catch (Throwable $e2) {
                $parts[] = $t . ':0,0';
            }
        }
    }
    try { $parts[] = 'auditoria:' . (string)$pdo->query('SELECT COALESCE(MAX(id),0) FROM auditoria_operacional')->fetchColumn(); }
    catch (Throwable $e) { $parts[] = 'auditoria:0'; }
    return sha1(implode('|', $parts));
}

if ($method === 'GET') {
    $token = mobi_state_token($pdo);
    $since = (string)($_GET['since'] ?? '');
    if ($since && hash_equals($token, $since)) mobi_json(['ok'=>true, 'not_modified'=>true, 'token'=>$token, 'items'=>[]]);

    $items = [];
    $state = mobi_load_real_state($pdo);
    $items[MOBI_STATE_KEY] = mobi_json_payload($state);

    $rows = $pdo->query('SELECT store_key, store_value FROM app_store WHERE ativo = 1 AND store_key <> ' . $pdo->quote(MOBI_STATE_KEY))->fetchAll();
    foreach ($rows as $r) $items[$r['store_key']] = $r['store_value'];
    mobi_json(['ok'=>true,'items'=>$items,'token'=>$token,'real_tables'=>true]);
}


function mobi_require_fresh_state(PDO $pdo, array $input): void {
    $base = trim((string)($input['base_token'] ?? ''));
    if ($base === '') return;
    $current = mobi_state_token($pdo);
    if (!hash_equals($current, $base)) {
        mobi_json([
            'ok' => false,
            'conflict' => true,
            'message' => 'Este cadastro foi alterado por outro usuário. Atualize a tela antes de salvar para evitar sobrescrever informações.',
            'token' => $current
        ], 409);
    }
}

$action = $_GET['action'] ?? ($input['action'] ?? 'set');

if ($action === 'save_state' && $method === 'POST') {
    $state = $input['state'] ?? null;
    if (!is_array($state)) {
        mobi_json(['ok'=>false,'message'=>'Estado operacional inválido.'], 422);
    }
    mobi_require_fresh_state($pdo, $input);
    $before = mobi_state_token($pdo);
    mobi_save_real_state($pdo, mobi_decode_state(mobi_json_payload($state)), $user);
    $afterSave = mobi_state_token($pdo);
    mobi_audit($pdo, 'estado_operacional', $afterSave, 'save_state_direct', $user, [
        'candidates' => is_array($state['candidates'] ?? null) ? count($state['candidates']) : 0,
        'solicitations' => is_array($state['solicitations'] ?? null) ? count($state['solicitations']) : 0,
        'trainingMatrix' => is_array($state['trainingMatrix'] ?? null) ? count($state['trainingMatrix']) : 0,
        'before_token' => $before,
        'after_save_token' => $afterSave
    ]);
    $finalToken = mobi_state_token($pdo);
    mobi_json(['ok'=>true,'real_tables'=>true,'token'=>$finalToken]);
}

if ($action === 'set' && $method === 'POST') {
    $key = (string)($input['key'] ?? '');
    $value = (string)($input['value'] ?? '');
    if (!mobi_store_allowed_key($key)) mobi_json(['ok'=>false,'message'=>'Chave de armazenamento não permitida.'], 422);
    if (strlen($value) > 16 * 1024 * 1024) mobi_json(['ok'=>false,'message'=>'Registro muito grande para sincronizar.'], 413);
    if ($key === MOBI_STATE_KEY) {
        mobi_require_fresh_state($pdo, $input);
        mobi_save_real_state($pdo, mobi_decode_state($value), $user);
        mobi_json(['ok'=>true,'real_tables'=>true,'token'=>mobi_state_token($pdo)]);
    }
    $stmt = $pdo->prepare('INSERT INTO app_store (store_key, store_value, updated_by, ativo, excluido_em) VALUES (?,?,?,1,NULL) ON DUPLICATE KEY UPDATE store_value=VALUES(store_value), updated_by=VALUES(updated_by), updated_at=CURRENT_TIMESTAMP, ativo=1, excluido_em=NULL');
    $stmt->execute([$key, $value, $user['cpf'] ?? null]);
    mobi_json(['ok'=>true,'token'=>mobi_state_token($pdo)]);
}


if ($action === 'delete_solicitation_definitive' && $method === 'POST') {
    // Hotfix multiusuário: a ação mantém o nome antigo para compatibilidade com a tela,
    // mas no banco passa a ser exclusão lógica controlada. Nada é apagado fisicamente.
    $rm = mobi_digits($input['rm'] ?? '', 24);
    $obra = function_exists('mb_strtoupper') ? mb_strtoupper(mobi_str($input['digital_obra'] ?? $input['digitalObra'] ?? '', 40), 'UTF-8') : strtoupper(mobi_str($input['digital_obra'] ?? $input['digitalObra'] ?? '', 40));
    $func = function_exists('mb_strtoupper') ? mb_strtoupper(mobi_str($input['func'] ?? '', 120), 'UTF-8') : strtoupper(mobi_str($input['func'] ?? '', 120));
    if ($rm === '' || $func === '') mobi_json(['ok'=>false,'message'=>'Solicitação inválida para exclusão.'], 422);
    $stmt = $pdo->prepare("UPDATE solicitacoes_mo SET ativo=0, status='EXCLUIDA', excluido_em=CURRENT_TIMESTAMP, atualizado_por=?, atualizado_em=CURRENT_TIMESTAMP WHERE rm = ? AND digital_obra = ? AND funcao = ? AND ativo = 1");
    $stmt->execute([$user['cpf'] ?? null, $rm, $obra, $func]);
    mobi_audit($pdo, 'solicitacoes_mo', $rm . '|' . $obra . '|' . $func, 'inativacao_controlada', $user, ['affected'=>$stmt->rowCount()]);
    mobi_json(['ok'=>true,'inactivated'=>$stmt->rowCount(),'token'=>mobi_state_token($pdo)]);
}


if ($action === 'delete_candidate_definitive' && $method === 'POST') {
    // Hotfix multiusuário: exclusão definitiva convertida em inativação lógica.
    // Preserva histórico e permite auditoria/recuperação se necessário.
    mobi_require_admin();
    $legacyId = (int)($input['id'] ?? $input['legacy_id'] ?? 0);
    $cpf = mobi_digits($input['cpf'] ?? '', 11);
    $motivo = mobi_str($input['motivo'] ?? '', 300);
    if ($legacyId <= 0 && $cpf === '') mobi_json(['ok'=>false,'message'=>'Cadastro inválido para exclusão.'], 422);
    if ($motivo === '') mobi_json(['ok'=>false,'message'=>'Motivo obrigatório para exclusão.'], 422);

    if ($legacyId > 0 && $cpf !== '') {
        $stmt = $pdo->prepare('UPDATE candidatos SET ativo=0, excluido_em=CURRENT_TIMESTAMP, motivo_declinio=?, atualizado_por=?, atualizado_em=CURRENT_TIMESTAMP WHERE (legacy_id = ? OR cpf = ?) AND ativo = 1');
        $stmt->execute([$motivo, $user['cpf'] ?? null, $legacyId, $cpf]);
    } elseif ($legacyId > 0) {
        $stmt = $pdo->prepare('UPDATE candidatos SET ativo=0, excluido_em=CURRENT_TIMESTAMP, motivo_declinio=?, atualizado_por=?, atualizado_em=CURRENT_TIMESTAMP WHERE legacy_id = ? AND ativo = 1');
        $stmt->execute([$motivo, $user['cpf'] ?? null, $legacyId]);
    } else {
        $stmt = $pdo->prepare('UPDATE candidatos SET ativo=0, excluido_em=CURRENT_TIMESTAMP, motivo_declinio=?, atualizado_por=?, atualizado_em=CURRENT_TIMESTAMP WHERE cpf = ? AND ativo = 1');
        $stmt->execute([$motivo, $user['cpf'] ?? null, $cpf]);
    }
    mobi_audit($pdo, 'candidatos', ($legacyId > 0 ? (string)$legacyId : $cpf), 'inativacao_controlada', $user, ['motivo'=>$motivo, 'affected'=>$stmt->rowCount()]);
    mobi_json(['ok'=>true,'inactivated'=>$stmt->rowCount(),'token'=>mobi_state_token($pdo)]);
}

if ($action === 'remove' && $method === 'POST') {
    $key = (string)($input['key'] ?? '');
    if (!mobi_store_allowed_key($key)) mobi_json(['ok'=>false,'message'=>'Chave de armazenamento não permitida.'], 422);
    if ($key === MOBI_STATE_KEY) mobi_json(['ok'=>false,'message'=>'O estado principal usa tabelas MySQL reais e não pode ser removido por esta rota.'], 422);
    $stmt = $pdo->prepare('UPDATE app_store SET ativo=0, excluido_em=CURRENT_TIMESTAMP WHERE store_key = ?');
    $stmt->execute([$key]);
    mobi_json(['ok'=>true,'token'=>mobi_state_token($pdo)]);
}

if ($action === 'bulk' && $method === 'POST') {
    $items = $input['items'] ?? [];
    if (!is_array($items)) mobi_json(['ok'=>false,'message'=>'Dados inválidos.'], 422);
    $stmt = $pdo->prepare('INSERT INTO app_store (store_key, store_value, updated_by, ativo, excluido_em) VALUES (?,?,?,1,NULL) ON DUPLICATE KEY UPDATE store_value=VALUES(store_value), updated_by=VALUES(updated_by), updated_at=CURRENT_TIMESTAMP, ativo=1, excluido_em=NULL');
    $count = 0;
    foreach ($items as $key => $value) {
        if (!mobi_store_allowed_key($key)) continue;
        $value = (string)$value;
        if (strlen($value) > 16 * 1024 * 1024) continue;
        if ((string)$key === MOBI_STATE_KEY) {
            mobi_require_fresh_state($pdo, $input);
            mobi_save_real_state($pdo, mobi_decode_state($value), $user);
            $count++;
            continue;
        }
        $stmt->execute([(string)$key, $value, $user['cpf'] ?? null]);
        $count++;
    }
    mobi_json(['ok'=>true,'saved'=>$count,'real_tables'=>true,'token'=>mobi_state_token($pdo)]);
}

mobi_json(['ok'=>false,'message'=>'Ação inválida.'], 404);
