SET FOREIGN_KEY_CHECKS = 0;

DELIMITER //
CREATE TRIGGER historico_preco_new_old
AFTER UPDATE ON produto 
FOR EACH ROW
BEGIN 
    IF (OLD.preco <> NEW.preco) THEN
        INSERT INTO historico_preco (preco_antigo, preco_novo, id_produto)
        VALUES (OLD.preco, NEW.preco, NEW.id_produto);
    END IF;
END;
//
DELIMITER ;

DELIMITER // 
CREATE TRIGGER trg_historico_pessoas_deletadas
AFTER DELETE ON pessoa 
FOR EACH ROW
BEGIN
    INSERT INTO pessoas_deletadas (
        id_pessoa, nome, email, cpf, genero, data_nascimento, data_cadastro, situacao
    )
    VALUES (
        OLD.id_pessoa, OLD.nome, OLD.email, OLD.cpf, OLD.genero, OLD.data_nascimento, OLD.data_cadastro, OLD.situacao
    );
END;
//
DELIMITER ;

DELIMITER // 
CREATE TRIGGER trg_historicos_produtos_deletados
AFTER DELETE ON produto 
FOR EACH ROW
BEGIN
    INSERT INTO produtos_deletados (
        id_produto, denominacao, quantidade_estoque, preco, situacao, id_descricao
    )
    VALUES (
        OLD.id_produto, OLD.denominacao, OLD.quantidade_estoque, OLD.preco, OLD.situacao, OLD.id_descricao
    );
END;
//
DELIMITER ;

DELIMITER // 
CREATE TRIGGER trg_historico_vendas_deletadas
AFTER DELETE ON venda 
FOR EACH ROW
BEGIN
    INSERT INTO vendas_deletadas (
        id_venda, desconto, acrescimo, cupom, data_compra, valor_total, situacao
    )
    VALUES (
        OLD.id_venda, OLD.desconto, OLD.acrescimo, OLD.cupom, OLD.data_compra, OLD.valor_total, OLD.situacao
    );
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER trg_retornar_quantidade_estoque 
AFTER UPDATE ON itens_venda 
FOR EACH ROW
BEGIN
    IF (NEW.situacao = 'cancelado') THEN
        UPDATE produto 
         SET quantidade_estoque = (quantidade_estoque + OLD.quantidade) 
         WHERE id_produto = NEW.id_produto;
    END IF;
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER trg_atualizar_vendas
AFTER UPDATE ON itens_venda 
FOR EACH ROW 
BEGIN      
    IF (NEW.situacao = 'cancelado') THEN         
         UPDATE venda
        SET valor_total = (SELECT SUM(iv.valor_total)
            FROM itens_venda iv
            WHERE iv.id_venda = NEW.id_venda AND iv.situacao <> 'cancelado')
        WHERE id_venda = NEW.id_venda;
    END IF; 
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER atualiza_valor_itens_venda
BEFORE INSERT ON itens_venda 
FOR EACH ROW
BEGIN
    DECLARE preco_produto DECIMAL(10,2);
    SET preco_produto = (SELECT preco FROM produto WHERE id_produto = NEW.id_produto);
    SET NEW.preco = preco_produto;
    SET NEW.valor_total = (NEW.preco * NEW.quantidade) - NEW.desconto + NEW.acrescimo;
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER trg_atualizar_valor_vendas
AFTER INSERT ON itens_venda 
FOR EACH ROW
BEGIN
    UPDATE venda
    SET valor_total = (
        SELECT SUM(iv.valor_total)
        FROM itens_venda iv
        WHERE iv.id_venda = NEW.id_venda AND iv.situacao <> 'cancelado'
    )
    WHERE id_venda = NEW.id_venda;  
END;
//
DELIMITER ;