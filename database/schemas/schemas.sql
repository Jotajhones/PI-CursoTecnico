-- DROP DATABASE vendasBlusaBlusas; 
-- CREATE DATABASE vendasBlusaBlusas; 
-- USE vendasBlusaBlusas; 
-- SHOW TABLES; 
-- SHOW DATABASES; 


----- TABELAS -----

CREATE DATABASE testePI; 
USE testePI; 

CREATE TABLE pessoa ( 
 id_pessoa INT PRIMARY KEY AUTO_INCREMENT,  
 nome VARCHAR(25) NOT NULL,  
 email VARCHAR(50) NOT NULL UNIQUE,  
 cpf CHAR(15) NOT NULL UNIQUE,  
 situacao ENUM('ativo', 'inativo') DEFAULT 'ativo',  
 genero VARCHAR(20) NOT NULL,  
 dataNascimento DATE NOT NULL,
 dataCadastro DATETIME DEFAULT CURRENT_TIMESTAMP 
); 


CREATE TABLE endereco ( 
 id_endereco INT PRIMARY KEY AUTO_INCREMENT,  
 rua VARCHAR(30) NOT NULL,  
 cidade VARCHAR(30) NOT NULL,  
 bairro VARCHAR(30) NOT NULL,  
 uf VARCHAR(2) NOT NULL,
 cep VARCHAR(10) NOT NULL,
 complemento VARCHAR(30),  
 numero VARCHAR(20),
 tipo_endereco ENUM('residencial', 'comercial') DEFAULT 'residencial',
 situacao CHAR(1) NOT NULL DEFAULT 'A',
 id_pessoa INT NOT NULL, 
 FOREIGN KEY (id_pessoa) REFERENCES pessoa(id_pessoa) 
); 


CREATE TABLE telefone ( 
 id_telefone INT PRIMARY KEY AUTO_INCREMENT,  
 ddd CHAR(2) NOT NULL,  
 numero VARCHAR(9) NOT NULL,
 tipo ENUM('residencial', 'celular', 'comercial') DEFAULT 'celular',
 situacao CHAR(1) NOT NULL DEFAULT 'A',
 id_pessoa INT NOT NULL, 
 FOREIGN KEY (id_pessoa) REFERENCES pessoa(id_pessoa) 
); 


CREATE TABLE login ( 
 id_login INT PRIMARY KEY AUTO_INCREMENT,  
 email VARCHAR(100) NOT NULL,  
 senha VARCHAR(100) NOT NULL,
 tentativas_login INT DEFAULT 0,
 senha_alterada CHAR (1) NOT NULL DEFAULT 'N',
 tipo_usuario ENUM ('Admin', 'Normal') NOT NULL DEFAULT 'Normal',
 data_acesso DATETIME NOT NULL,
 data_saida DATETIME NOT NULL,
 situacao ENUM('ativo', 'Inativo', 'Bloqueado') NOT NULL DEFAULT 'ativo',
 id_pessoa INT,   
 FOREIGN KEY (id_pessoa) REFERENCES pessoa(id_pessoa) 
); 


-- CREATE TABLE movimentacaoCaixa (
-- id_movimentacaoCaixa INT PRIMARY KEY AUTO_INCREMENT,
-- tipo ENUM('Saida', 'Entrada') NOT NULL DEFAULT 'Entrada',
-- origem VARCHAR(50) NOT NULL,
-- valor DECIMAL(10,2) NOT NULL,
-- datas DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
-- descricao VARCHAR(100) NOT NULL,
-- id_administrador INT,
-- id_venda INT,
-- FOREIGN KEY (id_venda) REFERENCES venda(id_venda)
-- );


CREATE TABLE administrador ( 
 id_administrador INT PRIMARY KEY AUTO_INCREMENT,
 matricula VARCHAR (20) NOT NULL,
 cargo VARCHAR(50),  
 salario DECIMAL(10,2),  
 situacao CHAR(1) NOT NULL DEFAULT "A",
 id_pessoa INT,
--  id_movimentacaoCaixa INT, 
--  FOREIGN KEY (id_movimentacaoCaixa) REFERENCES movimentacaoCaixa(id_movimentacaoCaixa),
 FOREIGN KEY (id_pessoa) REFERENCES pessoa(id_pessoa) 
); 


