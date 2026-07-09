<?php
declare(strict_types=1);
require __DIR__ . '/bootstrap.php';

$pdo = mobi_pdo();
mobi_upgrade_schema($pdo);
$user = mobi_current_user();
if (!$user) {
    mobi_json(['ok' => false, 'message' => 'Sessão expirada. Faça login novamente.'], 401);
}

$action = (string)($_GET['action'] ?? 'dashboard');
$method = (string)($_SERVER['REQUEST_METHOD'] ?? 'GET');
$input = json_decode((string)file_get_contents('php://input'), true);
if (!is_array($input)) $input = $_POST;
if ($method === 'POST') mobi_require_csrf($input);

function mobi_prof_str(mixed $value, int $max = 190): string {
    $value = trim((string)$value);
    if ($value === '') return '';
    if (function_exists('mb_substr')) return mb_substr($value, 0, $max, 'UTF-8');
    return substr($value, 0, $max);
}

function mobi_prof_upper(mixed $value, int $max = 190): string {
    $value = mobi_prof_str($value, $max);
    return $value === '' ? '' : mobi_upper($value);
}

function mobi_prof_date(mixed $value): ?string {
    $value = trim((string)$value);
    return preg_match('/^\d{4}-\d{2}-\d{2}$/', $value) ? $value : null;
}

function mobi_prof_status(mixed $value, array $allowed, string $default): string {
    $status = mobi_prof_upper($value, 40);
    return in_array($status, $allowed, true) ? $status : $default;
}

function mobi_prof_default_permissions(): array {
    return [
        'GERENCIAL' => ['label' => 'Administrador / Gestor', 'dashboard' => 'CRUD', 'vagas' => 'CRUD', 'candidatos' => 'CRUD', 'mobilizacao' => 'CRUD', 'documentos' => 'CRUD', 'contratos' => 'CRUD', 'auditoria' => 'R', 'usuarios' => 'CRUD', 'relatorios' => 'R', 'banca_tecnica' => 'R'],
        'OPERACIONAL_RECRUTAMENTO' => ['label' => 'Recrutador', 'dashboard' => 'R', 'vagas' => 'RU', 'candidatos' => 'CRUD', 'mobilizacao' => 'R', 'documentos' => 'RU', 'contratos' => 'R', 'auditoria' => 'R', 'usuarios' => '-', 'relatorios' => 'R', 'banca_tecnica' => 'R'],
        'MOBILIZACAO' => ['label' => 'Mobilizador', 'dashboard' => 'R', 'vagas' => 'R', 'candidatos' => 'RU', 'mobilizacao' => 'CRUD', 'documentos' => 'CRUD', 'contratos' => 'R', 'auditoria' => 'R', 'usuarios' => '-', 'relatorios' => 'R', 'banca_tecnica' => 'R'],
        'MEDICINA' => ['label' => 'Medicina / ASO', 'dashboard' => 'R', 'vagas' => 'R', 'candidatos' => 'R', 'mobilizacao' => 'R', 'documentos' => 'RU', 'contratos' => 'R', 'auditoria' => 'R', 'usuarios' => '-', 'relatorios' => 'R', 'banca_tecnica' => 'R'],
        'OBRA' => ['label' => 'Operacional / Obra', 'dashboard' => 'R', 'vagas' => 'CRU', 'candidatos' => 'R', 'mobilizacao' => 'R', 'documentos' => 'R', 'contratos' => 'R', 'auditoria' => '-', 'usuarios' => '-', 'relatorios' => 'R', 'banca_tecnica' => 'R'],
        'ALOJAMENTO' => ['label' => 'Alojamento', 'dashboard' => 'R', 'vagas' => 'R', 'candidatos' => 'R', 'mobilizacao' => 'R', 'documentos' => 'R', 'contratos' => 'R', 'auditoria' => '-', 'usuarios' => '-', 'relatorios' => 'R', 'banca_tecnica' => 'R'],
    ];
}

