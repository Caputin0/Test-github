CREATE DATABASE IF NOT EXISTS doppio_mocha CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE doppio_mocha;

CREATE TABLE IF NOT EXISTS usuarios (
 id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 nome VARCHAR(120) NOT NULL,
 email VARCHAR(160) NOT NULL UNIQUE,
 senha VARCHAR(255) NOT NULL,
 criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS categorias (
 id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 nome VARCHAR(80) NOT NULL UNIQUE
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS produtos (
 id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 categoria_id INT UNSIGNED NULL,
 nome VARCHAR(140) NOT NULL,
 descricao TEXT NULL,
 preco DECIMAL(10,2) NOT NULL,
 imagem VARCHAR(255) NULL,
 estoque INT UNSIGNED NOT NULL DEFAULT 0,
 ativo TINYINT(1) NOT NULL DEFAULT 1,
 criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 CONSTRAINT fk_produtos_categoria FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE SET NULL
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS pedidos (
 id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 usuario_id INT UNSIGNED NOT NULL,
 total DECIMAL(10,2) NOT NULL,
 metodo_pagamento ENUM('pix','cartao','dinheiro') NOT NULL,
 status ENUM('recebido','em_preparo','concluido','cancelado') NOT NULL DEFAULT 'recebido',
 criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 CONSTRAINT fk_pedido_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE RESTRICT,
 INDEX idx_pedidos_usuario_data (usuario_id, criado_em)
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS itens_pedido (
 id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 pedido_id BIGINT UNSIGNED NOT NULL,
 produto_id INT UNSIGNED NULL,
 nome_produto VARCHAR(140) NOT NULL,
 quantidade INT UNSIGNED NOT NULL,
 preco_unitario DECIMAL(10,2) NOT NULL,
 CONSTRAINT fk_item_pedido FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE,
 CONSTRAINT fk_item_produto FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE SET NULL
) ENGINE=InnoDB;

UPDATE categorias SET nome='Cafés' WHERE id=1;
UPDATE categorias SET nome='Bebidas geladas' WHERE id=2;
UPDATE categorias SET nome='Combos' WHERE id=3;
INSERT IGNORE INTO categorias (id,nome) VALUES (4,'Doces');
DELETE FROM produtos WHERE nome IN ('Teclado Gamer','Mouse Gamer');
INSERT INTO produtos (categoria_id,nome,descricao,preco,imagem,estoque,ativo)
SELECT 1,'Espresso Doppio','Café espresso intenso, encorpado e preparado na hora.',6.50,'cafe.png',40,1 WHERE NOT EXISTS (SELECT 1 FROM produtos WHERE nome='Espresso Doppio');
INSERT INTO produtos (categoria_id,nome,descricao,preco,imagem,estoque,ativo)
SELECT 1,'Cappuccino Mocha','Café espresso com leite vaporizado e chocolate.',12.90,'cafe.png',30,1 WHERE NOT EXISTS (SELECT 1 FROM produtos WHERE nome='Cappuccino Mocha');
INSERT INTO produtos (categoria_id,nome,descricao,preco,imagem,estoque,ativo)
SELECT 2,'Café gelado mocha','Bebida gelada com café e toque de chocolate.',8.90,'cafe.png',30,1 WHERE NOT EXISTS (SELECT 1 FROM produtos WHERE nome='Café gelado mocha');
INSERT INTO produtos (categoria_id,nome,descricao,preco,imagem,estoque,ativo)
SELECT 3,'Combo Rochedo','Café especial acompanhado de um doce da casa.',18.00,'cafe.png',15,1 WHERE NOT EXISTS (SELECT 1 FROM produtos WHERE nome='Combo Rochedo');
INSERT INTO produtos (categoria_id,nome,descricao,preco,imagem,estoque,ativo)
SELECT 4,'Brownie de chocolate','Brownie macio com chocolate.',7.50,'cafe.png',20,1 WHERE NOT EXISTS (SELECT 1 FROM produtos WHERE nome='Brownie de chocolate');
