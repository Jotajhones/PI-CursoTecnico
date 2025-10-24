import connection from "../config/mySqlConfig.js";

class comentarios {

    init(connection) {
        this.connection = connection;

        this.req = req;
        this.res = res;


    }

    async getAllComentarios(req, res) {

        try {
            const sql = "SELECT * FROM relatorioComentarios";
            const [comentarios] = await connection.execute(sql);

            res.send(comentarios);
            console.log("> comentarios.getAllComentarios enviou status 200");

        } catch (error) {
            console.error("Erro ao buscar comentários:", error);
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }

    async getComentarioByProduto(req, res) {
        const { id_produto } = req.params;

        try {

            const sql = "SELECT * FROM relatorioComentarios WHERE id_produto = ?";
            const [comentarios] = await connection.execute(sql, [id_produto]);
            res.send(comentarios);
            console.log("> comentarios.getComentarioByProduto enviou status 200");

        } catch (error) {
            console.error("Erro ao buscar comentários por produto:", error);
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }

    async addComentario(req, res) {
        const comentario = req.body;

        try {

            const sql = "INSERT INTO comentario (texto, id_pessoa, id_produto) VALUES (?, ?, ?)";
            await connection.execute(sql, [comentario.texto, comentario.id_pessoa, comentario.id_produto]);
            res.sendStatus(200);
            console.log("> comentarios.addComentario enviou status 200");

        } catch (error) {

            console.error("Erro ao adicionar comentário:", error);
            return res.status(500).json({ message: "Erro interno do servidor" });

        }
    }
}
export default new comentarios;