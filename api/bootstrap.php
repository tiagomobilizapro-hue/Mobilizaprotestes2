<?php
declare(strict_types=1);

$configFile = __DIR__ . '/../config/config.php';
if (!is_file($configFile)) {
    http_response_code(500);
    exit('Configuração ausente.');
}
$mobiConfig = require $configFile;

if (session_status() !== PHP_SESSION_ACTIVE) {
    $basePath = rtrim((string) ($mobiConfig['base_url'] ?? ''), '/');
    session_name('MOBILIZAPROSESSID');
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => $basePath !== '' ? $basePath . '/' : '/',
        'secure' => !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off',
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
    session_start();
}
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');
header('Referrer-Policy: same-origin');

function mobi_csrf_token(): string
{
    if (empty($_SESSION['mobi_csrf'])) {
        $_SESSION['mobi_csrf'] = bin2hex(random_bytes(32));
    }
    return (string) $_SESSION['mobi_csrf'];
}

function mobi_json(array $data, int $status = 200): never
{
    if (!isset($data['csrf'])) $data['csrf'] = mobi_csrf_token();
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function mobi_require_csrf(array $input = []): void
{
    $provided = (string) ($_SERVER['HTTP_X_MOBILIZA_CSRF'] ?? ($input['csrf'] ?? ''));
    if ($provided === '' || !hash_equals(mobi_csrf_token(), $provided)) {
        mobi_json(['ok' => false, 'message' => 'Sessão expirada. Atualize a página e tente novamente.'], 419);
    }
}

function mobi_clean_cpf(mixed $cpf): string
{
    return substr((string) preg_replace('/\D+/', '', (string) $cpf), 0, 11);
}

function mobi_upper(string $value): string
{
    return function_exists('mb_strtoupper') ? mb_strtoupper($value, 'UTF-8') : strtoupper($value);
}

function mobi_length(string $value): int
{
    return function_exists('mb_strlen') ? mb_strlen($value, 'UTF-8') : strlen($value);
}

function mobi_role(mixed $role): string
{
    $role = strtoupper(trim((string) $role));
    $allowed = ['OBRA', 'OPERACIONAL_RECRUTAMENTO', 'MOBILIZACAO', 'ALOJAMENTO', 'MEDICINA', 'GERENCIAL'];
    return in_array($role, $allowed, true) ? $role : 'OBRA';
}

function mobi_config(): array
{
    global $mobiConfig;
    return $mobiConfig;
}

function mobi_configured(): bool
{
    $db = mobi_config()['db'] ?? [];
    $user = trim((string) ($db['user'] ?? ''));
    $pass = (string) ($db['pass'] ?? '');
    return !empty($db['host']) && !empty($db['name']) && $user !== '' && strtolower($user) !== 'root'
        && $pass !== '' && $pass !== 'colocar_senha_no_config';
}

function mobi_pdo(bool $jsonErrors = true): PDO
{
    static $pdo = null;
    if ($pdo instanceof PDO) return $pdo;
    if (!mobi_configured()) {
        if ($jsonErrors) mobi_json(['ok' => false, 'needs_setup' => true, 'message' => 'Banco não configurado. Edite config/config.php e execute /database/upgrade.php.'], 503);
        throw new RuntimeException('Edite config/config.php e informe uma senha de banco válida.');
    }
    $db = mobi_config()['db'];
    $charset = preg_match('/^[a-zA-Z0-9_]+$/', (string) ($db['charset'] ?? '')) ? (string) $db['charset'] : 'utf8mb4';
    $dsn = 'mysql:host=' . $db['host'] . ';dbname=' . $db['name'] . ';charset=' . $charset;
    try {
        $pdo = new PDO($dsn, (string) $db['user'], (string) $db['pass'], [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);
        return $pdo;
    } catch (Throwable $error) {
        if ($jsonErrors) mobi_json(['ok' => false, 'message' => 'Falha na conexão com o banco. Confira config/config.php.'], 500);
        throw $error;
    }
}

function mobi_table_exists(PDO $pdo, string $table): bool
{
    $stmt = $pdo->prepare('SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = DATABASE() AND table_name = ?');
    $stmt->execute([$table]);
    return (int) $stmt->fetchColumn() > 0;
}

function mobi_column_exists(PDO $pdo, string $table, string $column): bool
{
    $stmt = $pdo->prepare('SELECT COUNT(*) FROM information_schema.columns WHERE table_schema = DATABASE() AND table_name = ? AND column_name = ?');
    $stmt->execute([$table, $column]);
    return (int) $stmt->fetchColumn() > 0;
}

function mobi_unique_column_exists(PDO $pdo, string $table, string $column): bool
{
    $stmt = $pdo->prepare('SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name = ? AND column_name = ? AND non_unique = 0');
    $stmt->execute([$table, $column]);
    return (int) $stmt->fetchColumn() > 0;
}

function mobi_create_table(PDO $pdo, string $table, string $sql, array &$actions): bool
{
    if (mobi_table_exists($pdo, $table)) {
        $actions[] = 'Tabela ' . $table . ': preservada (já existia).';
        return false;
    }
    $pdo->exec($sql);
    $actions[] = 'Tabela ' . $table . ': criada.';
    return true;
}

function mobi_add_columns(PDO $pdo, string $table, array $columns, array &$actions): void
{
    foreach ($columns as $column => $definition) {
        if (!mobi_column_exists($pdo, $table, $column)) {
            $pdo->exec('ALTER TABLE ' . $table . ' ADD COLUMN ' . $column . ' ' . $definition);
            $actions[] = 'Coluna ' . $table . '.' . $column . ': adicionada.';
        }
    }
}

function mobi_index_exists(PDO $pdo, string $table, string $index): bool
{
    $stmt = $pdo->prepare('SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name = ? AND index_name = ?');
    $stmt->execute([$table, $index]);
    return (int) $stmt->fetchColumn() > 0;
}

function mobi_add_index(PDO $pdo, string $table, string $index, string $definition, array &$actions, array &$warnings): void
{
    if (mobi_index_exists($pdo, $table, $index)) return;
    try {
        $pdo->exec('ALTER TABLE ' . $table . ' ADD ' . $definition);
        $actions[] = 'Índice ' . $table . '.' . $index . ': criado.';
    } catch (Throwable $error) {
        $warnings[] = 'Índice ' . $table . '.' . $index . ' não foi criado: ' . $error->getMessage();
    }
}

function mobi_upgrade_schema(PDO $pdo, bool $repairInitialAdmin = false): array
{
    static $completed = false;
    if ($completed && !$repairInitialAdmin) return ['actions' => [], 'warnings' => []];

    $actions = [];
    $warnings = [];

    mobi_create_table($pdo, 'usuarios', "CREATE TABLE usuarios (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(120) NOT NULL,
        cpf VARCHAR(11) NOT NULL,
        email VARCHAR(160) NOT NULL,
        perfil ENUM('OBRA','OPERACIONAL_RECRUTAMENTO','MOBILIZACAO','ALOJAMENTO','MEDICINA','GERENCIAL') NOT NULL DEFAULT 'OBRA',
        senha_hash VARCHAR(255) NOT NULL,
        ativo TINYINT(1) NOT NULL DEFAULT 1,
        criado_em TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        atualizado_em TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY uk_usuarios_cpf (cpf)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", $actions);

    mobi_add_columns($pdo, 'usuarios', [
        'nome' => "VARCHAR(120) NOT NULL DEFAULT 'USUARIO'",
        'cpf' => 'VARCHAR(11) NULL',
        'email' => "VARCHAR(160) NOT NULL DEFAULT ''",
        'perfil' => "VARCHAR(40) NOT NULL DEFAULT 'OBRA'",
        'senha_hash' => 'VARCHAR(255) NULL',
        'ativo' => 'TINYINT(1) NOT NULL DEFAULT 1',
        'criado_em' => 'TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP',
        'atualizado_em' => 'TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
    ], $actions);

    $legacyPasswordColumn = mobi_column_exists($pdo, 'usuarios', 'senha');
    $selectSql = $legacyPasswordColumn ? 'SELECT id, senha_hash, senha FROM usuarios' : 'SELECT id, senha_hash FROM usuarios';
    $usersStmt = $pdo->prepare($selectSql);
    $usersStmt->execute();
    $saveHash = $pdo->prepare('UPDATE usuarios SET senha_hash = ? WHERE id = ?');
    foreach ($usersStmt->fetchAll() as $row) {
        $stored = (string) ($row['senha_hash'] ?? '');
        if ($stored !== '' && (password_get_info($stored)['algo'] ?? null) !== null) continue;
        $legacy = $legacyPasswordColumn ? (string) ($row['senha'] ?? '') : '';
        if ($legacy !== '' && (password_get_info($legacy)['algo'] ?? null) !== null) $hash = $legacy;
        elseif ($legacy !== '') $hash = password_hash($legacy, PASSWORD_DEFAULT);
        elseif ($stored !== '') $hash = password_hash($stored, PASSWORD_DEFAULT);
        else $hash = password_hash(bin2hex(random_bytes(24)), PASSWORD_DEFAULT);
        $saveHash->execute([$hash, $row['id']]);
        $actions[] = 'Usuário ID ' . (int) $row['id'] . ': senha_hash ausente ou inválido foi corrigido.';
    }
    $pdo->exec('ALTER TABLE usuarios MODIFY COLUMN senha_hash VARCHAR(255) NOT NULL');
    if (!mobi_unique_column_exists($pdo, 'usuarios', 'cpf')) {
        try {
            $pdo->exec('ALTER TABLE usuarios ADD UNIQUE KEY uk_usuarios_cpf (cpf)');
            $actions[] = 'Índice único de usuarios.cpf: criado.';
        } catch (Throwable $error) {
            $warnings[] = 'Índice único de CPF não criado porque existem CPFs duplicados. Nenhum registro foi removido.';
        }
    }

    mobi_create_table($pdo, 'obras', "CREATE TABLE obras (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        codigo VARCHAR(30) NOT NULL,
        nome VARCHAR(150) NOT NULL,
        cliente VARCHAR(150) NOT NULL,
        cidade VARCHAR(100) NULL,
        uf CHAR(2) NULL,
        status VARCHAR(40) NOT NULL DEFAULT 'ativa',
        criado_em TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY uk_obras_codigo (codigo)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", $actions);
    mobi_add_columns($pdo, 'obras', [
        'codigo' => "VARCHAR(30) NOT NULL DEFAULT ''",
        'nome' => "VARCHAR(150) NOT NULL DEFAULT ''",
        'cliente' => "VARCHAR(150) NOT NULL DEFAULT ''",
        'cidade' => 'VARCHAR(100) NULL',
        'uf' => 'CHAR(2) NULL',
        'status' => "VARCHAR(40) NOT NULL DEFAULT 'ativa'",
        'criado_em' => 'TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP',
    ], $actions);

    $statusCreated = mobi_create_table($pdo, 'status_mobilizacao', "CREATE TABLE status_mobilizacao (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        slug VARCHAR(40) NOT NULL,
        nome VARCHAR(80) NOT NULL,
        cor VARCHAR(20) NOT NULL DEFAULT 'secondary',
        ordem SMALLINT UNSIGNED NOT NULL DEFAULT 0,
        ativo TINYINT(1) NOT NULL DEFAULT 1,
        UNIQUE KEY uk_status_slug (slug)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", $actions);
    if ($statusCreated) {
        $seed = $pdo->prepare('INSERT INTO status_mobilizacao (slug, nome, cor, ordem, ativo) VALUES (?, ?, ?, ?, 1)');
        foreach ([['solicitado','Solicitado','primary',10],['recrutamento','Recrutamento','info',20],['documentacao','Documentação','warning',30],['exames','Exames','warning',40],['integracao','Integração','primary',50],['liberado','Liberado','success',60],['mobilizado','Mobilizado','dark',70],['bloqueado','Bloqueado','danger',80],['cancelado','Cancelado','secondary',90]] as $status) $seed->execute($status);
        $actions[] = 'Status padrão: inseridos somente na tabela nova.';
    }

    mobi_create_table($pdo, 'colaboradores', "CREATE TABLE colaboradores (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(150) NOT NULL,
        cpf VARCHAR(20) NULL,
        numero_pessoal VARCHAR(30) NULL,
        funcao VARCHAR(100) NULL,
        telefone VARCHAR(30) NULL,
        cidade VARCHAR(100) NULL,
        uf CHAR(2) NULL,
        obra_id INT UNSIGNED NULL,
        status_id INT UNSIGNED NULL,
        observacoes TEXT NULL,
        criado_em TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_colaboradores_cpf (cpf)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", $actions);
    mobi_add_columns($pdo, 'colaboradores', [
        'nome' => "VARCHAR(150) NOT NULL DEFAULT ''",
        'cpf' => 'VARCHAR(20) NULL',
        'numero_pessoal' => 'VARCHAR(30) NULL',
        'funcao' => 'VARCHAR(100) NULL',
        'telefone' => 'VARCHAR(30) NULL',
        'cidade' => 'VARCHAR(100) NULL',
        'uf' => 'CHAR(2) NULL',
        'obra_id' => 'INT UNSIGNED NULL',
        'status_id' => 'INT UNSIGNED NULL',
        'observacoes' => 'TEXT NULL',
        'criado_em' => 'TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP',
    ], $actions);

    mobi_create_table($pdo, 'solicitacoes', "CREATE TABLE solicitacoes (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        obra_id INT UNSIGNED NULL,
        titulo VARCHAR(150) NOT NULL,
        funcao VARCHAR(120) NOT NULL,
        quantidade INT UNSIGNED NOT NULL DEFAULT 1,
        data_prevista DATE NULL,
        responsavel VARCHAR(120) NULL,
        status_id INT UNSIGNED NULL,
        status VARCHAR(50) NULL,
        observacoes TEXT NULL,
        criado_em TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        atualizado_em TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", $actions);
    mobi_add_columns($pdo, 'solicitacoes', [
        'obra_id' => 'INT UNSIGNED NULL',
        'titulo' => 'VARCHAR(150) NULL',
        'funcao' => 'VARCHAR(120) NULL',
        'quantidade' => 'INT UNSIGNED NOT NULL DEFAULT 1',
        'data_prevista' => 'DATE NULL',
        'responsavel' => 'VARCHAR(120) NULL',
        'status_id' => 'INT UNSIGNED NULL',
        'status' => 'VARCHAR(50) NULL',
        'observacoes' => 'TEXT NULL',
        'criado_em' => 'TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP',
        'atualizado_em' => 'TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
    ], $actions);

    mobi_create_table($pdo, 'historico_mobilizacao', "CREATE TABLE historico_mobilizacao (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        colaborador_id INT UNSIGNED NULL,
        solicitacao_id INT UNSIGNED NULL,
        status_anterior VARCHAR(80) NULL,
        status_novo VARCHAR(80) NOT NULL,
        observacao TEXT NULL,
        usuario_id INT UNSIGNED NULL,
        criado_em TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", $actions);

    mobi_create_table($pdo, 'solicitacoes_mo', "CREATE TABLE solicitacoes_mo (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        rm VARCHAR(24) NOT NULL,
        digital_obra VARCHAR(40) NOT NULL DEFAULT '',
        data_solicitacao VARCHAR(20) NOT NULL DEFAULT '',
        funcao VARCHAR(120) NOT NULL,
        quantidade INT UNSIGNED NOT NULL DEFAULT 1,
        turno VARCHAR(12) NOT NULL DEFAULT 'DIURNO',
        status VARCHAR(30) NOT NULL DEFAULT 'ABERTA',
        cancel_reason VARCHAR(500) NULL,
        canceled_at VARCHAR(30) NULL,
        payload JSON NULL,
        payload_hash CHAR(40) NULL,
        criado_por VARCHAR(11) NULL,
        atualizado_por VARCHAR(11) NULL,
        criado_em TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        atualizado_em TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        ativo TINYINT(1) NOT NULL DEFAULT 1,
        excluido_em TIMESTAMP NULL,
        UNIQUE KEY uk_rm_obra_func (rm, digital_obra, funcao)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", $actions);
    mobi_add_columns($pdo, 'solicitacoes_mo', [
        'turno' => "VARCHAR(12) NOT NULL DEFAULT 'DIURNO'",
        'ativo' => 'TINYINT(1) NOT NULL DEFAULT 1',
        'excluido_em' => 'TIMESTAMP NULL',
    ], $actions);

    mobi_create_table($pdo, 'candidatos', "CREATE TABLE candidatos (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        legacy_id INT UNSIGNED NULL,
        client_uid VARCHAR(64) NULL,
        nome VARCHAR(140) NOT NULL,
        cpf VARCHAR(11) NULL,
        telefone VARCHAR(20) NULL,
        cidade VARCHAR(100) NULL,
        estado VARCHAR(2) NULL,
        funcao VARCHAR(120) NOT NULL,
        rm VARCHAR(24) NULL,
        digital_obra VARCHAR(40) NULL,
        recrutado_em DATE NULL,
        recrutador_nome VARCHAR(120) NULL,
        recrutador_cpf VARCHAR(11) NULL,
        aso_previsto DATE NULL,
        aso_marcado_em DATE NULL,
        aso_alerta TINYINT(1) NOT NULL DEFAULT 0,
        admissao_prevista DATE NULL,
        aso_real DATE NULL,
        admitido_em DATE NULL,
        treinamento_inicio_previsto DATE NULL,
        treinamento_inicio_real DATE NULL,
        treinamento_fim_previsto DATE NULL,
        treinamento_fim_real DATE NULL,
        cracha_ok TINYINT(1) NOT NULL DEFAULT 0,
        cracha_postado_em DATE NULL,
        cracha_liberacao_dias INT UNSIGNED NOT NULL DEFAULT 5,
        cracha_real_em DATE NULL,
        alojado TINYINT(1) NOT NULL DEFAULT 0,
        alojamento_realizado VARCHAR(3) NOT NULL DEFAULT 'NAO',
        declinado_em DATE NULL,
        motivo_declinio VARCHAR(240) NULL,
        payload JSON NULL,
        payload_hash CHAR(40) NULL,
        criado_por VARCHAR(11) NULL,
        atualizado_por VARCHAR(11) NULL,
        criado_em TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        atualizado_em TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        ativo TINYINT(1) NOT NULL DEFAULT 1,
        excluido_em TIMESTAMP NULL,
        UNIQUE KEY uk_candidatos_legacy (legacy_id),
        UNIQUE KEY uk_candidatos_client_uid (client_uid),
        INDEX idx_candidatos_cpf_ativo (cpf, ativo)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", $actions);
    mobi_add_columns($pdo, 'candidatos', [
        'client_uid' => 'VARCHAR(64) NULL',
        'payload_hash' => 'CHAR(40) NULL',
        'recrutador_nome' => 'VARCHAR(120) NULL',
        'recrutador_cpf' => 'VARCHAR(11) NULL',
        'aso_marcado_em' => 'DATE NULL',
        'aso_alerta' => 'TINYINT(1) NOT NULL DEFAULT 0',
        'ativo' => 'TINYINT(1) NOT NULL DEFAULT 1',
        'excluido_em' => 'TIMESTAMP NULL',
    ], $actions);
    try {
        $pdo->exec("UPDATE candidatos SET client_uid = CONCAT('legacy-', COALESCE(legacy_id, id)) WHERE client_uid IS NULL OR client_uid = ''");
        $actions[] = 'candidatos.client_uid: identificadores estáveis preenchidos nos registros existentes.';
    } catch (Throwable $error) {
        $warnings[] = 'Backfill de candidatos.client_uid não executado: ' . $error->getMessage();
    }
    try {
        $pdo->exec("UPDATE candidatos SET recrutador_nome = COALESCE(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(payload, '$.recruiter_name')), ''), NULLIF(JSON_UNQUOTE(JSON_EXTRACT(payload, '$.recruited_by_name')), '')) WHERE (recrutador_nome IS NULL OR recrutador_nome = '') AND payload IS NOT NULL AND (JSON_EXTRACT(payload, '$.recruiter_name') IS NOT NULL OR JSON_EXTRACT(payload, '$.recruited_by_name') IS NOT NULL)");
        $pdo->exec("UPDATE candidatos SET recrutador_cpf = COALESCE(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(payload, '$.recruiter_cpf')), ''), NULLIF(JSON_UNQUOTE(JSON_EXTRACT(payload, '$.recruited_by_cpf')), '')) WHERE (recrutador_cpf IS NULL OR recrutador_cpf = '') AND payload IS NOT NULL AND (JSON_EXTRACT(payload, '$.recruiter_cpf') IS NOT NULL OR JSON_EXTRACT(payload, '$.recruited_by_cpf') IS NOT NULL)");
        $actions[] = 'candidatos.recrutador: backfill conservador a partir do payload existente.';
    } catch (Throwable $error) {
        $warnings[] = 'Backfill de recrutador não executado: ' . $error->getMessage();
    }
    mobi_add_index($pdo, 'candidatos', 'uk_candidatos_client_uid', 'UNIQUE KEY uk_candidatos_client_uid (client_uid)', $actions, $warnings);
    mobi_add_index($pdo, 'candidatos', 'idx_candidatos_cpf_ativo', 'INDEX idx_candidatos_cpf_ativo (cpf, ativo)', $actions, $warnings);

    mobi_create_table($pdo, 'training_matrix_store', "CREATE TABLE training_matrix_store (
        id TINYINT UNSIGNED NOT NULL PRIMARY KEY DEFAULT 1,
        payload JSON NOT NULL,
        atualizado_por VARCHAR(11) NULL,
        atualizado_em TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", $actions);

    mobi_create_table($pdo, 'auditoria_operacional', "CREATE TABLE auditoria_operacional (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        tabela VARCHAR(80) NOT NULL,
        registro_chave VARCHAR(190) NULL,
        acao VARCHAR(60) NOT NULL,
        usuario_cpf VARCHAR(11) NULL,
        detalhe JSON NULL,
        criado_em TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_auditoria_tabela_chave (tabela, registro_chave),
        INDEX idx_auditoria_criado (criado_em)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", $actions);

    mobi_create_table($pdo, 'app_store', "CREATE TABLE app_store (
        store_key VARCHAR(190) NOT NULL PRIMARY KEY,
        store_value LONGTEXT NOT NULL,
        updated_by VARCHAR(11) NULL,
        updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        ativo TINYINT(1) NOT NULL DEFAULT 1,
        excluido_em TIMESTAMP NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", $actions);
    mobi_add_columns($pdo, 'app_store', [
        'ativo' => 'TINYINT(1) NOT NULL DEFAULT 1',
        'excluido_em' => 'TIMESTAMP NULL',
    ], $actions);

    $adminCpf = '00000000000';
    $adminStmt = $pdo->prepare('SELECT id, senha_hash, perfil, ativo FROM usuarios WHERE cpf = ? LIMIT 1');
    $adminStmt->execute([$adminCpf]);
    $admin = $adminStmt->fetch();
    if (!$admin) {
        $insertAdmin = $pdo->prepare('INSERT INTO usuarios (nome, cpf, email, perfil, senha_hash, ativo) VALUES (?, ?, ?, ?, ?, 1)');
        $insertAdmin->execute(['ADMINISTRADOR', $adminCpf, 'admin@mobiway.local', 'GERENCIAL', password_hash('123456', PASSWORD_DEFAULT)]);
        $actions[] = 'Administrador inicial: criado.';
    } elseif ($repairInitialAdmin) {
        $updates = [];
        $params = [];
        if ((string) $admin['perfil'] !== 'GERENCIAL') { $updates[] = 'perfil = ?'; $params[] = 'GERENCIAL'; }
        if ((int) $admin['ativo'] !== 1) { $updates[] = 'ativo = 1'; }
        if ((password_get_info((string) $admin['senha_hash'])['algo'] ?? null) === null) {
            $updates[] = 'senha_hash = ?';
            $params[] = password_hash('123456', PASSWORD_DEFAULT);
        }
        if ($updates) {
            $params[] = $admin['id'];
            $updateAdmin = $pdo->prepare('UPDATE usuarios SET ' . implode(', ', $updates) . ' WHERE id = ?');
            $updateAdmin->execute($params);
            $actions[] = 'Administrador inicial: somente campos inválidos/inativos foram corrigidos.';
        } else {
            $actions[] = 'Administrador inicial: preservado; senha_hash já era válido.';
        }
    }

    $completed = true;
    return ['actions' => $actions, 'warnings' => $warnings];
}

function mobi_user_public(array $user): array
{
    return [
        'name' => $user['nome'] ?? '',
        'cpf' => $user['cpf'] ?? '',
        'email' => $user['email'] ?? '',
        'role' => $user['perfil'] ?? 'OBRA',
        'active' => ((int) ($user['ativo'] ?? 0)) === 1,
    ];
}

function mobi_current_user(): ?array
{
    if (empty($_SESSION['mobi_user_cpf'])) return null;
    $pdo = mobi_pdo();

    $stmt = $pdo->prepare('SELECT id, nome, cpf, email, perfil, ativo FROM usuarios WHERE cpf = ? AND ativo = 1 LIMIT 1');
    $stmt->execute([mobi_clean_cpf($_SESSION['mobi_user_cpf'])]);
    $user = $stmt->fetch();
    return $user ? mobi_user_public($user) : null;
}

function mobi_require_admin(): array
{
    $user = mobi_current_user();
    if (!$user || $user['role'] !== 'GERENCIAL') {
        mobi_json(['ok' => false, 'message' => 'Acesso negado. Perfil Gerencial necessário.'], 403);
    }
    return $user;
}
