<?php
require_once __DIR__ . '/../config/sessao.php';
require_once __DIR__ . '/../config/conexao.php';
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { header('Location: ../html/cadastro.php'); exit; }
$nome = trim($_POST['nome'] ?? ''); $email = strtolower(trim($_POST['email'] ?? ''));
$senha = $_POST['senha'] ?? ''; $confirmacao = $_POST['confirmar_senha'] ?? '';
if (mb_strlen($nome) < 3 || !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($senha) < 8 || !preg_match('/[A-Za-z]/', $senha) || !preg_match('/[0-9]/', $senha) || $senha !== $confirmacao) {
    $_SESSION['erro_cadastro'] = 'Confira os campos: nome, e-mail válido e senha com pelo menos 8 caracteres, letra e número. As senhas devem coincidir.';
    header('Location: ../html/cadastro.php'); exit;
}
$stmt = $pdo->prepare('SELECT id FROM usuarios WHERE email = :email'); $stmt->execute(['email'=>$email]);
if ($stmt->fetch()) { $_SESSION['erro_cadastro'] = 'Este e-mail já está cadastrado.'; header('Location: ../html/cadastro.php'); exit; }
$hash = password_hash($senha, PASSWORD_DEFAULT);
$stmt = $pdo->prepare('INSERT INTO usuarios (nome, email, senha) VALUES (:nome, :email, :senha)');
$stmt->execute(['nome'=>$nome, 'email'=>$email, 'senha'=>$hash]);
$_SESSION['usuario_id'] = (int)$pdo->lastInsertId(); $_SESSION['usuario_nome'] = $nome;
$_SESSION['flash'] = 'Cadastro realizado com sucesso! Bem-vindo(a) à Doppio Mocha.';
header('Location: ../html/index.php'); exit;