CREATE TABLE usuario ( 
 id_usuario INT PRIMARY KEY AUTO_INCREMENT,      
 desconto DECIMAL(10,2) DEFAULT 0.00,  
 fidelidade VARCHAR(50) DEFAULT 'não',  
 situacao ENUM('ativo', 'inativo') NOT NULL DEFAULT 'ativo',
 id_pessoa INT,
 FOREIGN KEY (id_pessoa) REFERENCES pessoa(id_pessoa) 
);  


CREATE TABLE descricao (
 
 id_descricao INT PRIMARY KEY AUTO_INCREMENT,
 descricao VARCHAR(255),
 url VARCHAR(255) NOT NULL,
 cor VARCHAR(255) NOT NULL,  
 tecido VARCHAR(100) NOT NULL,  
 tamanho ENUM('PP', 'P', 'M', 'G', 'GG') NOT NULL DEFAULT 'P',  
 categoria VARCHAR(20) NOT NULL  
 
); 



CREATE TABLE produto ( 
 id_produto INT PRIMARY KEY AUTO_INCREMENT,  
 denominacao VARCHAR(100) NOT NULL,  
 estoque INT NOT NULL,  
 preco DECIMAL(10,2) NOT NULL,  
 situacao ENUM('ativo', 'esgotado', 'descontinuado') NOT NULL DEFAULT 'ativo',
 id_descricao INT,  
 FOREIGN KEY (id_descricao) REFERENCES descricao(id_descricao)
); 


CREATE TABLE itensVenda ( 
 id_itensVenda INT PRIMARY KEY AUTO_INCREMENT,  
 estoque INT NOT NULL,  
 cancelado CHAR(15) NOT NULL,  
 id_produto INT, 
 FOREIGN KEY (id_produto) REFERENCES produto(id_produto) 
); 


CREATE TABLE historicoPreco(
id_historico_preco INT PRIMARY KEY AUTO_INCREMENT,
data_alteracao DATETIME DEFAULT CURRENT_TIMESTAMP,
preco_antigo DECIMAL (10,2),
preco_novo DECIMAL (10,2),
id_produto INT,
    
FOREIGN KEY (id_produto) REFERENCES produto(id_produto)

);


-- CREATE TABLE notaFiscal (
-- id_notaFiscal INT PRIMARY KEY AUTO_INCREMENT,
-- numero VARCHAR(50),
-- dataEmissao DATE,
-- valorTotal DECIMAL(10,2)   
-- );


CREATE TABLE pagamento (
 
 id_pagamento INT PRIMARY KEY AUTO_INCREMENT,  
 parcela VARCHAR(3),  
 valor DECIMAL(10,2) NOT NULL,  
 dataPagamento DATE NOT NULL,  
 forma_pagamento ENUM('Debito', 'Credito', 'boleto', 'pix') DEFAULT 'pix',
 situacao ENUM('pendente', 'pago', 'cancelado') DEFAULT 'pendente'
); 


CREATE TABLE venda ( 
 id_venda INT PRIMARY KEY AUTO_INCREMENT,  
 desconto DECIMAL(10,2),  
 acrescimo DECIMAL(10,2),   
 cupom VARCHAR(10),  
 dataCompra DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,  
 valorTotal DECIMAL(10,2) NOT NULL,  
 situacao ENUM('confirmada', 'pendente', 'cancelada') NOT NULL DEFAULT 'pendente',
 id_usuario INT,  
 id_pagamento INT, 
 FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
 FOREIGN KEY (id_pagamento) REFERENCES pagamento(id_pagamento)
); 

-- create table pessoasDeletadas (
--     id_pessoas_deletadas INT PRIMARY KEY AUTO_INCREMENT,   
--     nome VARCHAR(25) NOT NULL,
--     email VARCHAR(50) NOT NULL UNIQUE,
--     cpf CHAR(15) NOT NULL UNIQUE,
--     situacao CHAR(1) DEFAULT 'A' NOT NULL,
--     genero VARCHAR(20) NOT NULL,
--     dataNascimento DATE NOT NULL,
--     dataCadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
--     id_pessoa int
-- ) 

