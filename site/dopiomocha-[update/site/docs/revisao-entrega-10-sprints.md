# Doppio Mocha — Revisão das 10 Sprints

**Versão:** revisão para entrega de 18/11/2026  
**Escopo:** avaliação documental e inspeção estática do pacote. Os resultados abaixo não substituem a demonstração no navegador.

## Resumo
O projeto é uma loja demonstrativa de cafeteria. A interface usa HTML, CSS e JavaScript; o backend existente usa PHP e MySQL. O roteiro de 10 Sprints do professor é orientado ao frontend, portanto o backend é complementar e não deve ser apresentado como requisito do roteiro.

## Registro por sprint

| Sprint | Evidência encontrada/adicionada | Situação honesta |
|---|---|---|
| 01 — Tema e organização | Tema Doppio Mocha, README, páginas e organograma TXT/PNG | Parcial: validar mapa de navegação com o professor |
| 02 — HTML e navegação | Páginas index, produtos, detalhes, carrinho, pagamento, cadastro, login e painel | Conferir todos os links manualmente no navegador |
| 03 — CSS responsivo | Folhas `css/code.css` e `html/style.css`, media queries e ajustes para filtros/modal | Executar teste em 1440px e 390px |
| 04 — Eventos e DOM | Adicionar ao carrinho, notificações, tema, atualização dinâmica de quantidades | JS verificado sintaticamente; testar ações no navegador |
| 05 — Arrays e listas | Carrinho usa arrays; catálogo transforma cards em objetos com `map()` | Demonstrar filtro/ordenação e manipulação dos dados |
| 06 — Formulários | Cadastro/login com validações; dica de senha em tempo real e conferência de confirmação | Testar entradas válidas e inválidas |
| 07 — Modal e confirmação | `<dialog>` nativo para remover item/esvaziar carrinho; Cancelar, Confirmar e Esc | Testar foco, cancelamento e confirmação no navegador |
| 08 — Persistência | Carrinho e tema salvos no `localStorage` | Testar atualização da página e reabertura do navegador |
| 09 — Acessibilidade e UX | `aria-live`, rótulos de botões, foco visível e movimento reduzido | Fazer navegação completa por teclado e conferir contraste |
| 10 — Revisão final | README, documentação, organogramas e pacote ZIP organizado | Concluir testes reais e anexar capturas antes de declarar aprovação |

## Alterações feitas nesta revisão
- `site/js/script.js`: refeito para atualizar carrinho sem recarregar a página; adicionados filtro por nome/categoria e ordenação por nome/preço; confirmação de remoção e limpeza.
- `site/html/produtos.php`: controles de filtro e ordenação.
- `site/html/carrinho.php`: diálogo de confirmação.
- `site/js/validacao.js`: orientação de senha e validação de confirmação em tempo real.
- `site/css/code.css`: estilos para filtros, diálogo, foco visível e preferência por movimento reduzido.
- `site/README.md`: instruções e descrição das novas funções.
- Organogramas TXT e PNG.

## Testes executados nesta revisão
- Verificação sintática dos três arquivos JavaScript com `node --check`: sem erros.
- Inspeção dos caminhos e conteúdo dos arquivos no ZIP.
- **Não executado neste ambiente:** testes interativos no navegador, conexão real com MySQL, cadastro/login e gravação de pedidos. Não registrar esses itens como aprovados até testá-los localmente.

## Roteiro de demonstração recomendado
1. Abrir o catálogo e pesquisar por parte do nome de um produto.
2. Ordenar por menor e maior preço.
3. Adicionar produto ao carrinho; atualizar a página e verificar a persistência.
4. Aumentar/diminuir quantidade; remover um produto e cancelar; repetir e confirmar.
5. Esvaziar o carrinho, testando Cancelar e Confirmar.
6. Alternar tema e atualizar a página.
7. No cadastro, testar senha curta, senha sem número e confirmação diferente.
8. Navegar usando Tab, Shift+Tab, Enter e Esc.
9. Repetir a inspeção em larguras aproximadas de 1440px e 390px.
10. Se o backend for demonstrado, configurar MySQL e testar cadastro, login e pedido com dados fictícios.

## Pendências antes do envio
- Executar os passos de demonstração em navegador real e registrar capturas com nomes claros.
- Testar PHP/MySQL em ambiente local configurado.
- Confirmar que todas as páginas e links abrem sem erro.
- Não usar senhas nem dados pessoais reais nas evidências.
