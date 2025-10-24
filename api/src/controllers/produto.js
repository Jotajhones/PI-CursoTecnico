import connection from "../config/mySqlConfig.js";

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

        async getProdForUsers(req, res) {

        try {

            const sql = "SELECT * FROM relatorioProdutos WHERE situacao = 'ativo'";
            const [data] = await connection.query(sql);
            res.send(data);
            console.log("> Produto.getProdForUsers enviou status 200");

        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }

    async getDestaques(req, res) {

        try {

            const sql = "SELECT * FROM relatorioProdutos WHERE destaque = 'sim'";
            const [data] = await connection.query(sql);
            res.send(data);
            console.log("> Produto.getDestaques enviou status 200");

        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }

    async getProdsByCat(req, res) {
        const categoria = req.params.categoria;

        try {

            const sql = "SELECT * FROM relatorioProdutos WHERE categoria = ? AND situacao = 'ativo' ORDER BY promocao DESC";
            const [data] = await connection.execute(sql, [categoria]);
            res.send(data);
            console.log("> Produto.getProdsByCat enviou status 200");

        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }

    async getProdById(req, res) {
        const id_produto = req.params.id_produto;

        try {

            const sql = "SELECT * FROM relatorioProdutos WHERE id_produto = ?";
            const [data] = await connection.execute(sql, [id_produto]);
            res.send(data);
            console.log("> Produto.getProdById enviou status 200");

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

            const sql_2 = "INSERT INTO promocoes (id_produto) VALUES (LAST_INSERT_ID())";
            await connection.execute(sql_2);

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


                const sql_2 = "INSERT INTO promocoes (id_produto) VALUES (LAST_INSERT_ID())";
                await connection.execute(sql_2);
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

            const sql_1 = "UPDATE produto SET denominacao=?, quantidade_estoque=?, preco=?, destaque=?, situacao=? WHERE id_produto = ?";

            await connection.execute(sql_1, [produto.denominacao, produto.quantidade_estoque, produto.preco, produto.destaque, produto.situacao, produto.id_produto]);

            const sql_2 = "INSERT INTO promocoes (promocao, porcentagem, id_produto) VALUES (?,?,?)";
            await connection.execute(sql_2, [produto.promocao, produto.porcentagem, produto.id_produto]);

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

    async searchProdsForUsers(req, res) {
        const produto = req.body;

        try {

            const sql = "SELECT * FROM relatorioProdutos WHERE categoria = ? && denominacao like ? ORDER BY promocao DESC";
            const [data] = await connection.execute(sql, [produto.categoria, produto.denominacao]);

            res.send(data);
            console.log("> Produto.searchProdsForUsers send status 200");

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

    async filterProdsForUsers(req, res) {
        const { categoria, cor, tecido, tamanho, preco } = req.body;

        try {
            const filters = [];
            const params = [];

            // Validação corrigida para a categoria
            if (!categoria || typeof categoria !== 'string') {
                return res.status(400).json({ error: 'A categoria é um filtro obrigatório e deve ser uma string.' });
            }

            // A categoria agora é uma string, então adicionamos diretamente aos parâmetros
            params.push(categoria);

            if (tecido && Array.isArray(tecido) && tecido.length > 0) {
                const placeholders = tecido.map(() => '?').join(', ');
                filters.push(`tecido IN (${placeholders})`);
                params.push(...tecido);
            }

            if (tamanho && Array.isArray(tamanho) && tamanho.length > 0) {
                const placeholders = tamanho.map(() => '?').join(', ');
                filters.push(`tamanho IN (${placeholders})`);
                params.push(...tamanho);
            }

            if (cor && Array.isArray(cor) && cor.length > 0) {
                const corFilters = cor.map(() => `cor LIKE ?`);
                filters.push(`(${corFilters.join(' OR ')})`);
                const corParams = cor.map(c => `%${c}%`);
                params.push(...corParams);
            }

            if (preco && typeof preco === 'number' && preco > 0) {
                filters.push(`preco <= ?`);
                params.push(preco);
            }

            // A query SQL agora usa '=' em vez de 'IN' para a categoria
            let sql = `SELECT * FROM relatorioProdutos WHERE categoria = ? `;

            if (filters.length > 0) {
                sql += ` AND ${filters.join(' AND ')} ORDER BY promocao DESC`;
            }

            const [data] = await connection.execute(sql, params);

            res.send(data);
            console.log("> Produto.filterProdsForUsers send status 200");

        } catch (error) {
            console.error("Erro na função filterProdsForUsers:", error);
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