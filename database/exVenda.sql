use vendasBlusaBlusas;
desc itens_venda;

INSERT INTO pagamento (parcela, prazo, forma_pagamento, situacao)
VALUES (1, 1, 'credito', 'ativo');

insert into venda(id_usuario, id_pagamento) values (13, 1);

SELECT * FROM venda;

Insert into itens_venda (quantidade, preco, valor_total, id_produto, id_venda) 
values
(5, 
(select preco from produto where id_produto = 10), 
((quantidade * preco) - desconto + acrescimo), 
10, 
30);

select * from itens_venda;

UPDATE venda set valor_total = (
SELECT SUM(valor_total)
FROM itens_venda
WHERE id_venda = 1 AND situacao = 'confirmada')
WHERE id_venda = 1;

SELECT * FROM venda;