-- CREATE TABLE pessoasDeletadas ( 
--  id_pessoa INT PRIMARY KEY AUTO_INCREMENT,  
--  nome VARCHAR(25) NOT NULL,  
--  email VARCHAR(50) NOT NULL UNIQUE,  
--  cpf CHAR(15) NOT NULL UNIQUE,  
--  situacao CHAR(1) DEFAULT 'A' NOT NULL,  
--  genero VARCHAR(20) NOT NULL,  
--  dataNascimento DATE NOT NULL,
--  dataCadastro DATETIME DEFAULT CURRENT_STAMP
-- ); 


-- CREATE TABLE produtosDeletados ( 
--  id_produto INT PRIMARY KEY AUTO_INCREMENT,  
--  denominacao VARCHAR(30) NOT NULL,  
--  estoque INT NOT NULL,  
--  preco DECIMAL(10,2) NOT NULL,  
--  situacao ENUM('ativo', 'esgotado', 'descontinuado') NOT NULL DEFAULT 'ativo'
-- ); 


-- CREATE TABLE vendasDeletadas ( 
--  id_venda INT PRIMARY KEY AUTO_INCREMENT,  
--  desconto DECIMAL(10,2),  
--  acrescimo DECIMAL(10,2),   
--  cupom VARCHAR(20),  
--  dataCompra DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,  
--  valorTotal DECIMAL(10,2) NOT NULL,  
--  situacao ENUM('confirmada', 'pendente', 'cancelada') NOT NULL DEFAULT 'pendente' 
-- ); 


----- INSERTS -----


-- INSERT INTO pessoa (nome, email, cpf, situacao, genero, dataNascimento, dataCadastro)

-- VALUES ('João Silva', 'joao.silva@email.com', '(61)99999-1234', '123.456.789-00', 'A', 'Masculino', '1990-05-15', NOW());

-- SELECT * FROM pessoa;


-- INSERT INTO endereco (rua, cidade, bairro, uf, cep, situacao, complemento, numero, tipo_endereco, id_pessoa)

-- VALUES ('Rua das Flores', 'Brasília', 'Asa Sul', 'DF', '70000-000', 'A', 'Apto 101', '10', 'residencial', 1);

-- SELECT * FROM endereco;


-- INSERT INTO telefone (ddd, numero, tipo, situacao, id_pessoa)

-- VALUES ('61', '999991234', 'celular', 'A', 1);

-- SELECT * FROM telefone;

-- INSERT INTO login (email, senha, data_acesso, data_saida, id_pessoa)

-- VALUES ('joao.silva@email.com', 'senha123', NOW(), NOW(), 1);

-- SELECT * FROM login;


-- INSERT INTO administrador (matricula, cargo, salario, situacao, id_pessoa, id_movimentacaoCaixa)

-- VALUES ('ADM001', 'Gerente de Vendas', 5000.00, 'A', 1, 1);

-- SELECT * FROM administrador;


-- INSERT INTO movimentacaoCaixa(tipo, origem, valor, descricao, id_administrador, id_venda)

-- VALUES('Entrada', 'Venda de produto', 150.00, 'Venda confirmada de camiseta', NULL, NULL);

-- SELECT * FROM movimentacaoCaixa;


-- INSERT INTO usuario (dataInicio, dataFim, desconto, fidelidade, situacao, id_pessoa)

-- VALUES ('2025-01-01', '2025-12-31', 10.00, 'ouro', 'A', 1);

-- SELECT * FROM usuario;


-- INSERT INTO descricao (descricao, URLimagem, cor, tecido, tamanho, categoria)

-- VALUES ('Camiseta básica', 'https://exemplo.com/imagem.jpg', 'Azul', 'Algodão', 'M', 'Roupas');

-- SELECT * FROM descricao;


