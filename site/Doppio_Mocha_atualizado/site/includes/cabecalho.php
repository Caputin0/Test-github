<?php require_once __DIR__ . '/funcoes.php'; $buscaAtual = $_GET['q'] ?? ''; ?>
<header class="cabecalho">
 <a href="index.php" class="marca"><img src="../imagens/logo.png" alt="Logo Doppio Mocha"><span>DOPPIO <strong>MOCHA</strong></span></a>
 <form class="pesquisa" action="produtos.php" method="get"><input type="search" name="q" value="<?= h((string)$buscaAtual) ?>" placeholder="O que você está procurando?" aria-label="Pesquisar produtos"><button type="submit" aria-label="Pesquisar">⌕</button></form>
 <div class="acoes-cabecalho"><button type="button" class="botao-tema" id="alternar-tema" aria-label="Alternar tema">☀️</button>
 <?php if (usuarioLogado()): ?><a href="painel.php" class="botao-login">MINHA CONTA</a><?php else: ?><a href="login.php" class="botao-login">ENTRAR</a><?php endif; ?>
 <a href="carrinho.php" class="carrinho" id="link-carrinho">🛒 Carrinho (<span id="contador-carrinho">0</span>)</a></div>
</header>
<nav class="menu-categorias"><a href="index.php">Início</a><a href="produtos.php">Todos os produtos</a><a href="produtos.php?categoria=Cafés">Cafés</a><a href="produtos.php?categoria=Bebidas%20geladas">Bebidas geladas</a><a href="produtos.php?categoria=Combos">Combos</a><a href="produtos.php?categoria=Doces">Doces</a></nav>
<div id="area-notificacoes" class="area-notificacoes" aria-live="polite"></div>
<?php if (!empty($_SESSION['flash'])): ?><div class="aviso-flash" role="status"><?= h($_SESSION['flash']) ?></div><?php unset($_SESSION['flash']); endif; ?>
