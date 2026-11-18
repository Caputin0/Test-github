<?php
require_once __DIR__ . '/../config/sessao.php';
$erro = $_SESSION['erro_login'] ?? '';
unset($_SESSION['erro_login']);
?>
<!DOCTYPE html><html lang="pt-br"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Entrar | Doppio Mocha</title><link rel="stylesheet" href="style.css"><link rel="stylesheet" href="../css/code.css"></head>
<body class="pagina-login"><nav class="logo-login"><a href="index.php"><img src="../imagens/logo.png" alt="Doppio Mocha" class="logo-login"></a><p>Conte com a sua melhor experiência de compra.</p></nav>
<form class="form-login" action="../auth/autenticar.php" method="post" id="form-login" novalidate><h2>Fazer login</h2><p class="subtitulo">Entre na sua conta</p>
<?php if ($erro): ?><p class="mensagem-erro" role="alert"><?= htmlspecialchars($erro, ENT_QUOTES, 'UTF-8') ?></p><?php endif; ?>
<div class="campo"><label for="email">E-mail</label><input type="email" id="email" name="email" placeholder="Digite seu e-mail" autocomplete="email" required maxlength="160"></div>
<div class="senha"><label for="senha">Senha</label><input type="password" id="senha" name="senha" placeholder="Digite sua senha" autocomplete="current-password" required></div>
<button type="submit" class="botao-entrar">Entrar</button><p class="cadastro">Ainda não possui uma conta? <a href="cadastro.php">Cadastre-se</a></p><a href="index.php" class="voltar">Voltar para a loja</a></form>
<footer class="footer-login">Doppio Mocha</footer><div id="area-notificacoes" class="area-notificacoes" aria-live="polite"></div><script src="../js/validacao.js"></script></body></html>