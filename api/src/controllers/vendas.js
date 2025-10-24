import connection from "../config/mySqlConfig.js";

class Vendas {

    init(connection) {
        this.connection = connection;

        this.req = req;
        this.res = res;

    }

    async getVendas(req, res) {

        try {

            const sql = "SELECT * FROM relatorioVendas ORDER BY id_venda";
            const [data] = await connection.query(sql);
            res.send(data);
            console.log("> Vendas.getVendas enviou status 200");

        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }

    async searchVendas(req, res) {
        const vendas = req.body;

        try {
            const sql = "SELECT * FROM relatorioVendas WHERE nome like ? || cpf like ?";

            const [data] = await connection.execute(sql, [vendas.nome, vendas.cpf]);

            res.send(data);
            console.log("> Vendas.searchVendas enviou Status 200");

        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }

    async filterVendas(req, res) {
        const vendas = req.body;

        try {
            const sql = "SELECT * FROM relatorioVendas WHERE situacao = ? ORDER BY id_venda";
            const [data] = await connection.execute(sql, [vendas.situacao]);

            res.send(data);
            console.log("> Vendas.filterVendas enviou Status 200");
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }

    async getVenda(req, res) {
        const id_venda = req.params.id_venda;

        try {
            const sql = "SELECT * FROM relatorioVendas WHERE id_venda = ?";
            const [data] = await connection.execute(sql, [id_venda]);

            if (data.length === 0) {
                res.sendStatus(404);
                console.log("> Vendas.getVenda enviou Status 404");
                return;
            }

            res.send(data);
            console.log("> Vendas.getVenda enviou Status 200");

        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }

    async getItensbyVenda(req, res) {
        const id_venda = req.params.id_venda;

        try {
            const sql = "SELECT * FROM relatorioItensVenda WHERE id_venda = ? ORDER BY situacao_venda";
            const [data] = await connection.execute(sql, [id_venda]);

            if (data.length === 0) { 
                res.sendStatus(404);
                console.log("> Vendas.getItensbyVenda enviou Status 404");
                return;
            }

            res.send(data);
            console.log("> Vendas.getItensbyVenda enviou Status 200");

        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }

    async getVendasByUser(req, res) {

        const id_usuario = req.params.id_usuario

        try {

            const sql = "SELECT * FROM relatorioVendas WHERE id_usuario = ? ORDER BY id_venda DESC";
            const [data] = await connection.execute(sql, [id_usuario]);

            res.send(data);
            console.log("> getVendasByUser.getItensbyVenda enviou Status 200");

        } catch (error) {
            console.error("ERRO CRÍTICO NO BACKEND:", error);
            res.sendStatus(500);
        }
    }

    async setItensbyVenda(req, res) {
        const itens = req.body;
        const id_venda = req.params.id_venda;

        try {

            if (itens.situacao_venda === "cancelada") {

                const sql = "UPDATE venda set situacao = ? WHERE id_venda = ?";
                await connection.execute(sql, [itens.situacao_venda, id_venda]);


                const sql_1 = "UPDATE itens_venda set quantidade = 0, situacao = 'cancelada' WHERE id_venda = ?";
                await connection.execute(sql_1, [id_venda]);

            } else {

                for (const item of itens) {

                    const sql_1 = "UPDATE venda set situacao = ? WHERE id_venda = ?";
                    await connection.execute(sql_1, [item.situacao_venda, id_venda]);

                    if (item.situacao_item === "cancelada") {

                        const sql = "UPDATE itens_venda set situacao = 'cancelada', quantidade = 0 WHERE id_itens_venda = ?";
                        await connection.execute(sql, [item.id_itens_venda]);

                    } else {
                        const novaQuantidade = Number(item.quantidade);
                        const idItemVenda = Number(item.id_itens_venda);

                        const sql = "UPDATE itens_venda set situacao = 'confirmada', quantidade = ? WHERE id_itens_venda = ?";
                        const [results] = await connection.execute(sql, [novaQuantidade, idItemVenda]);

                        console.log(`-> UPDATE Item ${idItemVenda}: Linhas Afetadas: ${results.affectedRows}`);
                    }
                }
            }

            res.sendStatus(200);
            console.log("> Vendas.setItensbyVenda enviou Status 200");

        } catch (error) {
            console.error("ERRO CRÍTICO NO BACKEND:", error);
            res.sendStatus(500);
        }
    }

    async setNewItenOnVenda(req, res) {
        const { preco, id_produto } = req.body;
        const id_venda = req.params.id_venda;

        try {
            const sql = "INSERT INTO itens_venda  (quantidade, preco, id_produto, id_venda) VALUES (1, ?,?,?)";
            await connection.execute(sql, [preco, id_produto, id_venda]);

            res.sendStatus(200);
            console.log("> Vendas.setItensbyVenda enviou Status 200");

        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }

    async setNewVenda(req, res) {
        const { id_usuario, id_pagamento } = req.body;

        try {

            const sql = "INSERT INTO venda (id_usuario, id_pagamento) VALUES (?,?)";
            await connection.execute(sql, [id_usuario, id_pagamento]);

            res.sendStatus(200);
            console.log("> Vendas.setNewVenda enviou Status 200");

        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }

}

export default new Vendas;