-- INSERT INTO produto (denominacao, estoque, preco, situacao, id_descricao)

-- VALUES ('Camiseta Azul M', 100, 49.90, 'ativo', 1);

-- SELECT * FROM produto;


-- INSERT INTO itensVenda (estoque, cancelado, id_produto)

-- VALUES (50, 'Não', 1);

-- SELECT * FROM itensVenda;


-- INSERT INTO pagamento (parcela, valor, dataPagamento, forma_pagamento, situacao)

-- VALUES ('1', 49.90, '2025-07-04', 'pix', 'pago');

-- SELECT * FROM pagamento;


-- INSERT INTO entradas (numero, dataEmissao, valorTotal)

-- VALUES ('NF123456', '2025-07-04', 49.90);

-- SELECT * FROM entradas;


-- INSERT INTO venda (desconto, acrescimo, cupom, dataCompra, valorTotal, situacao, id_usuario, id_pagamento, id_itensVenda, id_notaFiscal)

-- VALUES (0.00, 0.00, 'PROMO10', NOW(), 49.90, 'confirmada', 1, 1, 1, 1);

-- SELECT * FROM venda;


----- TRIGGERS -----


/* BEFORE == antes
   AFTER == depois */

-- /* Preço novo e preço antigo depois de atualizar produto*/
-- DELIMITER //
-- CREATE TRIGGER auditoriaPreco 
-- AFTER UPDATE ON produto FOR EACH ROW  ## depois de atualizar 'produto' em qualquer uma das linhas
-- BEGIN 
--     IF (OLD.preco <> NEW.preco) THEN
--         INSERT INTO historicoPreco (preco_antigo, preco_novo, id_produto)
--         VALUES (OLD.preco, NEW.preco, NEW.id_produto);
--     END IF;
-- END;
-- // DELIMITER ;



-- /* Pessoas atualmente deletadas antes de atualizar pessoa*/
-- DELIMITER //
-- CREATE TRIGGER pessoasDeletadas
-- BEFORE DELETE ON pessoa FOR EACH ROW
-- BEGIN
--     INSERT INTO pessoasDeletadas (id_pessoa, nome, email, cpf, situacao, genero, dataNascimento)
--     VALUES (OLD.id_pessoa, OLD.nome, OLD.email, OLD.cpf, OLD.situacao, OLD.genero, OLD.dataNascimento);
-- END; // DELIMITER ;



-- /* Atualiza as vendas canceladas depois de atualizar Itens vendas*/
-- DELIMITER //
-- CREATE TRIGGER atualizarVendasCanceladas
-- AFTER UPDATE ON itensVenda FOR EACH ROW
-- BEGIN
--     IF (OLD.cancelado <> NEW.cancelado) THEN
--         UPDATE venda SET valorTotal = (
--             SELECT SUM(p.preco) FROM itensVenda iv
--             INNER JOIN produto p ON p.id_produto = iv.id_produto
--             WHERE iv.id_itensVenda = NEW.id_itensVenda AND iv.cancelado = 'N'
--         )
--         WHERE id_itensVenda = NEW.id_itensVenda;
--     END IF;
-- END;
-- // DELIMITER ;


-- SELECT SUM(valorTotal) FROM itensVenda WHERE id_venda = 1;
-- SELECT * FROM venda;
-- UPDATE itensVenda SET cancelado = 'N' WHERE id_itensVenda = 1;
-- SELECT * FROM itensVenda;


-- /* Recalcular venda depois de atualizar vendas*/
-- DELIMITER //
-- CREATE TRIGGER recalcularVenda
-- AFTER UPDATE ON venda FOR EACH ROW
-- BEGIN
--     IF (OLD.valorTotal <> NEW.valorTotal) THEN
--         UPDATE venda SET valorTotal = NEW.valorTotal
--         WHERE id_venda = NEW.id_venda;
--     END IF;
-- END;
-- // DELIMITER


