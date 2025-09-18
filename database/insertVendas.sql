
INSERT INTO pagamento (parcela, prazo, forma_pagamento, situacao)
VALUES (1, 1, 'credito', 'ativo');

insert into venda(id_usuario, id_pagamento) values (1, 1);
insert into itens_venda (quantidade, preco, valor_total, id_produto, id_venda) 
values (2, (select preco from produto where id_produto = 1), ((2 * (select preco from produto where id_produto = 1)) - desconto + acrescimo), 1, 1);

insert into itens_venda (quantidade, preco, valor_total, id_produto, id_venda) 
values (2, (select preco from produto where id_produto = 7), ((2 * (select preco from produto where id_produto = 7)) - desconto + acrescimo), 7, 1);

insert into itens_venda (quantidade, preco, valor_total, id_produto, id_venda) 
values (1, (select preco from produto where id_produto = 8), ((1 * (select preco from produto where id_produto = 8)) - desconto + acrescimo), 8, 1);

insert into venda(id_usuario, id_pagamento) values (2, 1);
insert into itens_venda (quantidade, preco, valor_total, id_produto, id_venda) 
values (2, (select preco from produto where id_produto = 2), ((2 * (select preco from produto where id_produto = 2)) - desconto + acrescimo), 2, 2);

insert into venda(id_usuario, id_pagamento) values (3, 1);
insert into itens_venda (quantidade, preco, valor_total, id_produto, id_venda) 
values (2, (select preco from produto where id_produto = 3), ((2 * (select preco from produto where id_produto = 3)) - desconto + acrescimo), 3, 3);

insert into venda(id_usuario, id_pagamento) values (4, 1);
insert into itens_venda (quantidade, preco, valor_total, id_produto, id_venda) 
values (2, (select preco from produto where id_produto = 4), ((2 * (select preco from produto where id_produto = 4)) - desconto + acrescimo), 4, 4);

insert into venda(id_usuario, id_pagamento) values (5, 1);
insert into itens_venda (quantidade, preco, valor_total, id_produto, id_venda) 
values (2, (select preco from produto where id_produto = 5), ((2 * (select preco from produto where id_produto = 5)) - desconto + acrescimo), 5, 5);

insert into venda(id_usuario, id_pagamento) values (6, 1);
insert into itens_venda (quantidade, preco, valor_total, id_produto, id_venda) 
values (2, (select preco from produto where id_produto = 6), ((2 * (select preco from produto where id_produto = 6)) - desconto + acrescimo), 6, 6);

insert into venda(id_usuario, id_pagamento) values (7, 1);
insert into itens_venda (quantidade, preco, valor_total, id_produto, id_venda) 
values (2, (select preco from produto where id_produto = 7), ((2 * (select preco from produto where id_produto = 7)) - desconto + acrescimo), 7, 7);

insert into venda(id_usuario, id_pagamento) values (8, 1);
insert into itens_venda (quantidade, preco, valor_total, id_produto, id_venda) 
values (2, (select preco from produto where id_produto = 8), ((2 * (select preco from produto where id_produto = 8)) - desconto + acrescimo), 8, 8);

insert into venda(id_usuario, id_pagamento) values (9, 1);
insert into itens_venda (quantidade, preco, valor_total, id_produto, id_venda) 
values (2, (select preco from produto where id_produto = 9), ((2 * (select preco from produto where id_produto = 9)) - desconto + acrescimo), 9, 9);

insert into venda(id_usuario, id_pagamento) values (10, 1);
insert into itens_venda (quantidade, preco, valor_total, id_produto, id_venda) 
values (2, (select preco from produto where id_produto = 10), ((2 * (select preco from produto where id_produto = 10)) - desconto + acrescimo), 10, 10);

insert into venda(id_usuario, id_pagamento) values (11, 1);
insert into itens_venda (quantidade, preco, valor_total, id_produto, id_venda) 
values (2, (select preco from produto where id_produto = 11), ((2 * (select preco from produto where id_produto = 11)) - desconto + acrescimo), 11, 11);

insert into venda(id_usuario, id_pagamento) values (12, 1);
insert into itens_venda (quantidade, preco, valor_total, id_produto, id_venda) 
values (2, (select preco from produto where id_produto = 12), ((2 * (select preco from produto where id_produto = 12)) - desconto + acrescimo), 12, 12);

insert into venda(id_usuario, id_pagamento) values (13, 1);
insert into itens_venda (quantidade, preco, valor_total, id_produto, id_venda) 
values (2, (select preco from produto where id_produto = 13), ((2 * (select preco from produto where id_produto = 13)) - desconto + acrescimo), 13, 13);

insert into venda(id_usuario, id_pagamento) values (14, 1);
insert into itens_venda (quantidade, preco, valor_total, id_produto, id_venda) 
values (2, (select preco from produto where id_produto = 14), ((2 * (select preco from produto where id_produto = 14)) - desconto + acrescimo), 14, 14);

