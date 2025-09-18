import connection from "../config/config.js";

class Usuario {

    init(connection) {
        this.connection = connection;

        this.req = req;
        this.res = res;
    }

    async getUsers(req, res) {

        try {

            const sql = "SELECT * FROM relatorioUsuario";
            const [data] = await connection.query(sql);

            res.send(data);
            console.log("> Usuario.getUsers enviou status 200");

        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }

    async setNewUser(req, res) {
        const user = req.body;

        try {

            const sql = "INSERT INTO pessoa(nome, email, cpf, genero, data_nascimento) VALUES (?,?,?,?,?);";
            await connection.execute(sql, [user.nome, user.email, user.cpf, user.genero, user.data_nascimento]);

            const sql_1 = "INSERT INTO usuario (id_pessoa) VALUE (LAST_INSERT_ID())";
            await connection.execute(sql_1);

            res.sendStatus(200);
            console.log("> Usuario.setNewUser enviou Status 200");

        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }

    async setNewUsers(req, res) {
        const usuarios= req.body;

        try {

            usuarios.forEach(user => {

                const sql = "INSERT INTO pessoa(nome, email, cpf, genero, data_nascimento) VALUES (?,?,?,?,?);";
                connection.execute(sql, [user.nome, user.email, user.cpf, user.genero, user.data_nascimento]);

                const sql_1 = "INSERT INTO usuario (id_pessoa) VALUE (LAST_INSERT_ID())";
                connection.execute(sql_1);
            });

            res.sendStatus(200);
            console.log("> Usuario.setNewUsers enviou Status 200");

        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }

    async setUser(req, res) {
        const user = req.body;

        try {

            const sql = "UPDATE usuario SET desconto = ?, fidelidade = ? WHERE id_usuario = ?";
            await connection.execute(sql, [user.desconto, user.fidelidade, user.id_usuario]);

            const sql_1 = "UPDATE pessoa SET nome = ?, email = ?, cpf = ?, situacao = ?, genero = ?, data_nascimento = ? WHERE id_pessoa = (SELECT id_pessoa FROM usuario WHERE id_usuario = ?)";

            await connection.execute(sql_1, [user.nome, user.email, user.cpf, user.situacao, user.genero, user.data_nascimento, user.id_usuario]);

            res.sendStatus(200);
            console.log("> Usuario.setUser enviou Status 200");

        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }

    async deleteUser(req, res) {
        const user = req.body;

        try {

            const sql = "DELETE FROM usuario WHERE id_usuario = ?";
            await connection.execute(sql, [user.id_usuario]);

            const sql_1 = "DELETE FROM pessoa WHERE id_pessoa = ?";
            await connection.execute(sql, [user.id_pessoa]);

            res.sendStatus(200);
            console.log("> Usuario.deleteUser enviou Status 200");

        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }

    async searchUsers(req, res) {
        const user = req.body;

        try {
            const sql = "SELECT * FROM relatorioUsuario WHERE nome like ? || cpf like ? || genero like ?";

            const [data] = await connection.execute(sql, [user.nome, user.cpf, user.genero]);

            res.send(data);
            console.log("> Usuario.searchUsers enviou Status 200");

        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }

    async filterUsers(req, res) {
        const user = req.body;

        try {

            const sql = "SELECT * FROM relatorioUsuario WHERE situacao = ?";
            const [data] = await connection.execute(sql, [user.situacao]);

            res.send(data);
            console.log("> Usuario.filterUsers send status 200");

        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }

    async getUser(req, res) {
        const id_pessoa = req.params.id_pessoa;
        const id_usuario = req.params.id_usuario;        

        try {

            const sql = "SELECT * FROM relatorioUsuario WHERE id_pessoa = ? && id_usuario = ?";
            const [data] = await connection.execute(sql, [id_pessoa, id_usuario]);

            res.send(data);
            console.log("> Usuario.getUser enviou Status 200");

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

    async setNewFone(req, res) {
        const user = req.body;

        try {

            const sql = "INSERT INTO telefone(numero, id_pessoa) VALUES(?,?)";
            await connection.execute(sql, [user.numero, user.id_pessoa]);

            res.sendStatus(200);
            console.log("> Usuario.setNewFone enviou Status 200");

        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }

    async setFone(req, res) {
        const user = req.body;

        try {

            const sql = "UPDATE telefone SET numero = ?, tipo = ? WHERE id_telefone = ?";
            await connection.execute(sql, [ user.numero, user.tipo, user.id_telefone]);

            res.sendStatus(200);
            console.log("> Usuario.setFone enviou Status 200");

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

    async setNewEndereco(req, res) {
        const user = req.body;

        try {

            const sql = "INSERT INTO endereco(cep, rua, cidade, bairro, complemento, numero, uf, id_pessoa) VALUES(?,?,?,?,?,?,?,?)";

            await connection.execute(sql, [user.cep, user.rua, user.cidade, user.bairro, user.complemento, user.numero, user.uf, user.id_pessoa]);

            res.sendStatus(200);
            console.log("> Usuario.setNewEndereco enviou Status 200");

        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }

    async setEndereco(req, res) {
        const user = req.body;

        try {

            const sql = "UPDATE endereco SET cep = ?, rua = ?, cidade = ?, bairro = ?, complemento = ?, numero = ?, uf = ? WHERE id_endereco = ?";

            await connection.execute(sql, [user.cep, user.rua, user.cidade, user.bairro, user.complemento, user.numero, user.uf, user.id_endereco]);

            res.sendStatus(200);
            console.log("> Usuario.setEndereco enviou Status 200");

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