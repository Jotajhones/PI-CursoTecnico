-- VIEW TESTE 

CREATE VIEW  relatorioUsuario AS
SELECT 
p.id_pessoa,
u.id_usuario,
p.nome, 
p.email,
p.cpf, 
p.genero, 
p.data_nascimento, 
u.desconto,
u.fidelidade,
p.situacao
FROM usuario u
INNER JOIN pessoa p ON p.id_pessoa = u.id_pessoa;

CREATE VIEW relatorioUserFone AS
SELECT
t.id_telefone,
t.id_pessoa, 
numero, 
tipo 
FROM 
telefone t 
INNER JOIN pessoa p 
ON t.id_pessoa = p.id_pessoa;

CREATE VIEW relatorioUserEndereco AS
SELECT
e.id_endereco,
e.id_pessoa, 
e.cep,
e.uf,
e.cidade,
e.bairro,
e.rua,
e.numero,
e.complemento
FROM endereco e
INNER JOIN pessoa p ON e.id_pessoa = p.id_pessoa;

CREATE VIEW relatorioProdutos AS

SELECT
p.id_produto,
d.id_descricao,
p.denominacao,
p.quantidade_estoque,
p.preco,
d.descricao,
d.imagem_url,
d.cor, 
d.tecido, 
d.tamanho,
d.categoria,
p.situacao
FROM produto p
INNER JOIN descricao d ON p.id_descricao = d.id_descricao;

CREATE VIEW relatorioVendas AS
SELECT
v.id_venda,
v.id_usuario,
v.id_pagamento,
u.id_pessoa,
v.data_compra, 
v.valor_total,
v.situacao,
pe.nome, 
pe.email,
pe.cpf, 
pe.genero, 
pe.data_nascimento, 
u.desconto,
u.fidelidade,
p.parcela,
p.prazo,
p.forma_pagamento
FROM venda v
INNER JOIN usuario u ON v.id_usuario = u.id_usuario
INNER JOIN pagamento p ON v.id_pagamento = p.id_pagamento
INNER JOIN pessoa pe ON u.id_pessoa = pe.id_pessoa;

CREATE VIEW relatorioItensVenda AS
SELECT
iv.id_venda,
p.id_produto,
v.situacao AS situacao_venda,
p.denominacao,
p.preco,
iv.valor_total,
iv.id_itens_venda,
iv.quantidade,
v.valor_total AS valor_venda,
iv.situacao AS situacao_item
FROM itens_venda iv
INNER JOIN produto p ON iv.id_produto = p.id_produto
INNER JOIN venda v ON iv.id_venda = v.id_venda; 
