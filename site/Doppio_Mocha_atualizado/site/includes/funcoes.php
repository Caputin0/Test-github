<?php
declare(strict_types=1);
require_once __DIR__ . '/../config/sessao.php';
function h(?string $valor): string { return htmlspecialchars((string)$valor, ENT_QUOTES, 'UTF-8'); }
function usuarioLogado(): bool { return isset($_SESSION['usuario_id']); }
function exigirLogin(): void { if (!usuarioLogado()) { $_SESSION['flash'] = 'Entre na sua conta para continuar.'; header('Location: login.php'); exit; } }
function moeda(float $valor): string { return 'R$ ' . number_format($valor, 2, ',', '.'); }
