import connection from "../config/config.js";

class Vendas {

    init(connection) {
        this.connection = connection;

        this.req = req;
        this.res = res;
    
    }

    async get(req, res) {

        try {

            const sql = "SELECT * FROM relatorioVendas";
            const [data] = await connection.query(sql);
            res.send(data);

        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }

    
}

export default new Vendas;