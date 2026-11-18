# Requisitos — Doppio Mocha

## Requisitos funcionais
- RF01: permitir cadastro com nome, e-mail e senha.
- RF02: autenticar usuários por e-mail e senha.
- RF03: validar campos no navegador e no servidor.
- RF04: exibir notificações de sucesso, erro e ações do carrinho.
- RF05: listar produtos ativos e suas categorias.
- RF06: pesquisar produtos por nome ou descrição.
- RF07: exibir detalhes de cada produto.
- RF08: adicionar produtos ao carrinho, alterar quantidades e remover itens.
- RF09: calcular e exibir o total do carrinho.
- RF10: permitir selecionar uma forma de pagamento demonstrativa e confirmar o pedido.
- RF11: registrar pedidos e itens no MySQL e atualizar o estoque.
- RF12: permitir que o cliente consulte seu histórico de pedidos.
- RF13: alternar entre tema claro e escuro, persistindo a preferência no navegador.

## Requisitos não funcionais
- RNF01: armazenar senhas com `password_hash()` e verificar com `password_verify()`.
- RNF02: acessar o banco usando PDO e consultas preparadas.
- RNF03: oferecer interface responsiva e compatível com navegadores atuais.
- RNF04: escapar conteúdo dinâmico exibido em HTML.
- RNF05: não armazenar dados de cartão nem simular aprovação de pagamento real.
- RNF06: exigir PHP 8.1+ e MySQL compatível.

## Regras de negócio
- RN01: o e-mail de cada usuário deve ser único.
- RN02: a senha deve possuir no mínimo 8 caracteres, incluindo letra e número.
- RN03: o usuário só será autenticado quando a senha corresponder ao hash armazenado.
- RN04: somente produtos ativos e com estoque disponível podem ser adicionados ao pedido.
- RN05: o valor dos itens é consultado no banco no momento da confirmação; o navegador não define o preço final.
- RN06: cada pedido pertence ao usuário autenticado.
- RN07: as formas de pagamento são demonstrativas e não processam transações reais.

## Histórias de usuário
- Como visitante, quero criar uma conta para realizar pedidos.
- Como cliente, quero pesquisar e ver detalhes dos produtos para escolher o que desejo.
- Como cliente, quero adicionar, remover e alterar quantidades no carrinho para organizar meu pedido.
- Como cliente autenticado, quero confirmar um pedido e selecionar uma forma de pagamento demonstrativa.
- Como cliente autenticado, quero consultar meus pedidos anteriores.
- Como usuário, quero alternar o tema para melhorar o conforto visual.
