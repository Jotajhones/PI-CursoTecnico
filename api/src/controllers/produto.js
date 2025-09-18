import connection from "../config/config.js";

class Produtos {

    init(connection) {
        this.connection = connection;

        this.req = req;
        this.res = res;

        this.get();
        this.post();
        this.put();
        this.massPost();
        this.search();
    }

    async getProd(req, res) {

        try {

            const sql = "SELECT * FROM relatorioProdutos";
            const [data] = await connection.query(sql);
            res.send(data);
            console.log("> Produto.getProd enviou status 200");

        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }

    async setNewProd(req, res) {
        const produto = req.body;

        try {

            const sql = "INSERT INTO descricao (descricao, imagem_url, cor, tecido, tamanho, categoria) VALUES(?,?,?,?,?,?)";
            await connection.execute(sql, [produto.descricao, produto.imagem_url, produto.cor, produto.tecido, produto.tamanho, produto.categoria]);

            const sql_1 = "INSERT INTO produto (denominacao, quantidade_estoque, preco, id_descricao) VALUES (?,?,?, LAST_INSERT_ID())";
            await connection.execute(sql_1, [produto.denominacao, produto.quantidade_estoque, produto.preco]);

            res.sendStatus(200);
            console.log("> Produto.setNewProd send status 200");

        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }

    async setNewProds(req, res) {
        const prods = req.body;

        try {
            for (const produto of prods) {
                const sql = "INSERT INTO descricao (descricao, imagem_url, cor, tecido, tamanho, categoria) VALUES(?,?,?,?,?,?)";
                await connection.execute(sql, [produto.descricao, produto.imagem_url, produto.cor, produto.tecido, produto.tamanho, produto.categoria]);

                const sql_1 = "INSERT INTO produto (denominacao, quantidade_estoque, preco, id_descricao) VALUES (?,?,?, LAST_INSERT_ID())";
                await connection.execute(sql_1, [produto.denominacao, produto.quantidade_estoque, produto.preco]);
            }

            res.sendStatus(200);
            console.log("> Produto.setNewProds send status 200");

        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }

    async setProd(req, res) {
        const produto = req.body;

        try {

            const sql = "UPDATE descricao SET descricao=?, imagem_url=?, cor=?, tecido=?, tamanho=?, categoria=? WHERE id_descricao = ?";
            await connection.execute(sql, [produto.descricao, produto.imagem_url, produto.cor, produto.tecido, produto.tamanho, produto.categoria, produto.id_descricao]);

            const sql_1 = "UPDATE produto SET denominacao=?, quantidade_estoque=?, preco=?, situacao=? WHERE id_produto = ?";
            await connection.execute(sql_1, [produto.denominacao, produto.quantidade_estoque, produto.preco, produto.situacao, produto.id_produto]);

            res.sendStatus(200);
            console.log("> Produto.setProd send status 200");

        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }

    //metodo criado para enviar valores via requisição e retornar resposta utilizado na barra de pesquisa
    async searchProds(req, res) {
        const produto = req.body;

        try {

            const sql = "SELECT * FROM relatorioProdutos WHERE id_produto like ?|| denominacao like ? || categoria like ?";
            const [data] = await connection.execute(sql, [produto.id_produto, produto.denominacao, produto.categoria]);

            res.send(data);
            console.log("> Produto.searchProds send status 200");

        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }

    //metodo criado para filtrar conteudo na aba de filtragem
    async filterProds(req, res) {
        const produto = req.body;

        try {

            const sql = "SELECT * FROM relatorioProdutos WHERE situacao = ?";
            const [data] = await connection.execute(sql, [produto.situacao]);

            res.send(data);
            console.log("> Produto.filterProds send status 200");

        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }

    async deleteProd(req, res) {
        const produto = req.body;

        try {

            const sql = "DELETE FROM produto WHERE id_produto = ?";
            await connection.execute(sql, [produto.id_produto]);

            const sql_1 = "DELETE FROM descricao WHERE id_descricao = ?";
            await connection.execute(sql_1, [produto.id_descricao]);

            res.sendStatus(200);
            console.log("> Produto.deleteProd send status 200");

        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }
}

export default new Produtos;