import connection from "../config/config.js";

class Root {

    init(connection) {
        this.connection = connection
        this.req = req;
        this.res = res;

        this.raiz();
    }

    async raiz(req, res) {

        try {
            const sql = "CREATE DATABASE IF NOT EXISTS vendasBlusaBlusas";

            connection.query(sql);
            res.send("API ON  Conectado a vendasBlusaBlusas");
            console.log("> Banco ON conectado a vendasBlusaBlusas")

        } catch (error) {
            console.error(error);
        }        
    }

}

export default new Root;