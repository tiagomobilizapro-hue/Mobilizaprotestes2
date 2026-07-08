<?php
declare(strict_types=1);

require __DIR__ . '/../api/bootstrap.php';

$ok = false;
$message = '';
$detail = '';
$report = ['actions' => [], 'warnings' => []];

try {
    $pdo = mobi_pdo(false);
    $report = mobi_upgrade_schema($pdo, true);
    $ok = true;
    $message = 'Upgrade incremental concluído sem apagar registros.';
} catch (Throwable $error) {
    http_response_code(500);
    $message = 'Não foi possível concluir o upgrade.';
    $detail = $error->getMessage();
    $databasePassword = (string) ((mobi_config()['db'] ?? [])['pass'] ?? '');
    if ($databasePassword !== '') $detail = str_replace($databasePassword, '[senha ocultada]', $detail);
}
?><!doctype html>
<html lang="pt-br"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Upgrade MobilizaPro</title>
<style>body{font-family:Arial,sans-serif;background:#0b1220;color:#e5edf8;margin:0;display:grid;place-items:center;min-height:100vh}.box{width:min(820px,92vw);background:#111b2d;border:1px solid #26364f;border-radius:24px;padding:32px;box-shadow:0 20px 60px #0008}.ok{background:#063b2d;border:1px solid #10b981;padding:14px;border-radius:12px}.err{background:#3b0a0a;border:1px solid #ef4444;padding:14px;border-radius:12px}.warn{background:#3b2d0a;border:1px solid #f59e0b;padding:14px;border-radius:12px}.report{background:#0b1220;border:1px solid #26364f;padding:16px;border-radius:12px;max-height:46vh;overflow:auto}.report li{margin:7px 0}.muted{color:#9fb0c8}a{color:#93c5fd}code{word-break:break-word}</style></head>
<body><main class="box"><h1>MobilizaPro · Upgrade seguro</h1>
<?php if ($ok): ?>
<div class="ok"><b><?= htmlspecialchars($message, ENT_QUOTES, 'UTF-8') ?></b><br>Nenhuma tabela foi removida e nenhuma exclusão física foi executada.</div>
<h2>Relatório</h2><ul class="report"><?php foreach ($report['actions'] as $action): ?><li><?= htmlspecialchars($action, ENT_QUOTES, 'UTF-8') ?></li><?php endforeach; ?></ul>
<?php foreach ($report['warnings'] as $warning): ?><p class="warn"><?= htmlspecialchars($warning, ENT_QUOTES, 'UTF-8') ?></p><?php endforeach; ?>
<p class="warn">No primeiro login, altere a senha padrao do administrador. Depois de testar, apague <code>database/upgrade.php</code>, <code>database/install.php</code> e <code>preflight.php</code>.</p>
<p>Acesse <a href="../login.php">o login</a>.</p>
<?php else: ?>
<div class="err"><b><?= htmlspecialchars($message, ENT_QUOTES, 'UTF-8') ?></b><?php if ($detail): ?><br><code><?= htmlspecialchars($detail, ENT_QUOTES, 'UTF-8') ?></code><?php endif; ?></div>
<p class="muted">Confira config/config.php. A senha do banco nunca é exibida.</p>
<?php endif; ?>
</main></body></html>
