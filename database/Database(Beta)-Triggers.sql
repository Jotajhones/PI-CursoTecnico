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

DELIMITER $$
CREATE TRIGGER trg_itens_venda_calcula_valor_total
BEFORE INSERT ON itens_venda
FOR EACH ROW
BEGIN
    SET NEW.valor_total = (NEW.preco + NEW.acrescimo - NEW.desconto) * NEW.quantidade;
END$$

CREATE TRIGGER trg_itens_venda_update_valor_total
BEFORE UPDATE ON itens_venda
FOR EACH ROW
BEGIN
    SET NEW.valor_total = (NEW.preco + NEW.acrescimo - NEW.desconto) * NEW.quantidade;
END$$
DELIMITER ;

-- Trigger 2: Atualiza valor_total da venda ao inserir, atualizar ou deletar itens_venda
DELIMITER $$
CREATE TRIGGER trg_itens_venda_atualiza_venda_total
AFTER INSERT ON itens_venda
FOR EACH ROW
BEGIN
    UPDATE venda
    SET valor_total = (
        SELECT IFNULL(SUM(valor_total),0)
        FROM itens_venda
        WHERE id_venda = NEW.id_venda
    )
    WHERE id_venda = NEW.id_venda;
END$$

CREATE TRIGGER trg_itens_venda_update_venda_total
AFTER UPDATE ON itens_venda
FOR EACH ROW
BEGIN
    UPDATE venda
    SET valor_total = (
        SELECT IFNULL(SUM(valor_total),0)
        FROM itens_venda
        WHERE id_venda = NEW.id_venda
    )
    WHERE id_venda = NEW.id_venda;
END$$

CREATE TRIGGER trg_itens_venda_delete_venda_total
AFTER DELETE ON itens_venda
FOR EACH ROW
BEGIN
    UPDATE venda
    SET valor_total = (
        SELECT IFNULL(SUM(valor_total),0)
        FROM itens_venda
        WHERE id_venda = OLD.id_venda
    )
    WHERE id_venda = OLD.id_venda;
END$$
DELIMITER ;

-- Trigger 3: Atualiza estoque do produto quando venda for confirmada
DELIMITER $$
CREATE TRIGGER trg_venda_confirmada_atualiza_estoque
AFTER UPDATE ON venda
FOR EACH ROW
BEGIN
    IF NEW.situacao = 'confirmada' AND OLD.situacao <> 'confirmada' THEN
        UPDATE produto p
        JOIN itens_venda iv ON iv.id_produto = p.id_produto
        SET p.quantidade_estoque = p.quantidade_estoque - iv.quantidade
        WHERE iv.id_venda = NEW.id_venda;
    END IF;
END$$
DELIMITER ;


use vendasBlusaBlusas;
show triggers;

drop trigger trg_itens_venda_calcula_valor_total;
drop trigger trg_itens_venda_atualiza_venda_total;
drop trigger trg_itens_venda_update_valor_total;
drop trigger trg_retornar_quantidade_estoque;
drop trigger trg_itens_venda_update_venda_total;
drop trigger trg_itens_venda_delete_venda_total;
drop trigger trg_historico_pessoas_deletadas;
drop trigger historico_preco_new_old;
drop trigger trg_historicos_produtos_deletados;
drop trigger trg_venda_confirmada_atualiza_estoque;
drop trigger trg_historico_vendas_deletadas; 