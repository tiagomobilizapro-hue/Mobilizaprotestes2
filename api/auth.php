<?php
declare(strict_types=1);
require __DIR__ . '/bootstrap.php';

$action = (string) ($_GET['action'] ?? $_POST['action'] ?? '');
$method = (string) ($_SERVER['REQUEST_METHOD'] ?? 'GET');
$input = json_decode((string) file_get_contents('php://input'), true);
if (!is_array($input)) {
    $input = $_POST;
}

if ($action === 'status') {
    mobi_json(['ok' => true, 'configured' => mobi_configured()]);
}
if ($method === 'POST') {
    mobi_require_csrf($input);
}

$pdo = mobi_pdo();

if ($action === 'me') {
    mobi_json(['ok' => true, 'user' => mobi_current_user()]);
}

if ($action === 'login' && $method === 'POST') {
    $cpf = mobi_clean_cpf($input['cpf'] ?? '');
    $password = (string) ($input['password'] ?? '');
    if (strlen($cpf) !== 11 || $password === '') {
        mobi_json(['ok' => false, 'message' => 'CPF ou senha inválidos.'], 401);
    }
    $stmt = $pdo->prepare('SELECT id, nome, cpf, email, perfil, senha_hash, ativo FROM usuarios WHERE cpf = ? AND ativo = 1 LIMIT 1');
    $stmt->execute([$cpf]);
    $user = $stmt->fetch();
    if (!$user || !password_verify($password, (string) $user['senha_hash'])) {
        mobi_json(['ok' => false, 'message' => 'CPF ou senha inválidos.'], 401);
    }
    if (password_needs_rehash((string) $user['senha_hash'], PASSWORD_DEFAULT)) {
        $rehash = $pdo->prepare('UPDATE usuarios SET senha_hash = ? WHERE id = ?');
        $rehash->execute([password_hash($password, PASSWORD_DEFAULT), $user['id']]);
    }
    session_regenerate_id(true);
    $_SESSION['mobi_user_cpf'] = $cpf;
    mobi_json(['ok' => true, 'user' => mobi_user_public($user)]);
}

if ($action === 'logout' && $method === 'POST') {
    $_SESSION = [];
    if (ini_get('session.use_cookies')) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000, $params['path'], $params['domain'], (bool) $params['secure'], (bool) $params['httponly']);
    }
    session_destroy();
    mobi_json(['ok' => true]);
}

if ($action === 'users' && $method === 'GET') {
    mobi_require_admin();
    $stmt = $pdo->prepare('SELECT nome, cpf, email, perfil, ativo FROM usuarios ORDER BY nome');
    $stmt->execute();
    mobi_json(['ok' => true, 'users' => array_map('mobi_user_public', $stmt->fetchAll())]);
}

if ($action === 'save_user' && $method === 'POST') {
    mobi_require_admin();
    $name = mobi_upper(trim((string) ($input['name'] ?? '')));
    $cpf = mobi_clean_cpf($input['cpf'] ?? '');
    $email = strtolower(trim((string) ($input['email'] ?? '')));
    $role = mobi_role($input['role'] ?? 'OBRA');
    $password = (string) ($input['password'] ?? '');
    $active = isset($input['active']) ? ((bool) $input['active'] ? 1 : 0) : 1;
    if (mobi_length($name) < 3) mobi_json(['ok' => false, 'message' => 'Informe o nome do usuário.'], 422);
    if (strlen($cpf) !== 11) mobi_json(['ok' => false, 'message' => 'Informe um CPF válido.'], 422);
    if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) mobi_json(['ok' => false, 'message' => 'Informe um e-mail válido.'], 422);

    $exists = $pdo->prepare('SELECT id FROM usuarios WHERE cpf = ? LIMIT 1');
    $exists->execute([$cpf]);
    $id = $exists->fetchColumn();
    if ($id) {
        if ($password !== '') {
            if (strlen($password) < 6) mobi_json(['ok' => false, 'message' => 'A senha deve ter pelo menos 6 caracteres.'], 422);
            $stmt = $pdo->prepare('UPDATE usuarios SET nome=?, email=?, perfil=?, senha_hash=?, ativo=? WHERE id=?');
            $stmt->execute([$name, $email ?: null, $role, password_hash($password, PASSWORD_DEFAULT), $active, $id]);
        } else {
            $stmt = $pdo->prepare('UPDATE usuarios SET nome=?, email=?, perfil=?, ativo=? WHERE id=?');
            $stmt->execute([$name, $email ?: null, $role, $active, $id]);
        }
    } else {
        if (strlen($password) < 6) mobi_json(['ok' => false, 'message' => 'A senha deve ter pelo menos 6 caracteres.'], 422);
        $stmt = $pdo->prepare('INSERT INTO usuarios (nome, cpf, email, perfil, senha_hash, ativo) VALUES (?, ?, ?, ?, ?, ?)');
        $stmt->execute([$name, $cpf, $email ?: null, $role, password_hash($password, PASSWORD_DEFAULT), $active]);
    }
    mobi_json(['ok' => true]);
}

if ($action === 'delete_user' && $method === 'POST') {
    mobi_require_admin();
    $cpf = mobi_clean_cpf($input['cpf'] ?? '');
    if ($cpf === '00000000000') {
        mobi_json(['ok' => false, 'message' => 'O administrador padrão não pode ser removido.'], 422);
    }
    $stmt = $pdo->prepare('UPDATE usuarios SET ativo = 0 WHERE cpf = ?');
    $stmt->execute([$cpf]);
    mobi_json(['ok' => true]);
}

if ($action === 'import_local_users' && $method === 'POST') {
    mobi_require_admin();
    $users = $input['users'] ?? [];
    if (!is_array($users)) {
        mobi_json(['ok' => false, 'message' => 'Lista inválida.'], 422);
    }
    $find = $pdo->prepare('SELECT id FROM usuarios WHERE cpf = ? LIMIT 1');
    $insert = $pdo->prepare('INSERT INTO usuarios (nome, cpf, email, perfil, senha_hash, ativo) VALUES (?, ?, ?, ?, ?, 1)');
    $update = $pdo->prepare('UPDATE usuarios SET nome=?, email=?, perfil=?, senha_hash=?, ativo=1 WHERE id=?');
    $count = 0;
    foreach ($users as $item) {
        if (!is_array($item)) continue;
        $cpf = mobi_clean_cpf($item['cpf'] ?? '');
        $name = mobi_upper(trim((string) ($item['name'] ?? '')));
        $email = strtolower(trim((string) ($item['email'] ?? '')));
        $role = mobi_role($item['role'] ?? 'OBRA');
        $password = (string) ($item['password'] ?? '');
        if (strlen($cpf) !== 11 || mobi_length($name) < 3 || ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) || strlen($password) < 6) continue;
        $hash = password_hash($password, PASSWORD_DEFAULT);
        $find->execute([$cpf]);
        $id = $find->fetchColumn();
        if ($id) $update->execute([$name, $email ?: null, $role, $hash, $id]);
        else $insert->execute([$name, $cpf, $email ?: null, $role, $hash]);
        $count++;
    }
    mobi_json(['ok' => true, 'imported' => $count]);
}

mobi_json(['ok' => false, 'message' => 'Ação inválida.'], 404);