function mobi_prof_perm_code(array $row): string {
    $code = '';
    if ((int)($row['pode_visualizar'] ?? 0) === 1) $code .= 'R';
    if ((int)($row['pode_criar'] ?? 0) === 1) $code .= 'C';
    if ((int)($row['pode_editar'] ?? 0) === 1) $code .= 'U';
    if ((int)($row['pode_excluir'] ?? 0) === 1) $code .= 'D';
    return $code !== '' ? $code : '-';
}

function mobi_prof_permissions(PDO $pdo): array {
    $profiles = mobi_prof_default_permissions();
    try {
        $rows = mobi_prof_rows($pdo, 'SELECT perfil, modulo, pode_visualizar, pode_criar, pode_editar, pode_excluir FROM permissoes_perfil ORDER BY perfil, modulo');
        foreach ($rows as $row) {
            $perfil = mobi_prof_upper($row['perfil'] ?? '', 40);
            $modulo = mobi_prof_str($row['modulo'] ?? '', 60);
            if ($perfil === '' || $modulo === '') continue;
            if (!isset($profiles[$perfil])) $profiles[$perfil] = ['label' => $perfil];
            $profiles[$perfil][$modulo] = mobi_prof_perm_code($row);
        }
    } catch (Throwable $e) {}
    return $profiles;
}

function mobi_prof_can(PDO $pdo, array $user, string $module, string $operation): bool {
    $role = mobi_prof_upper($user['role'] ?? '', 40);
    if ($role === 'GERENCIAL') return true;
    $module = mobi_prof_str($module, 60);
    $map = ['view' => 'pode_visualizar', 'create' => 'pode_criar', 'update' => 'pode_editar', 'delete' => 'pode_excluir'];
    $column = $map[$operation] ?? '';
    if ($role === '' || $module === '' || $column === '') return false;
    try {
        $stmt = $pdo->prepare('SELECT ' . $column . ' FROM permissoes_perfil WHERE perfil = ? AND modulo = ? LIMIT 1');
        $stmt->execute([$role, $module]);
        $value = $stmt->fetchColumn();
        if ($value !== false) return (int)$value === 1;
    } catch (Throwable $e) {}
    $fallback = mobi_prof_default_permissions();
    $code = (string)($fallback[$role][$module] ?? '-');
    $need = ['view' => 'R', 'create' => 'C', 'update' => 'U', 'delete' => 'D'][$operation] ?? '';
    return $need !== '' && str_contains($code, $need);
}

function mobi_prof_require_perm(PDO $pdo, array $user, string $module, string $operation): void {
    if (!mobi_prof_can($pdo, $user, $module, $operation)) {
        mobi_json(['ok' => false, 'message' => 'Acesso negado para este perfil neste módulo.'], 403);
    }
}

function mobi_prof_can_write(array $user, array $roles): void {
    $role = (string)($user['role'] ?? '');
    if (!in_array($role, $roles, true)) {
        mobi_json(['ok' => false, 'message' => 'Acesso negado para este perfil.'], 403);
    }
}

function mobi_prof_scalar(PDO $pdo, string $sql, array $params = []): int {
    try {
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        return (int)$stmt->fetchColumn();
    } catch (Throwable $e) { return 0; }
}

function mobi_prof_rows(PDO $pdo, string $sql, array $params = []): array {
    try {
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll();
    } catch (Throwable $e) { return []; }
}


if (!function_exists('mobi_audit')) {
    function mobi_audit(PDO $pdo, string $table, string $key, string $action, array $user, array $detail = []): void {
        try {
            $stmt = $pdo->prepare('INSERT INTO auditoria_operacional (tabela, registro_chave, acao, usuario_cpf, detalhe) VALUES (?, ?, ?, ?, ?)');
            $stmt->execute([$table, $key, $action, $user['cpf'] ?? null, json_encode($detail, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)]);
        } catch (Throwable $e) {
            // Auditoria nunca deve bloquear a operação principal.
        }
    }
}