-- /* Retornar um produto para o estoque */
-- DELIMITER //
-- CREATE TRIGGER retornarEstoque
-- AFTER UPDATE ON itensVenda FOR EACH ROW
-- BEGIN
--     IF (OLD.cancelado <> NEW.cancelado) AND (NEW.cancelado = 'S') THEN
--         UPDATE produto
--         SET estoque = estoque + OLD.estoque
--         WHERE id_produto = NEW.id_produto;
--     END IF;
-- END;
-- // DELIMITER ;


-- SELECT * FROM venda;
-- SELECT * FROM itens_venda ORDER BY id_itens_venda DESC LIMIT 3;
-- UPDATE itens_venda SET cancelado = 'S' WHERE id_itens_venda = 20;


----- RELATORIOS -----


/* Verificando quem é Administrador e Usuario */
-- CREATE VIEW relatorioLoginUsuarioAdministrador AS

-- SELECT ps.nome, ps.situacao, adm.cargo, adm.salario, us.dataInicio, us.dataFim,
-- 	   ps.email AS email_pessoa, lg.email AS email_login, lg.senha FROM pessoa ps
       
-- LEFT JOIN administrador adm ON adm.id_pessoa = ps.id_pessoa
-- LEFT JOIN usuario us ON us.id_pessoa = ps.id_pessoa
-- LEFT JOIN login lg ON lg.id_pessoa = ps.id_pessoa;

-- SELECT * FROM relatorioLoginUsuarioAdministrador;



/* Verificando vendas dos produtos */
-- CREATE VIEW relatorioVendasProdutos AS

-- SELECT p.denominacao, p.preco, v.desconto, v.acrescimo, v.cupom, v.dataCompra,
--        v.valorTotal, iv.estoque, d.URLimagem, d.cor, d.tecido, d.tamanho,
--        d.categoria FROM venda v
       
-- INNER JOIN itensVenda iv ON iv.id_itensVenda = v.id_itensVenda
-- INNER JOIN produto p ON p.id_produto = iv.id_produto
-- INNER JOIN descricao d ON d.id_descricao = p.id_descricao
-- INNER JOIN pagamento pg ON pg.id_pagamento = v.id_pagamento;

-- SELECT * FROM relatorioVendasProdutos;



/* Verificando Estoque de produtos */
-- CREATE VIEW relatorioVerificarEstoque AS

-- SELECT p.id_produto, p.denominacao, p.estoque, iv.estoque, p.situacao, d.url,
--        d.cor, d.tecido, d.tamanho, d.categoria FROM itensVenda iv
       
-- INNER JOIN produto p ON p.id_produto = iv.id_produto
-- INNER JOIN descricao d ON d.id_descricao = p.id_descricao;

-- SELECT * FROM relatorioVerificarEstoque;



/* Verificando faturamento Total por Mês */
-- CREATE VIEW relatorioFaturamentoTotalMes AS
-- SELECT DATE_FORMAT(dataCompra, '%Y-%m') AS mes, 
-- 	   SUM(valorTotal) AS faturamento_mensal FROM venda
       
-- WHERE situacao = 'confirmada'
-- GROUP BY mes
-- ORDER BY mes;



-- /* Verificando produtos Mais Vendidos */
-- CREATE VIEW relatorioProdutosMaisVendidos AS
-- SELECT p.denominacao, SUM(p.estoque) AS total_vendido FROM produto p

-- GROUP BY p.denominacao
-- ORDER BY total_vendido DESC
-- LIMIT 10;



-- /* Verificando produtos com Estoque Baixo */
-- SELECT p.denominacao, iv.estoque FROM produto p

-- INNER JOIN itensVenda iv ON iv.id_produto = p.id_produto

-- WHERE iv.estoque <= 10
-- ORDER BY iv.estoque ASC;



-- /* Verificando vendas com Desconto Aplicado */
-- SELECT v.id_venda, v.valorTotal, v.desconto, v.dataCompra, u.id_usuario, p.denominacao FROM venda v

-- INNER JOIN usuario u ON u.id_usuario = v.id_usuario
-- INNER JOIN itensVenda iv ON iv.id_itensVenda = v.id_itensVenda
-- INNER JOIN produto p ON p.id_produto = iv.id_produto

-- WHERE v.desconto > 0;

