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

-- CREATE VIEW relatorioProdutos AS

-- SELECT
-- p.id_produto,
-- d.id_descricao,
-- p.denominacao,
-- p.quantidade_estoque,
-- p.preco,
-- d.descricao,
-- d.imagem_url,
-- d.cor, 
-- d.tecido, 
-- d.tamanho,
-- d.categoria,
-- p.destaque,
-- pr.promocao,
-- p.situacao
-- FROM produto p
-- INNER JOIN descricao d ON p.id_descricao = d.id_descricao
-- INNER JOIN promocoes pr ON p.id_produto = pr.id_produto;

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
    p.destaque,
    pr.promocao,
    pr.porcentagem,
    p.situacao
FROM produto p
INNER JOIN descricao d ON p.id_descricao = d.id_descricao
INNER JOIN (
        SELECT pr1.*
        FROM promocoes pr1
        INNER JOIN (
                SELECT id_produto, MAX(data_alteracao) AS max_data
                FROM promocoes
                GROUP BY id_produto
        ) pr2 ON pr1.id_produto = pr2.id_produto AND pr1.data_alteracao = pr2.max_data
) pr ON p.id_produto = pr.id_produto;

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
d.imagem_url,
iv.valor_total,
iv.id_itens_venda,
iv.quantidade,
v.valor_total AS valor_venda,
iv.situacao AS situacao_item
FROM itens_venda iv
INNER JOIN produto p ON iv.id_produto = p.id_produto
INNER JOIN venda v ON iv.id_venda = v.id_venda
INNER JOIN descricao d ON p.id_descricao = d.id_descricao; 

CREATE VIEW relatorioLogin AS
SELECT
p.id_pessoa,
u.id_usuario,
l.usuario,
l.senha,
p.nome,
l.tipo_usuario,
l.alterar_senha,
(SELECT id_venda FROM venda WHERE id_usuario = u.id_usuario ORDER BY id_venda DESC LIMIT 1) AS ultima_venda,
l.data_acesso
FROM login l
JOIN pessoa p ON l.id_pessoa = p.id_pessoa
JOIN usuario u ON p.id_pessoa = u.id_pessoa;


-- SELECT
-- p.id_produto,
-- d.id_descricao,
-- p.denominacao,
-- p.quantidade_estoque,
-- p.preco,
-- d.descricao,
-- d.imagem_url,
-- d.cor, 
-- d.tecido, 
-- d.tamanho,
-- d.categoria,
-- p.destaque,
-- pr.promocao,
-- p.situacao
-- FROM produto p
-- INNER JOIN descricao d ON p.id_descricao = d.id_descricao
-- INNER JOIN promocoes pr ON p.id_produto = pr.id_produto;

CREATE VIEW relatorioComentarios AS
SELECT
C.id_comentario,
C.id_pessoa,
C.id_produto,
Pessoa.nome, 
C.data_comentario,
C.texto AS comentario,
Prod.denominacao AS produto 
FROM comentario C
JOIN pessoa Pessoa ON C.id_pessoa = Pessoa.id_pessoa 
JOIN produto Prod ON C.id_produto = Prod.id_produto; 