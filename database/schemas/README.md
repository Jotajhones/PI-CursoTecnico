# OBSERVAÇÕES PARA RODAR O BANCO

# OBS PARA EXECUÇÂO DO BANCO; 
- rodar tabela por tabela;
- Para rodar no terminal, cada trigger dever ser criada individualmente

## relatorio verificar estoque LINHA 474 error 

**ERROR 1060 (42S21): Duplicate column name 'quantidadeEstoque'**

### Referente ao codigo

...
    CREATE VIEW relatorioVerificarEstoque AS

    SELECT p.id_produto, p.denominacao, p.quantidadeEstoque, iv.quantidadeEstoque,p.situacao, d.URLimagem,
        d.cor, d.tecido, d.tamanho, d.categoria FROM itensVenda iv
        
    INNER JOIN produto p ON p.id_produto = iv.id_produto
    INNER JOIN descricao d ON d.id_descricao = p.id_descricao;

    SELECT * FROM relatorioVerificarEstoque;

...

-----------------------------------------------------------------------------------------------

# OBSERVAÇÕES NA EXECUÇÃO do BANCO

## tabela PESSOA;

- coluna telefone -> desnecessaria, existe uma tabela telefone;


## VIEW relatorioLoginUsuarioAdministrador LINHA 444

- Erro durante a execução do banco, **NÃO DURANTE A CRIAÇÃO**;

- Error loading schema content	Error Code: 1356 View 'vendasBlusaBlusas.relatorioLoginUsuarioAdministrador' references invalid table(s) or column(s) or function(s) or definer/invoker of view lack rights to use them	;

-----------------------------------------------------------------------------------------------

## Outros erros

- DROP id_movimentaçãoCaixa de Administrador;

- DROP movimetaçãoFinanceira;

- DATE COLUM repetindo em tabelas sequenciais;

- venda está amarrado itensVenda, não o contrario;

- itensVenda não tem quantidade, nem valor total do item;

- select * from relatorioVendasProdutos;
ERROR 1054 (42S22): Unknown column 'vendasBlusaBlusas.v.id_itensVenda' in 'on clause'

- descricao, mudar coluna URLimagem para url;

- produto, alterar coluna para estoque;

- Padronizar situacao;







