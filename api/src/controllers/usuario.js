import connection from "../config/config.js";

class Usuario {

    init(connection) {
        this.connection = connection;

        this.req = req;
        this.res = res;

        this.get();
        this.post();
        this.put();
        this.delete();
        this.descricao();
        this.postFone();
        this.updateFone();
        this.deleteFone();
        this.getEndereco();
        this.postEndereco();
        this.updateEndereco();
        this.deleteEndereco();
    }

    async get(req, res) {

        try {

            const sql = "SELECT * FROM relatorioUsuario";
            const [data] = await connection.query(sql);

            res.send(data);
            console.log("> Usuario.get enviou status 200");

        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }

    async post(req, res) {
        const user = req.body;

        try {

            const sql = "INSERT INTO pessoa(nome, email, cpf, genero, dataNascimento) VALUES (?,?,?,?,?);";
            await connection.execute(sql, [user.nome, user.email, user.cpf, user.genero, user.dataNascimento]);

            const sql_1 = "INSERT INTO usuario (id_pessoa) VALUE (LAST_INSERT_ID())";
            await connection.execute(sql_1);

            res.sendStatus(200);
            console.log("> Usuario.post enviou Status 200");

        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }

    async massPost(req, res) {
        const usar = req.body;

        try {

            usar.forEach(user => {

                const sql = "INSERT INTO pessoa(nome, email, cpf, genero, dataNascimento) VALUES (?,?,?,?,?);";
                connection.execute(sql, [user.nome, user.email, user.cpf, user.genero, user.dataNascimento]);

                const sql_1 = "INSERT INTO usuario (id_pessoa) VALUE (LAST_INSERT_ID())";
                connection.execute(sql_1);
            });

            res.sendStatus(200);
            console.log("> Usuario.post enviou Status 200");

        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }

    async put(req, res) {
        const user = req.body;

        try {

            const sql = "UPDATE usuario SET desconto = ?, fidelidade = ?, situacao = ? WHERE id_usuario = ?";
            await connection.execute(sql, [user.desconto, user.fidelidade, user.situacao, user.id_usuario]);

            const sql_1 = "UPDATE pessoa SET nome = ?, email = ?, cpf = ?, situacao = ?, genero = ?, dataNascimento = ? WHERE id_pessoa = (SELECT id_pessoa FROM usuario WHERE id_usuario = ?)";

            await connection.execute(sql_1, [user.nome, user.email, user.cpf, user.situacao, user.genero, user.dataNascimento, user.id_usuario]);

            res.sendStatus(200);
            console.log("> Usuario.put enviou Status 200");

        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }

    async delete(req, res) {
        const user = req.body;

        try {

            const sql = "DELETE FROM usuario WHERE id_usuario = ?";
            await connection.execute(sql, [user.id_usuario]);

            const sql_1 = "DELETE FROM pessoa WHERE id_pessoa = ?";
            await connection.execute(sql, [user.id_pessoa]);

            res.sendStatus(200);
            console.log("> Usuario.delete enviou Status 200");

        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }

    async search(req, res) {
        const user = req.body;

        try {
            const sql = "SELECT * FROM relatorioUsuario WHERE nome like ? || cpf like ? || genero like ?";

            const [data] = await connection.execute(sql, [user.nome, user.cpf, user.genero]);

            res.send(data);
            console.log("> Usuario.search enviou Status 200");

        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }

    async filter(req, res) {
        const user = req.body;

        try {

            const sql = "SELECT * FROM relatorioUsuario WHERE situacao = ?";
            const [data] = await connection.execute(sql, [user.situacao]);

            res.send(data);
            console.log("> Usuario.filter send status 200");

        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }

    async descricao(req, res) {
        const user = req.body;

        try {

            const sql = "SELECT * FROM relatorioUsuario WHERE id_pessoa = ? && id_usuario = ?";
            const [data] = await connection.execute(sql, [user.id_pessoa, user.id_usuario]);

            res.send(data);
            console.log("> Usuario.descricao enviou Status 200");

        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }

    async getFone(req, res) {
        const user = req.body;

        try {
            const sql = "SELECT * FROM relatorioUserFone WHERE id_pessoa = ?";
            const [data] = await connection.execute(sql, [user.id_pessoa]);

            res.send(data);
            console.log("> Usuario.getFone enviou Status 200");

        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }

    }

    async postFone(req, res) {
        const user = req.body;

        try {

            const sql = "INSERT INTO telefone(ddd, numero, id_pessoa) VALUES(?,?,?)";
            await connection.execute(sql, [user.ddd, user.numero, user.id_pessoa]);

            res.sendStatus(200);
            console.log("> Usuario.postFone enviou Status 200");

        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }

    async updateFone(req, res) {
        const user = req.body;

        try {

            const sql = "UPDATE telefone SET ddd = ?, numero = ?, tipo = ? WHERE id_telefone = ?";
            await connection.execute(sql, [user.ddd, user.numero, user.tipo, user.id_telefone]);

            res.sendStatus(200);
            console.log("> Usuario.updateFone enviou Status 200");

        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }

    async deleteFone(req, res) {
        const user = req.body;

        try {

            const sql = "DELETE FROM telefone WHERE id_telefone = ?";
            await connection.execute(sql, [user.id_telefone]);

            res.sendStatus(200);
            console.log("> Usuario.deleteFone enviou Status 200");

        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }

    async getEndereco(req, res) {
        const user = req.body;

        try {

            const sql = "SELECT * FROM relatorioUserEndereco WHERE id_pessoa = ?";
            const [data] = await connection.execute(sql, [user.id_pessoa]);

            res.send(data);
            console.log("> Usuario.getEndereco enviou Status 200");

        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }

    async postEndereco(req, res) {
        const user = req.body;

        try {

            const sql = "INSERT INTO endereco(cep, rua, cidade, bairro, complemento, numero, uf, id_pessoa) VALUES(?,?,?,?,?,?,?,?)";

            await connection.execute(sql, [user.cep, user.rua, user.cidade, user.bairro, user.complemento, user.numero, user.uf, user.id_pessoa]);

            res.sendStatus(200);
            console.log("> Usuario.postEndereco enviou Status 200");

        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }

    async updateEndereco(req, res) {
        const user = req.body;

        try {

            const sql = "UPDATE endereco SET cep = ?, rua = ?, cidade = ?, bairro = ?, complemento = ?, numero = ?, uf = ? WHERE id_endereco = ?";

            await connection.execute(sql, [user.cep, user.rua, user.cidade, user.bairro, user.complemento, user.numero, user.uf, user.id_endereco]);

            res.sendStatus(200);
            console.log("> Usuario.UpdateEndereco enviou Status 200");

        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }

    async deleteEndereco(req, res) {
        const user = req.body;

        try {

            const sql = "DELETE FROM endereco WHERE id_endereco = ?";
            await connection.execute(sql, [user.id_endereco]);

            res.sendStatus(200);
            console.log("> Usuario.deleteEndereco enviou Status 200");

        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }
}

export default new Usuario;