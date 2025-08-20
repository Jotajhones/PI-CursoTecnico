-- VIEW TESTE 

CREATE VIEW relatorioAdmins AS

SELECT 
p.id_pessoa,
a.id_administrador,
p.nome, 
p.email,
a.matricula, 
a.cargo, 
a.salario, 
a.situacao 
FROM administrador a
INNER JOIN pessoa p ON p.id_pessoa = a.id_pessoa;

CREATE VIEW  relatorioUsuario AS
SELECT 
p.id_pessoa,
u.id_usuario,
p.nome, 
p.email,
p.cpf, 
p.genero, 
p.dataNascimento, 
u.desconto,
u.fidelidade,
u.situacao
FROM usuario u
INNER JOIN pessoa p ON p.id_pessoa = u.id_pessoa;

CREATE VIEW relatorioUserFone AS
SELECT
t.id_telefone,
t.id_pessoa, 
ddd, 
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
p.estoque,
p.preco,
d.descricao,
d.url,
d.cor, 
d.tecido, 
d.tamanho,
d.categoria,
p.situacao
FROM produto p
INNER JOIN descricao d ON p.id_descricao = d.id_descricao;

