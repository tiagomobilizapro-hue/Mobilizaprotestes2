<?php
declare(strict_types=1);

require __DIR__ . '/api/bootstrap.php';

$checks = [];
$warnings = [];

function mobi_preflight_add(array &$checks, string $label, bool $ok, string $detail = ''): void
{
    $checks[] = ['label' => $label, 'ok' => $ok, 'detail' => $detail];
}

$drivers = class_exists('PDO') ? PDO::getAvailableDrivers() : [];
mobi_preflight_add($checks, 'PHP 8.1 ou superior', version_compare(PHP_VERSION, '8.1.0', '>='), 'Versao atual: ' . PHP_VERSION);
mobi_preflight_add($checks, 'Extensao PDO', extension_loaded('pdo'), extension_loaded('pdo') ? 'Disponivel.' : 'Ative PDO no painel da hospedagem.');
mobi_preflight_add($checks, 'Driver PDO MySQL', in_array('mysql', $drivers, true), 'Drivers: ' . ($drivers ? implode(', ', $drivers) : 'nenhum'));
mobi_preflight_add($checks, 'OpenSSL/random_bytes', function_exists('random_bytes'), function_exists('random_bytes') ? 'Disponivel.' : 'Necessario para CSRF e sessoes.');
mobi_preflight_add($checks, 'Config do banco preenchida', mobi_configured(), mobi_configured() ? 'Configuracao parece preenchida.' : 'Edite config/config.php e informe a senha do banco.');

$dbOk = false;
$dbDetail = 'Nao testado porque a configuracao esta incompleta.';
if (mobi_configured()) {
    try {
        $pdo = mobi_pdo(false);
        $dbOk = true;
        $dbDetail = 'Conexao MySQL OK.';
    } catch (Throwable $error) {
        $dbDetail = 'Falha de conexao. Confira host, banco, usuario, senha e vinculo do usuario ao banco.';
    }
}
mobi_preflight_add($checks, 'Conexao com MySQL', $dbOk, $dbDetail);

if ($dbOk) {
    try {
        $stmt = $pdo->query("SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = DATABASE() AND table_name = 'usuarios'");
        mobi_preflight_add($checks, 'Tabela usuarios', (int) $stmt->fetchColumn() > 0, 'Se estiver ausente, execute database/upgrade.php.');
    } catch (Throwable $error) {
        mobi_preflight_add($checks, 'Leitura do schema', false, 'Nao foi possivel consultar information_schema.');
    }
}

if (is_file(__DIR__ . '/database/upgrade.php') || is_file(__DIR__ . '/database/install.php')) {
    $warnings[] = 'Depois que o sistema estiver validado em producao, remova database/upgrade.php, database/install.php e preflight.php.';
}
$warnings[] = 'No primeiro acesso, entre com o administrador inicial e altere a senha padrao imediatamente.';

$allOk = count(array_filter($checks, static fn(array $check): bool => !$check['ok'])) === 0;
?><!doctype html>
<html lang="pt-br">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Preflight MobilizaPro</title>
    <style>
        body{font-family:Arial,sans-serif;background:#08111f;color:#e5eefb;margin:0;min-height:100vh;display:grid;place-items:center}
        main{width:min(900px,92vw);background:#111827;border:1px solid #334155;border-radius:20px;padding:28px;box-shadow:0 20px 60px #0008}
        h1{margin-top:0}.ok{color:#86efac}.bad{color:#fca5a5}.muted{color:#9fb0c8}
        .row{display:flex;gap:14px;align-items:flex-start;padding:14px 0;border-top:1px solid #26364f}
        .status{font-weight:700;min-width:78px}.warn{background:#3b2d0a;border:1px solid #f59e0b;border-radius:10px;padding:12px;margin:10px 0}
        a{color:#93c5fd}.actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:18px}.btn{border:1px solid #60a5fa;color:#e5eefb;text-decoration:none;border-radius:10px;padding:10px 14px;font-weight:700}
    </style>
</head>
<body>
<main>
    <h1>MobilizaPro - verificacao inicial</h1>
    <p class="muted">Use esta pagina antes do primeiro acesso para confirmar ambiente, configuracao e banco.</p>
    <?php foreach ($checks as $check): ?>
        <div class="row">
            <div class="status <?= $check['ok'] ? 'ok' : 'bad' ?>"><?= $check['ok'] ? 'OK' : 'PENDENTE' ?></div>
            <div><strong><?= htmlspecialchars($check['label'], ENT_QUOTES, 'UTF-8') ?></strong><br><span class="muted"><?= htmlspecialchars($check['detail'], ENT_QUOTES, 'UTF-8') ?></span></div>
        </div>
    <?php endforeach; ?>
    <?php foreach ($warnings as $warning): ?>
        <div class="warn"><?= htmlspecialchars($warning, ENT_QUOTES, 'UTF-8') ?></div>
    <?php endforeach; ?>
    <div class="actions">
        <a class="btn" href="database/upgrade.php">Executar upgrade seguro</a>
        <a class="btn" href="login.php">Abrir login</a>
    </div>
    <p class="muted"><?= $allOk ? 'Ambiente pronto para o upgrade/teste.' : 'Resolva os itens pendentes antes de liberar o uso.' ?></p>
</main>
</body>
</html>
