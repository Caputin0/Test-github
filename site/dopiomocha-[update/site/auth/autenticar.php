<?php
require_once __DIR__ . '/../config/sessao.php';
require_once __DIR__ . '/../config/conexao.php';
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { header('Location: ../html/login.php'); exit; }
$email = strtolower(trim($_POST['email'] ?? '')); $senha = $_POST['senha'] ?? '';
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || $senha === '') { $_SESSION['erro_login'] = 'Informe um e-mail válido e sua senha.'; header('Location: ../html/login.php'); exit; }
$stmt = $pdo->prepare('SELECT id, nome, senha FROM usuarios WHERE email = :email LIMIT 1'); $stmt->execute(['email'=>$email]); $usuario = $stmt->fetch();
if (!$usuario || !password_verify($senha, $usuario['senha'])) { $_SESSION['erro_login'] = 'E-mail ou senha incorretos.'; header('Location: ../html/login.php'); exit; }
session_regenerate_id(true); $_SESSION['usuario_id'] = (int)$usuario['id']; $_SESSION['usuario_nome'] = $usuario['nome']; $_SESSION['flash'] = 'Login realizado com sucesso. Olá, ' . $usuario['nome'] . '!';
header('Location: ../html/index.php'); exit;
