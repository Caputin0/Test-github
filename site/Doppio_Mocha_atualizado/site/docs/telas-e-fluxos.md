# Telas e fluxos — Doppio Mocha

- **Início (`html/index.php`)**: apresentação da cafeteria e produtos em destaque.
- **Cardápio (`html/produtos.php`)**: catálogo, categorias e busca.
- **Detalhes (`html/detalhes_produto.php`)**: descrição, preço e disponibilidade.
- **Login/cadastro (`html/login.php`, `html/cadastro.php`)**: autenticação e criação de conta.
- **Carrinho (`html/carrinho.php`)**: itens, quantidades, remoção e total.
- **Pagamento (`html/pagamento.php`)**: escolha demonstrativa do método e confirmação.
- **Minha conta (`html/painel.php`)**: histórico de pedidos e saída.

## Fluxo principal

```mermaid
flowchart TD
 A[Início] --> B[Cardápio / Busca]
 B --> C[Detalhes do produto]
 C --> D[Adicionar ao carrinho]
 D --> E[Carrinho]
 E --> F{Usuário autenticado?}
 F -- Não --> G[Login ou cadastro]
 G --> H[Pagamento demonstrativo]
 F -- Sim --> H
 H --> I[Confirmar pedido]
 I --> J[Gravar pedido no MySQL]
 J --> K[Minha conta / Histórico]
```
