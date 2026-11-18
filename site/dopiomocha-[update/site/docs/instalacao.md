# Instalação — Doppio Mocha

## Requisitos
- PHP 8.1 ou superior com extensões PDO e PDO MySQL habilitadas.
- MySQL 8 ou compatível.
- Navegador atualizado.

> O MySQL é o sistema de gerenciamento do banco de dados. Ele não executa arquivos PHP; por isso, é necessário ter o PHP instalado e iniciar seu servidor embutido para testar o site localmente. Não é necessário instalar XAMPP.

## 1. Preparar o banco de dados
1. Inicie o serviço MySQL no seu ambiente.
2. Abra um cliente MySQL (terminal, MySQL Workbench ou outro).
3. Execute o arquivo `database/doppio_mocha.sql` para criar o banco `doppio_mocha`, suas tabelas e produtos iniciais.

Exemplo pelo terminal:

```bash
mysql -u root -p < database/doppio_mocha.sql
```

## 2. Configurar a conexão
Abra `config/conexao.php` e ajuste host, nome do banco, usuário e senha de acordo com sua instalação MySQL. O padrão do projeto é `localhost`, banco `doppio_mocha`, usuário `root` e senha vazia (altere para as credenciais do seu ambiente).

## 3. Iniciar o PHP
No terminal, entre na pasta `site` do projeto e execute:

```bash
php -S localhost:8000 -t html
```

Como os arquivos PHP usam pastas irmãs (`config`, `includes`, `auth`, `pedidos`), a raiz do servidor precisa ser a pasta `site`. Use o comando correto:

```bash
php -S localhost:8000
```

Depois abra `http://localhost:8000/html/index.php` no navegador.

## 4. Primeiro acesso
- Crie uma conta pela opção **Entrar** e depois **Cadastre-se**.
- Entre com o e-mail e a senha cadastrados.
- Adicione produtos ao carrinho, revise quantidades e avance para o pagamento demonstrativo.
- Consulte os pedidos em **Minha conta**.

## Observações
- O pagamento é apenas demonstrativo; não existe integração com gateway e nenhum dado de cartão é coletado.
- O carrinho fica no armazenamento local do navegador. Os pedidos confirmados são gravados no MySQL.
- Nunca publique credenciais reais no repositório. Configure usuário próprio e senha forte no MySQL.