insert into venda(id_usuario, id_pagamento) values (15, 1);
insert into itens_venda (quantidade, preco, valor_total, id_produto, id_venda) 
values (2, (select preco from produto where id_produto = 15), ((2 * (select preco from produto where id_produto = 15)) - desconto + acrescimo), 15, 15);

insert into venda(id_usuario, id_pagamento) values (16, 1);
insert into itens_venda (quantidade, preco, valor_total, id_produto, id_venda) 
values (2, (select preco from produto where id_produto = 16), ((2 * (select preco from produto where id_produto = 16)) - desconto + acrescimo), 16, 16);

insert into venda(id_usuario, id_pagamento) values (17, 1);
insert into itens_venda (quantidade, preco, valor_total, id_produto, id_venda) 
values (2, (select preco from produto where id_produto = 17), ((2 * (select preco from produto where id_produto = 17)) - desconto + acrescimo), 17, 17);

insert into venda(id_usuario, id_pagamento) values (18, 1);
insert into itens_venda (quantidade, preco, valor_total, id_produto, id_venda) 
values (2, (select preco from produto where id_produto = 18), ((2 * (select preco from produto where id_produto = 18)) - desconto + acrescimo), 18, 18);

insert into venda(id_usuario, id_pagamento) values (19, 1);
insert into itens_venda (quantidade, preco, valor_total, id_produto, id_venda) 
values (2, (select preco from produto where id_produto = 19), ((2 * (select preco from produto where id_produto = 19)) - desconto + acrescimo), 19, 19);

insert into venda(id_usuario, id_pagamento) values (20, 1);
insert into itens_venda (quantidade, preco, valor_total, id_produto, id_venda) 
values (2, (select preco from produto where id_produto = 20), ((2 * (select preco from produto where id_produto = 20)) - desconto + acrescimo), 20, 20);

insert into venda(id_usuario, id_pagamento) values (21, 1);
insert into itens_venda (quantidade, preco, valor_total, id_produto, id_venda) 
values (2, (select preco from produto where id_produto = 21), ((2 * (select preco from produto where id_produto = 21)) - desconto + acrescimo), 21, 21);

insert into venda(id_usuario, id_pagamento) values (22, 1);
insert into itens_venda (quantidade, preco, valor_total, id_produto, id_venda) 
values (2, (select preco from produto where id_produto = 22), ((2 * (select preco from produto where id_produto = 22)) - desconto + acrescimo), 22, 22);

insert into venda(id_usuario, id_pagamento) values (23, 1);
insert into itens_venda (quantidade, preco, valor_total, id_produto, id_venda) 
values (2, (select preco from produto where id_produto = 23), ((2 * (select preco from produto where id_produto = 23)) - desconto + acrescimo), 23, 23);

insert into venda(id_usuario, id_pagamento) values (24, 1);
insert into itens_venda (quantidade, preco, valor_total, id_produto, id_venda) 
values (2, (select preco from produto where id_produto = 24), ((2 * (select preco from produto where id_produto = 24)) - desconto + acrescimo), 24, 24);

insert into venda(id_usuario, id_pagamento) values (25, 1);
insert into itens_venda (quantidade, preco, valor_total, id_produto, id_venda) 
values (2, (select preco from produto where id_produto = 25), ((2 * (select preco from produto where id_produto = 25)) - desconto + acrescimo), 25, 25);

insert into venda(id_usuario, id_pagamento) values (26, 1);
insert into itens_venda (quantidade, preco, valor_total, id_produto, id_venda) 
values (2, (select preco from produto where id_produto = 26), ((2 * (select preco from produto where id_produto = 26)) - desconto + acrescimo), 26, 26);

insert into venda(id_usuario, id_pagamento) values (27, 1);
insert into itens_venda (quantidade, preco, valor_total, id_produto, id_venda) 
values (2, (select preco from produto where id_produto = 27), ((2 * (select preco from produto where id_produto = 27)) - desconto + acrescimo), 27, 27);

insert into venda(id_usuario, id_pagamento) values (28, 1);
insert into itens_venda (quantidade, preco, valor_total, id_produto, id_venda) 
values (2, (select preco from produto where id_produto = 28), ((2 * (select preco from produto where id_produto = 28)) - desconto + acrescimo), 28, 28);

insert into venda(id_usuario, id_pagamento) values (29, 1);
insert into itens_venda (quantidade, preco, valor_total, id_produto, id_venda) 
values (2, (select preco from produto where id_produto = 29), ((2 * (select preco from produto where id_produto = 29)) - desconto + acrescimo), 29, 29);

insert into venda(id_usuario, id_pagamento) values (30, 1);
insert into itens_venda (quantidade, preco, valor_total, id_produto, id_venda) 
values (2, (select preco from produto where id_produto = 30), ((2 * (select preco from produto where id_produto = 30)) - desconto + acrescimo), 30, 30);
