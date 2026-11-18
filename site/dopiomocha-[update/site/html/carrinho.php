<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Carrinho | Doppio Mocha</title><link rel="stylesheet" href="../css/code.css"></head><body><?php require __DIR__.'/../includes/cabecalho.php'; ?><main class="secao-produtos"><div class="titulo-secao"><div><span class="subtitulo-secao">SEU PEDIDO</span><h2>Carrinho de compras</h2></div></div><div id="itens-carrinho" class="carrinho-lista"></div><p id="carrinho-vazio" class="mensagem-vazia">Seu carrinho está vazio. <a href="produtos.php">Ver cardápio</a></p><div id="resumo-carrinho" class="resumo-carrinho" hidden><strong id="total-carrinho"></strong><div class="acoes-carrinho"><button type="button" id="limpar-carrinho" class="botao-secundario">Esvaziar carrinho</button><a href="pagamento.php" class="botao-principal">Continuar para pagamento</a></div></div><dialog id="modal-confirmacao" class="modal-confirmacao" aria-labelledby="titulo-modal">
<div class="modal-conteudo">
<span class="subtitulo-secao">CONFIRMAÇÃO</span>
<h2 id="titulo-modal">Confirmar ação</h2>
<p id="mensagem-modal">Deseja continuar?</p>
<div class="modal-acoes">
<button type="button" class="botao-secundario" data-fechar-modal>Cancelar</button>
<button type="button" class="botao-principal" id="confirmar-modal">Confirmar</button>
</div>
</div>
</dialog>
</main><?php require __DIR__.'/../includes/rodape.php'; ?></body></html>
