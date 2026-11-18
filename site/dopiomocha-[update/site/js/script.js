'use strict';
const CHAVE_CARRINHO = 'doppio-carrinho';

function lerCarrinho() {
  try {
    const dados = JSON.parse(localStorage.getItem(CHAVE_CARRINHO) || '[]');
    return Array.isArray(dados) ? dados : [];
  } catch { return []; }
}
function salvarCarrinho(itens) {
  localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(itens));
  atualizarContador();
}
function atualizarContador() {
  const el = document.getElementById('contador-carrinho');
  if (el) el.textContent = lerCarrinho().reduce((s, i) => s + Number(i.quantidade || 0), 0);
}
function notificar(msg, tipo = 'sucesso') {
  let area = document.getElementById('area-notificacoes');
  if (!area) {
    area = document.createElement('div');
    area.id = 'area-notificacoes';
    area.className = 'area-notificacoes';
    area.setAttribute('aria-live', 'polite');
    area.setAttribute('aria-atomic', 'true');
    document.body.prepend(area);
  }
  const aviso = document.createElement('div');
  aviso.className = `notificacao ${tipo}`;
  aviso.setAttribute('role', tipo === 'erro' ? 'alert' : 'status');
  aviso.textContent = msg;
  area.append(aviso);
  window.setTimeout(() => aviso.remove(), 3500);
}
function dinheiro(valor) {
  return Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

document.addEventListener('DOMContentLoaded', () => {
  atualizarContador();

  // Adição ao carrinho: atualiza os dados persistidos no navegador.
  document.querySelectorAll('.botao-comprar[data-id]').forEach(botao => {
    botao.addEventListener('click', () => {
      const produto = {
        id: Number(botao.dataset.id),
        nome: botao.dataset.nome,
        preco: Number(botao.dataset.preco),
        imagem: botao.dataset.imagem,
        quantidade: 1
      };
      const itens = lerCarrinho();
      const existente = itens.find(item => item.id === produto.id);
      if (existente) existente.quantidade += 1;
      else itens.push(produto);
      salvarCarrinho(itens);
      notificar(`${produto.nome} adicionado ao carrinho!`);
      const textoOriginal = botao.textContent;
      botao.textContent = 'Adicionado ✓';
      window.setTimeout(() => { botao.textContent = textoOriginal; }, 1000);
    });
  });

  // Catálogo: array de objetos criado a partir dos cards reais da página.
  const grade = document.querySelector('.grade-produtos');
  const campoBusca = document.getElementById('busca-catalogo');
  const ordenar = document.getElementById('ordenar-catalogo');
  const contadorResultados = document.getElementById('contador-resultados');
  if (grade && (campoBusca || ordenar)) {
    const produtos = Array.from(grade.querySelectorAll('.produto')).map((card, indice) => ({
      elemento: card,
      nome: card.querySelector('h3')?.textContent.trim() || '',
      categoria: card.querySelector('.categoria-produto')?.textContent.trim() || '',
      preco: Number(card.querySelector('.botao-comprar')?.dataset.preco || 0),
      ordem: indice
    }));

    const aplicarFiltros = () => {
      const termo = (campoBusca?.value || '').trim().toLocaleLowerCase('pt-BR');
      const modo = ordenar?.value || 'nome';
      let resultado = produtos.filter(produto =>
        produto.nome.toLocaleLowerCase('pt-BR').includes(termo) ||
        produto.categoria.toLocaleLowerCase('pt-BR').includes(termo)
      );

      resultado = resultado.map(produto => produto);
      resultado.sort((a, b) => {
        if (modo === 'menor-preco') return a.preco - b.preco || a.ordem - b.ordem;
        if (modo === 'maior-preco') return b.preco - a.preco || a.ordem - b.ordem;
        return a.nome.localeCompare(b.nome, 'pt-BR');
      });

      const fragmento = document.createDocumentFragment();
      resultado.forEach(produto => fragmento.appendChild(produto.elemento));
      grade.appendChild(fragmento);
      produtos.filter(produto => !resultado.includes(produto)).forEach(produto => {
        produto.elemento.hidden = true;
      });
      resultado.forEach(produto => { produto.elemento.hidden = false; });
      if (contadorResultados) {
        contadorResultados.textContent = `${resultado.length} de ${produtos.length} produto(s)`;
      }
      let vazio = document.getElementById('catalogo-sem-resultados');
      if (!vazio) {
        vazio = document.createElement('p');
        vazio.id = 'catalogo-sem-resultados';
        vazio.className = 'mensagem-vazia';
        vazio.textContent = 'Nenhum produto corresponde à sua busca.';
        vazio.hidden = true;
        grade.after(vazio);
      }
      vazio.hidden = resultado.length !== 0;
    };
    campoBusca?.addEventListener('input', aplicarFiltros);
    ordenar?.addEventListener('change', aplicarFiltros);
    aplicarFiltros();
  }

  // Carrinho: renderização sem recarregar a página e confirmação em diálogo nativo.
  const lista = document.getElementById('itens-carrinho');
  const vazio = document.getElementById('carrinho-vazio');
  const resumo = document.getElementById('resumo-carrinho');
  const modal = document.getElementById('modal-confirmacao');
  const mensagemModal = document.getElementById('mensagem-modal');
  const confirmarModal = document.getElementById('confirmar-modal');
  let acaoPendente = null;

  const abrirConfirmacao = (mensagem, acao) => {
    if (!modal || typeof modal.showModal !== 'function') {
      if (window.confirm(mensagem)) acao();
      return;
    }
    mensagemModal.textContent = mensagem;
    acaoPendente = acao;
    modal.showModal();
  };

  if (modal) {
    modal.querySelectorAll('[data-fechar-modal]').forEach(botao =>
      botao.addEventListener('click', () => modal.close())
    );
    confirmarModal?.addEventListener('click', () => {
      const executar = acaoPendente;
      acaoPendente = null;
      modal.close();
      if (executar) executar();
    });
    modal.addEventListener('close', () => { acaoPendente = null; });
  }

  const renderizarCarrinho = () => {
    if (!lista) return;
    const itens = lerCarrinho();
    lista.replaceChildren();
    if (vazio) vazio.hidden = itens.length > 0;
    if (resumo) resumo.hidden = itens.length === 0;

    itens.forEach(item => {
      const linha = document.createElement('article');
      linha.className = 'linha-carrinho';
      const img = document.createElement('img');
      img.src = item.imagem;
      img.alt = `Imagem de ${item.nome}`;
      const info = document.createElement('div');
      const titulo = document.createElement('h3');
      titulo.textContent = item.nome;
      const preco = document.createElement('p');
      preco.textContent = dinheiro(item.preco);
      info.append(titulo, preco);

      const controles = document.createElement('div');
      controles.className = 'controle-qtd';
      const menos = document.createElement('button');
      menos.type = 'button'; menos.textContent = '−';
      menos.setAttribute('aria-label', `Diminuir quantidade de ${item.nome}`);
      const quantidade = document.createElement('span');
      quantidade.textContent = item.quantidade;
      quantidade.setAttribute('aria-live', 'polite');
      const mais = document.createElement('button');
      mais.type = 'button'; mais.textContent = '+';
      mais.setAttribute('aria-label', `Aumentar quantidade de ${item.nome}`);
      const remover = document.createElement('button');
      remover.type = 'button'; remover.textContent = 'Remover';
      remover.className = 'botao-remover';
      menos.addEventListener('click', () => alterarQuantidade(item.id, -1));
      mais.addEventListener('click', () => alterarQuantidade(item.id, 1));
      remover.addEventListener('click', () => abrirConfirmacao(
        `Deseja remover "${item.nome}" do carrinho?`,
        () => { salvarCarrinho(lerCarrinho().filter(produto => produto.id !== item.id)); renderizarCarrinho(); notificar('Produto removido do carrinho.'); }
      ));
      controles.append(menos, quantidade, mais, remover);
      linha.append(img, info, controles);
      lista.append(linha);
    });

    const total = itens.reduce((soma, item) => soma + Number(item.preco) * Number(item.quantidade), 0);
    const totalEl = document.getElementById('total-carrinho');
    if (totalEl) totalEl.textContent = `Total: ${dinheiro(total)}`;
  };
  renderizarCarrinho();

  const limpar = document.getElementById('limpar-carrinho');
  limpar?.addEventListener('click', () => abrirConfirmacao(
    'Tem certeza de que deseja esvaziar todo o carrinho?',
    () => { salvarCarrinho([]); renderizarCarrinho(); notificar('Carrinho esvaziado.'); }
  ));

  // O checkout envia somente os itens para o backend; não processa pagamento real.
  const formPagamento = document.getElementById('form-pagamento');
  if (formPagamento) {
    const itens = lerCarrinho();
    const botaoEnviar = formPagamento.querySelector('button[type="submit"]');
    if (!itens.length) {
      notificar('Seu carrinho está vazio.', 'erro');
      if (botaoEnviar) botaoEnviar.disabled = true;
      const resumoPagamento = document.getElementById('resumo-pagamento');
      if (resumoPagamento) resumoPagamento.textContent = 'Adicione produtos antes de finalizar o pedido.';
    } else {
      const total = itens.reduce((soma, item) => soma + item.preco * item.quantidade, 0);
      const resumoPagamento = document.getElementById('resumo-pagamento');
      if (resumoPagamento) resumoPagamento.textContent =
        `${itens.reduce((soma, item) => soma + item.quantidade, 0)} item(ns) — total ${dinheiro(total)}.`;
      formPagamento.addEventListener('submit', () => {
        let campo = formPagamento.querySelector('[name="itens"]');
        if (!campo) {
          campo = document.createElement('input');
          campo.type = 'hidden';
          campo.name = 'itens';
          formPagamento.append(campo);
        }
        campo.value = JSON.stringify(itens);
      });
    }
  }
});