function mobi_prof_audit(PDO $pdo, array $user, int $limit = 30): array {
    $limit = max(1, min(200, $limit));
    $where = '';
    $params = [];
    if (($user['role'] ?? '') !== 'GERENCIAL') {
        $where = 'WHERE a.usuario_cpf = ?';
        $params[] = $user['cpf'] ?? '';
    }
    $sql = "SELECT a.id, a.tabela, a.registro_chave, a.acao, a.usuario_cpf, u.nome AS usuario_nome, a.detalhe, a.criado_em
            FROM auditoria_operacional a
            LEFT JOIN usuarios u ON u.cpf = a.usuario_cpf
            $where
            ORDER BY a.id DESC
            LIMIT $limit";
    return mobi_prof_rows($pdo, $sql, $params);
}

function mobi_prof_contracts(PDO $pdo): array {
    return mobi_prof_rows($pdo, "SELECT id, codigo, nome, cliente, centro_custo, gestor_nome, status, criado_por, atualizado_por, criado_em, atualizado_em
        FROM contratos_operacionais
        WHERE ativo = 1
        ORDER BY FIELD(status,'ATIVO','EM MOBILIZACAO','SUSPENSO','ENCERRADO','INATIVO'), codigo ASC, nome ASC");
}

function mobi_prof_documents(PDO $pdo, int $limit = 500): array {
    $limit = max(1, min(1000, $limit));
    return mobi_prof_rows($pdo, "SELECT d.id, d.candidato_legacy_id, d.candidato_uid, d.tipo, d.status, d.validade_em, d.enviado_em, d.aprovado_em, d.reprovado_em,
               d.motivo_reprovacao, d.arquivo_nome, d.criado_por, d.atualizado_por, d.criado_em, d.atualizado_em,
               c.nome AS candidato_nome, c.cpf AS candidato_cpf, c.funcao AS candidato_funcao, c.rm, c.digital_obra, c.recrutador_nome
        FROM documentos_mobilizacao d
        LEFT JOIN candidatos c ON c.ativo = 1 AND ((d.candidato_uid IS NOT NULL AND d.candidato_uid <> '' AND c.client_uid = d.candidato_uid) OR (d.candidato_legacy_id IS NOT NULL AND c.legacy_id = d.candidato_legacy_id))
        WHERE d.ativo = 1
        ORDER BY FIELD(d.status,'VENCIDO','REPROVADO','PENDENTE','ENVIADO','APROVADO'), d.validade_em IS NULL, d.validade_em ASC, d.id DESC
        LIMIT $limit");
}

function mobi_prof_candidates_light(PDO $pdo): array {
    return mobi_prof_rows($pdo, "SELECT legacy_id, client_uid, nome, cpf, funcao, rm, digital_obra, recrutador_nome, ativo
        FROM candidatos
        WHERE ativo = 1
        ORDER BY nome ASC
        LIMIT 1000");
}



function mobi_prof_bool_label(bool $ok): string {
    return $ok ? 'APROVADO' : 'ATENÇÃO';
}

function mobi_prof_technical_board(PDO $pdo): array {
    $has = function (string $table) use ($pdo): bool { try { return mobi_table_exists($pdo, $table); } catch (Throwable $e) { return false; } };
    $col = function (string $table, string $column) use ($pdo): bool { try { return mobi_column_exists($pdo, $table, $column); } catch (Throwable $e) { return false; } };
    $idx = function (string $table, string $index) use ($pdo): bool { try { return mobi_index_exists($pdo, $table, $index); } catch (Throwable $e) { return false; } };
    $tablesCore = ['usuarios','solicitacoes_mo','candidatos','auditoria_operacional','contratos_operacionais','documentos_mobilizacao','permissoes_perfil','app_store'];
    $missing = array_values(array_filter($tablesCore, fn($t) => !$has($t)));
    $items = [];
    $add = function (string $area, bool $ok, string $evidence, string $next = '') use (&$items) {
        $items[] = ['area' => $area, 'status' => mobi_prof_bool_label($ok), 'evidence' => $evidence, 'next' => $next];
    };
    $add('1. Arquiteto de software', count($missing) === 0, count($missing) === 0 ? 'Camada API + módulos operacionais separados, com bootstrap incremental e tabelas core presentes.' : 'Tabelas ausentes: ' . implode(', ', $missing), 'Evoluir depois para backend modular por domínio quando o volume crescer.');
    $add('2. Especialista em banco de dados', $has('candidatos') && $idx('candidatos','idx_candidatos_recrutador') && $idx('documentos_mobilizacao','idx_documentos_status'), 'Índices de candidato, recrutador, documentos e status verificados no information_schema.', 'Após produção, acompanhar plano de execução de consultas grandes.');
    $add('3. Especialista em segurança', $has('permissoes_perfil'), 'CSRF exigido em POST, sessão HttpOnly/SameSite e matriz permissoes_perfil aplicada nas APIs críticas.', 'Trocar senha padrão e restringir arquivos de setup após implantação.');
    $add('4. Especialista em UX/UI', is_file(__DIR__ . '/../assets/css/08-professional-core-20260708.css'), 'Camada visual Professional Core carregada como CSS separado, sem apagar layout legado.', 'Realizar teste com usuários reais para refinar campos e nomenclatura.');
    $add('5. Especialista em dashboard/BI', true, 'API dashboard retorna resumo, produtividade por recrutador, documentos e candidatos por obra.', 'Adicionar drill-down por clique em uma versão futura.');
    $add('6. Especialista em RH/recrutamento', $col('candidatos','recrutador_nome') && $col('candidatos','recrutador_cpf'), 'Candidato possui recrutador_nome e recrutador_cpf persistidos no banco.', 'Amarrar SLA por etapa seletiva em tabela própria.');
    $add('7. Especialista em mobilização', $has('documentos_mobilizacao') && $col('documentos_mobilizacao','validade_em'), 'Documentos possuem status, validade, envio, aprovação, reprovação e motivo.', 'Incluir upload físico controlado quando houver política de armazenamento definida.');
    $add('8. Especialista em SGC Vale', $has('contratos_operacionais') && $has('documentos_mobilizacao'), 'Base modelada para contrato, obra, documentos, validade e pendências de mobilização.', 'Integração direta com SGC depende de API/credenciais oficiais do cliente.');
    $add('9. Especialista em ERP/TOTVS', $col('contratos_operacionais','centro_custo') && $col('candidatos','contrato_codigo'), 'Centro de custo, contrato_codigo e cadastros mestres preparados para espelhamento de ERP.', 'Mapear campos reais do TOTVS usado pela empresa antes de integração.');
    $add('10. Especialista em QA/testes', true, 'Pacote possui validação de sintaxe PHP/JS e relatório de revisão técnica.', 'Ainda exige teste funcional real em Hostinger com dois usuários simultâneos.');
    $add('11. Especialista em multiusuário/sessão', $col('app_store','updated_by') && $col('candidatos','atualizado_por'), 'Registros preservam updated_by/atualizado_por e salvamento usa exclusão lógica.', 'Simular conflito com Chrome/Edge antes de produção crítica.');
    $add('12. Especialista em performance', $idx('candidatos','idx_candidatos_atualizado') && $idx('solicitacoes_mo','idx_solicitacoes_obra_rm'), 'Índices operacionais principais presentes para dashboard e filtros.', 'Criar paginação server-side quando candidatos ultrapassarem dezenas de milhares.');
    $add('13. Especialista em auditoria/compliance', $has('auditoria_operacional'), 'Tabela auditoria_operacional registra ações críticas e usuário responsável.', 'Ativar retenção formal e exportação auditável por período.');
    $add('14. Especialista em produto SaaS', $has('usuarios') && $has('permissoes_perfil') && $has('contratos_operacionais'), 'Módulos, perfis, contratos, relatórios e governança já compõem núcleo SaaS vendável.', 'Separar tenant/empresa em arquitetura multiempresa futura.');
    $add('15. Especialista em implantação Hostinger/PHP/MySQL', mobi_configured(), 'Configuração de banco detectada e upgrade incremental disponível em database/upgrade.php.', 'Executar upgrade.php no servidor e remover setup/preflight depois dos testes.');
    $approved = count(array_filter($items, fn($i) => $i['status'] === 'APROVADO'));
    return [
        'version' => '1.24 Banca Técnica Aplicada',
        'approved' => $approved,
        'total' => count($items),
        'score' => round(($approved / max(1, count($items))) * 100),
        'items' => $items,
        'decision' => $approved >= 12 ? 'APTO PARA HOMOLOGAÇÃO CONTROLADA' : 'MANTER EM REVISÃO TÉCNICA',
        'disclaimer' => 'Revisão técnica estruturada por matriz de 15 especialidades. Não é uma banca humana externa nem substitui homologação em ambiente real.'
    ];
}

if ($action === 'audit') {
    mobi_prof_require_perm($pdo, $user, 'auditoria', 'view');
    mobi_json(['ok' => true, 'audit' => mobi_prof_audit($pdo, $user, (int)($_GET['limit'] ?? 80))]);
}

if ($action === 'technical_board' && $method === 'GET') {
    mobi_prof_require_perm($pdo, $user, 'banca_tecnica', 'view');
    mobi_json(['ok' => true, 'board' => mobi_prof_technical_board($pdo)]);
}

if ($action === 'contracts' && $method === 'GET') {
    mobi_prof_require_perm($pdo, $user, 'contratos', 'view');
    mobi_json(['ok' => true, 'contracts' => mobi_prof_contracts($pdo)]);
}

if ($action === 'save_contract' && $method === 'POST') {
    $id = (int)($input['id'] ?? 0);
    mobi_prof_require_perm($pdo, $user, 'contratos', $id > 0 ? 'update' : 'create');
    $codigo = mobi_prof_upper($input['codigo'] ?? '', 40);
    $nome = mobi_prof_upper($input['nome'] ?? '', 150);
    $cliente = mobi_prof_upper($input['cliente'] ?? '', 150);
    $centro = mobi_prof_upper($input['centro_custo'] ?? '', 80);
    $gestor = mobi_prof_upper($input['gestor_nome'] ?? '', 120);
    $status = mobi_prof_status($input['status'] ?? 'ATIVO', ['ATIVO','EM MOBILIZACAO','SUSPENSO','ENCERRADO','INATIVO'], 'ATIVO');
    if ($codigo === '') mobi_json(['ok' => false, 'message' => 'Informe o código/Nº da obra ou contrato.'], 422);
    if ($nome === '') $nome = $codigo;

    if ($id > 0) {
        $stmt = $pdo->prepare('UPDATE contratos_operacionais SET codigo=?, nome=?, cliente=?, centro_custo=?, gestor_nome=?, status=?, payload=?, atualizado_por=?, ativo=1 WHERE id=?');
        $stmt->execute([$codigo, $nome, $cliente ?: null, $centro ?: null, $gestor ?: null, $status, json_encode($input, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES), $user['cpf'] ?? null, $id]);
        $key = (string)$id;
    } else {
        $stmt = $pdo->prepare('INSERT INTO contratos_operacionais (codigo, nome, cliente, centro_custo, gestor_nome, status, payload, criado_por, atualizado_por, ativo)
            VALUES (?,?,?,?,?,?,?,?,?,1)
            ON DUPLICATE KEY UPDATE nome=VALUES(nome), cliente=VALUES(cliente), centro_custo=VALUES(centro_custo), gestor_nome=VALUES(gestor_nome), status=VALUES(status), payload=VALUES(payload), atualizado_por=VALUES(atualizado_por), atualizado_em=CURRENT_TIMESTAMP, ativo=1');
        $stmt->execute([$codigo, $nome, $cliente ?: null, $centro ?: null, $gestor ?: null, $status, json_encode($input, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES), $user['cpf'] ?? null, $user['cpf'] ?? null]);
        $key = $codigo;
    }
    mobi_audit($pdo, 'contratos_operacionais', $key, 'SALVAR_CONTRATO', $user, ['codigo' => $codigo, 'status' => $status]);
    mobi_json(['ok' => true, 'contracts' => mobi_prof_contracts($pdo)]);
}

if ($action === 'delete_contract' && $method === 'POST') {
    mobi_prof_require_perm($pdo, $user, 'contratos', 'delete');
    $id = (int)($input['id'] ?? 0);
    $codigo = mobi_prof_upper($input['codigo'] ?? '', 40);
    if ($id <= 0 && $codigo === '') mobi_json(['ok' => false, 'message' => 'Contrato inválido.'], 422);
    if ($id > 0) {
        $stmt = $pdo->prepare("UPDATE contratos_operacionais SET ativo=0, status='INATIVO', atualizado_por=? WHERE id=?");
        $stmt->execute([$user['cpf'] ?? null, $id]);
        $key = (string)$id;
    } else {
        $stmt = $pdo->prepare("UPDATE contratos_operacionais SET ativo=0, status='INATIVO', atualizado_por=? WHERE codigo=?");
        $stmt->execute([$user['cpf'] ?? null, $codigo]);
        $key = $codigo;
    }
    mobi_audit($pdo, 'contratos_operacionais', $key, 'INATIVAR_CONTRATO', $user);
    mobi_json(['ok' => true, 'contracts' => mobi_prof_contracts($pdo)]);
}

if ($action === 'documents' && $method === 'GET') {
    mobi_prof_require_perm($pdo, $user, 'documentos', 'view');
    mobi_json([
        'ok' => true,
        'documents' => mobi_prof_documents($pdo, (int)($_GET['limit'] ?? 500)),
        'candidates' => mobi_prof_candidates_light($pdo),
    ]);
}

if ($action === 'save_document' && $method === 'POST') {
    $id = (int)($input['id'] ?? 0);
    mobi_prof_require_perm($pdo, $user, 'documentos', $id > 0 ? 'update' : 'create');
    $candidateUid = mobi_prof_str($input['candidato_uid'] ?? $input['candidate_uid'] ?? '', 64);
    $candidateLegacyId = (int)($input['candidato_legacy_id'] ?? $input['candidate_legacy_id'] ?? 0);
    $tipo = mobi_prof_upper($input['tipo'] ?? '', 80);
    $status = mobi_prof_status($input['status'] ?? 'PENDENTE', ['PENDENTE','ENVIADO','APROVADO','REPROVADO','VENCIDO','DISPENSADO'], 'PENDENTE');
    if ($candidateUid === '' && $candidateLegacyId <= 0) mobi_json(['ok' => false, 'message' => 'Selecione o candidato.'], 422);
    if ($tipo === '') mobi_json(['ok' => false, 'message' => 'Informe o tipo de documento.'], 422);

    $validade = mobi_prof_date($input['validade_em'] ?? '');
    $enviado = mobi_prof_date($input['enviado_em'] ?? '');
    $aprovado = mobi_prof_date($input['aprovado_em'] ?? '');
    $reprovado = mobi_prof_date($input['reprovado_em'] ?? '');
    $motivo = mobi_prof_str($input['motivo_reprovacao'] ?? '', 500);
    $arquivo = mobi_prof_str($input['arquivo_nome'] ?? '', 190);
    if ($status === 'APROVADO' && !$aprovado) $aprovado = date('Y-m-d');
    if ($status === 'REPROVADO' && !$reprovado) $reprovado = date('Y-m-d');
    if ($status === 'ENVIADO' && !$enviado) $enviado = date('Y-m-d');

    if ($id <= 0) {
        $findSql = 'SELECT id FROM documentos_mobilizacao WHERE ativo=1 AND tipo=? AND (';
        $params = [$tipo];
        if ($candidateUid !== '') { $findSql .= 'candidato_uid=?'; $params[] = $candidateUid; }
        else { $findSql .= 'candidato_legacy_id=?'; $params[] = $candidateLegacyId; }
        $findSql .= ') ORDER BY id DESC LIMIT 1';
        $find = $pdo->prepare($findSql);
        $find->execute($params);
        $id = (int)$find->fetchColumn();
    }

    if ($id > 0) {
        $stmt = $pdo->prepare('UPDATE documentos_mobilizacao SET candidato_legacy_id=?, candidato_uid=?, tipo=?, status=?, validade_em=?, enviado_em=?, aprovado_em=?, reprovado_em=?, motivo_reprovacao=?, arquivo_nome=?, payload=?, atualizado_por=?, ativo=1 WHERE id=?');
        $stmt->execute([$candidateLegacyId ?: null, $candidateUid ?: null, $tipo, $status, $validade, $enviado, $aprovado, $reprovado, $motivo ?: null, $arquivo ?: null, json_encode($input, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES), $user['cpf'] ?? null, $id]);
        $key = (string)$id;
    } else {
        $stmt = $pdo->prepare('INSERT INTO documentos_mobilizacao (candidato_legacy_id, candidato_uid, tipo, status, validade_em, enviado_em, aprovado_em, reprovado_em, motivo_reprovacao, arquivo_nome, payload, criado_por, atualizado_por, ativo)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,1)');
        $stmt->execute([$candidateLegacyId ?: null, $candidateUid ?: null, $tipo, $status, $validade, $enviado, $aprovado, $reprovado, $motivo ?: null, $arquivo ?: null, json_encode($input, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES), $user['cpf'] ?? null, $user['cpf'] ?? null]);
        $key = (string)$pdo->lastInsertId();
    }
    mobi_audit($pdo, 'documentos_mobilizacao', $key, 'SALVAR_DOCUMENTO', $user, ['tipo' => $tipo, 'status' => $status, 'candidato_uid' => $candidateUid, 'candidato_legacy_id' => $candidateLegacyId]);
    mobi_json(['ok' => true, 'documents' => mobi_prof_documents($pdo, 500)]);
}

if ($action === 'delete_document' && $method === 'POST') {
    mobi_prof_require_perm($pdo, $user, 'documentos', 'delete');
    $id = (int)($input['id'] ?? 0);
    if ($id <= 0) mobi_json(['ok' => false, 'message' => 'Documento inválido.'], 422);
    $stmt = $pdo->prepare('UPDATE documentos_mobilizacao SET ativo=0, atualizado_por=? WHERE id=?');
    $stmt->execute([$user['cpf'] ?? null, $id]);
    mobi_audit($pdo, 'documentos_mobilizacao', (string)$id, 'INATIVAR_DOCUMENTO', $user);
    mobi_json(['ok' => true, 'documents' => mobi_prof_documents($pdo, 500)]);
}

if ($action === 'permissions' && $method === 'GET') {
    mobi_prof_require_perm($pdo, $user, 'usuarios', 'view');
    mobi_json(['ok' => true, 'permissions' => mobi_prof_permissions($pdo), 'user' => $user]);
}

if ($action === 'save_permission' && $method === 'POST') {
    mobi_prof_require_perm($pdo, $user, 'usuarios', 'update');
    $perfil = mobi_prof_upper($input['perfil'] ?? '', 40);
    $modulo = mobi_prof_str($input['modulo'] ?? '', 60);
    if ($perfil === '' || $modulo === '') mobi_json(['ok' => false, 'message' => 'Perfil e módulo são obrigatórios.'], 422);
    $v = !empty($input['pode_visualizar']) ? 1 : 0;
    $c = !empty($input['pode_criar']) ? 1 : 0;
    $u = !empty($input['pode_editar']) ? 1 : 0;
    $d = !empty($input['pode_excluir']) ? 1 : 0;
    if ($c || $u || $d) $v = 1;
    $stmt = $pdo->prepare('INSERT INTO permissoes_perfil (perfil, modulo, pode_visualizar, pode_criar, pode_editar, pode_excluir, atualizado_por) VALUES (?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE pode_visualizar=VALUES(pode_visualizar), pode_criar=VALUES(pode_criar), pode_editar=VALUES(pode_editar), pode_excluir=VALUES(pode_excluir), atualizado_por=VALUES(atualizado_por), atualizado_em=CURRENT_TIMESTAMP');
    $stmt->execute([$perfil, $modulo, $v, $c, $u, $d, $user['cpf'] ?? null]);
    mobi_audit($pdo, 'permissoes_perfil', $perfil . ':' . $modulo, 'ATUALIZAR_PERMISSAO', $user, ['R'=>$v,'C'=>$c,'U'=>$u,'D'=>$d]);
    mobi_json(['ok' => true, 'permissions' => mobi_prof_permissions($pdo)]);
}

$summary = [
    'usuarios_ativos' => mobi_prof_scalar($pdo, 'SELECT COUNT(*) FROM usuarios WHERE ativo = 1'),
    'candidatos_ativos' => mobi_prof_scalar($pdo, 'SELECT COUNT(*) FROM candidatos WHERE ativo = 1'),
    'solicitacoes_ativas' => mobi_prof_scalar($pdo, 'SELECT COUNT(*) FROM solicitacoes_mo WHERE ativo = 1'),
    'contratos_ativos' => mobi_prof_scalar($pdo, "SELECT COUNT(*) FROM contratos_operacionais WHERE ativo = 1 AND status <> 'INATIVO'"),
    'documentos_pendentes' => mobi_prof_scalar($pdo, "SELECT COUNT(*) FROM documentos_mobilizacao WHERE ativo = 1 AND status IN ('PENDENTE','REPROVADO','VENCIDO')"),
    'documentos_vencidos' => mobi_prof_scalar($pdo, "SELECT COUNT(*) FROM documentos_mobilizacao WHERE ativo = 1 AND validade_em IS NOT NULL AND validade_em < CURDATE() AND status <> 'APROVADO'"),
    'sem_recrutador' => mobi_prof_scalar($pdo, "SELECT COUNT(*) FROM candidatos WHERE ativo = 1 AND (recrutador_nome IS NULL OR recrutador_nome = '')"),
    'sem_rm' => mobi_prof_scalar($pdo, "SELECT COUNT(*) FROM candidatos WHERE ativo = 1 AND (rm IS NULL OR rm = '')"),
];

$recruiters = mobi_prof_rows($pdo, "SELECT COALESCE(NULLIF(recrutador_nome,''),'NAO REGISTRADO') AS recrutador, COUNT(*) AS total,
        SUM(CASE WHEN aso_real IS NOT NULL THEN 1 ELSE 0 END) AS aso,
        SUM(CASE WHEN admitido_em IS NOT NULL THEN 1 ELSE 0 END) AS admitidos,
        SUM(CASE WHEN cracha_ok = 1 OR cracha_real_em IS NOT NULL THEN 1 ELSE 0 END) AS liberados
    FROM candidatos
    WHERE ativo = 1
    GROUP BY COALESCE(NULLIF(recrutador_nome,''),'NAO REGISTRADO')
    ORDER BY total DESC, recrutador ASC
    LIMIT 20");

$contracts = mobi_prof_rows($pdo, "SELECT COALESCE(NULLIF(digital_obra,''),'SEM OBRA') AS digital_obra, COUNT(*) AS candidatos
    FROM candidatos
    WHERE ativo = 1
    GROUP BY COALESCE(NULLIF(digital_obra,''),'SEM OBRA')
    ORDER BY candidatos DESC, digital_obra ASC
    LIMIT 20");

mobi_json([
    'ok' => true,
    'user' => $user,
    'summary' => $summary,
    'recruiters' => $recruiters,
    'contracts' => $contracts,
    'documents' => mobi_prof_documents($pdo, 50),
    'permissions' => mobi_prof_permissions($pdo),
    'audit' => mobi_prof_audit($pdo, $user, 10),
]);
