<?php
require_once __DIR__ . '/../config/sessao.php';
$erro = $_SESSION['erro_cadastro'] ?? '';
unset($_SESSION['erro_cadastro']);
?>
<!DOCTYPE html><html lang="pt-br"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Cadastro | Doppio Mocha</title><link rel="stylesheet" href="style.css"><link rel="stylesheet" href="../css/code.css"></head>
<body class="pagina-login"><nav class="logo-login"><a href="index.php"><img src="../imagens/logo.png" alt="Doppio Mocha" class="logo-login"></a><p>Crie sua conta e aproveite a Doppio Mocha.</p></nav>
<form class="form-login" action="../auth/cadastrar.php" method="post" id="form-cadastro" novalidate><h2>Criar conta</h2><p class="subtitulo">Preencha seus dados</p>
<?php if ($erro): ?><p class="mensagem-erro" role="alert"><?= htmlspecialchars($erro, ENT_QUOTES, 'UTF-8') ?></p><?php endif; ?>
<div class="campo"><label for="nome">Nome completo</label><input type="text" id="nome" name="nome" required minlength="3" maxlength="120" autocomplete="name"></div>
<div class="campo"><label for="email">E-mail</label><input type="email" id="email" name="email" required maxlength="160" autocomplete="email"></div>
<div class="campo"><label for="senha">Senha</label><input type="password" id="senha" name="senha" required minlength="8" autocomplete="new-password" aria-describedby="dica-senha"><small id="dica-senha">Mínimo de 8 caracteres, com letra e número.</small></div>
<div class="campo"><label for="confirmar_senha">Confirmar senha</label><input type="password" id="confirmar_senha" name="confirmar_senha" required autocomplete="new-password"></div>
<button type="submit" class="botao-entrar">Cadastrar</button><p class="cadastro">Já possui uma conta? <a href="login.php">Entrar</a></p><a href="index.php" class="voltar">Voltar para a loja</a></form>
<footer class="footer-login">Doppio Mocha</footer><div id="area-notificacoes" class="area-notificacoes" aria-live="polite"></div><script src="../js/validacao.js"></script></body></html>