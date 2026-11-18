# Doppio Mocha

Loja virtual demonstrativa de cafeteria, desenvolvida com PHP, MySQL, HTML, CSS e JavaScript.

## Funcionalidades
- Catálogo de cafés, bebidas, combos e doces, com busca e detalhes.
- Carrinho com quantidades, remoção e cálculo de total.
- Cadastro e login com hash de senha e validação.
- Checkout demonstrativo e gravação de pedidos no MySQL.
- Painel do cliente com histórico de pedidos.
- Alternância entre tema claro e escuro e notificações.
- Filtro instantâneo do catálogo por nome/categoria e ordenação por preço ou nome.
- Confirmação acessível para remover produtos ou esvaziar o carrinho, sem recarregar a página.
- Orientações de foco visível, mensagens acessíveis e respeito à preferência por movimento reduzido.

## Requisitos
- PHP 8.1+ com PDO MySQL habilitado.
- MySQL 8 ou compatível.
- Navegador atualizado.

## Executar localmente
1. Crie/import o banco executando `site/database/doppio_mocha.sql` no MySQL.
2. Ajuste as credenciais em `site/config/conexao.php`.
3. No terminal, entre na pasta `site` e execute `php -S localhost:8000`.
4. Acesse `http://localhost:8000/html/index.php`.

Não é necessário XAMPP. O MySQL é o banco de dados; o PHP continua necessário para executar a aplicação.

## Recursos de interface adicionados para a revisão das Sprints
- `js/script.js`: carrinho com atualização dinâmica, filtro/ordenação usando `filter()`, `map()` e `sort()`, e confirmação de ações.
- `html/carrinho.php`: diálogo HTML nativo (`<dialog>`) para confirmar remoção e limpeza do carrinho. O navegador gerencia foco e tecla Esc.
- `js/validacao.js`: validação de cadastro/login e orientação de senha em tempo real.
- `css/code.css`: estilos responsivos para filtros, modal, foco visível e preferência por movimento reduzido.

## Estrutura
- `site/html/`: páginas da aplicação.
- `site/config/`: conexão PDO e sessão.
- `site/auth/`: cadastro, login e logout.
- `site/pedidos/`: confirmação de pedidos.
- `site/includes/`: funções e componentes compartilhados.
- `site/database/`: script SQL.
- `site/css/`, `site/js/`, `site/imagens/`: interface, interações e imagens.
- `site/docs/`: documentação técnica e manual.

## Segurança e limitações
Senhas são armazenadas com `password_hash()` e verificadas com `password_verify()`. As consultas usam PDO preparado. O preço é obtido do banco ao confirmar o pedido. O pagamento é apenas demonstrativo: não há integração com gateway, cobrança Pix ou coleta de dados financeiros.
