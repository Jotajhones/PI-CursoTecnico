# Notas database Final

## Tables 

1. Remoção da table nota Fiscal.
2. Remoção movimentação_caixa
3. Remoção da opção "em andamento" no ENUM de venda.
4. Remoção da opção "em andamento" no ENUM de itens_venda.
5. Exclusão do arquivo "Database(beta)-COmpleto.slq
6. Exclusão do arquivo "Inserts(beta).sql
7. Exclusão do arquivo "Database(beta)-Relatorios.sql

## Justificativas

Tendo em vista que o projeto tem se tornado muito complexo, por si, em decisão minha unilateral, foram tomada estas medidas a fim de simplicficar a produção do software, tendo em vista que temos 4 areas de desenvolvimento, Web, Descktop, DB, MObile.

Uma vez que o banco será compartilhado entre os projetos, fica a cargo dos desenvolvedores de cada projeto criar suas proprias Views sobre demanda bem como, salvar os schemas dessas Views para reutilização quando o projeto for integrado.

Os projetos devem seguir sem alteração no banco, sendo assim todos os projetos devem se adequar a este banco, evitando ao maximo voltar a mexer no banco uma vez que está já é a versão final.

Cada desenvolvedor também fica responsavel por criar seus proprios inserts e mock de dados para uso em desenvolvimento, por isso os outros arquivos do banco foram excluidos de vez.

