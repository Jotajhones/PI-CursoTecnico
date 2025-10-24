import connection from "../config/mySqlConfig.js";

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

        const senha_padrao = '123';
        const senha_final = user.senha || senha_padrao;

        try {
            const sqlPessoa = "INSERT INTO pessoa(nome, email, cpf, genero, data_nascimento) VALUES (?,?,?,?,?);";
            const [resultPessoa] = await connection.execute(sqlPessoa, [user.nome, user.email, user.cpf, user.genero, user.data_nascimento]);

            const id_pessoa = resultPessoa.insertId;

            const sqlUsuario = "INSERT INTO usuario (id_pessoa) VALUE (?);";
            await connection.execute(sqlUsuario, [id_pessoa]);

            const sqlLogin = "INSERT INTO login (usuario, senha, id_pessoa) VALUES (?, UPPER(MD5(?)), ?);";
            await connection.execute(sqlLogin, [user.email, senha_final, id_pessoa]);

            res.status(200).send({ id_pessoa: id_pessoa });

            console.log(`> Usuario.setNewUser enviou Status 200 com id_pessoa: ${id_pessoa}`);

        } catch (error) {
            console.error("Erro ao inserir novo usuário:", error);
            res.sendStatus(500);
        }
    }

    async setNewUsers(req, res) {
        const usuarios = req.body;

        try {
            for (const user of usuarios) {
                const sqlPessoa = "INSERT INTO pessoa(nome, email, cpf, genero, data_nascimento) VALUES (?,?,?,?,?);";
                const [resultPessoa] = await connection.execute(sqlPessoa, [user.nome, user.email, user.cpf, user.genero, user.data_nascimento]);

                const id_pessoa = resultPessoa.insertId;

                const sqlUsuario = "INSERT INTO usuario (id_pessoa) VALUE (?);";
                await connection.execute(sqlUsuario, [id_pessoa]);

                const sqlLogin = "INSERT INTO login (usuario, senha, id_pessoa) VALUES (?, UPPER(MD5(?)), ?);";
                await connection.execute(sqlLogin, [user.email, '123', id_pessoa]);
            }

            res.sendStatus(200);
            console.log("> Usuario.setNewUsers enviou Status 200");

        } catch (error) {
            console.error("Erro ao inserir novos usuários:", error);
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

            const sqlLogin = "DELETE FROM login WHERE id_pessoa"
            await connection.execute(sqlLogin, [user.id_pessoa]);

            const sqlUsuario = "DELETE FROM usuario WHERE id_pessoa = ?";
            await connection.execute(sqlUsuario, [user.id_pessoa]);

            const sqlEndereco = "DELETE FROM endereco WHERE id_pessoa = ?";
            await connection.execute(sqlEndereco, [user.id_pessoa]);

            const sqlFone = "DELETE FROM telefone WHERE id_pessoa = ?";
            await connection.execute(sqlFone, [user.id_pessoa]);

            const sqlPessoa = "DELETE FROM pessoa WHERE id_pessoa = ?";
            await connection.execute(sqlPessoa, [user.id_pessoa]);

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
            await connection.execute(sql, [user.numero, user.tipo, user.id_telefone]);

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


    async getIdFone(req, res) {
        const { id_pessoa } = req.body;

        try {
            const sql = "SELECT id_telefone FROM relatorioUserFone WHERE id_pessoa = ? ORDER BY id_telefone DESC LIMIT 1";
            const [data] = await connection.execute(sql, [id_pessoa]);

            res.send(data);
            console.log("> Usuario.getIdFone enviou Status 200");

        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }

    async getIdEndereco(req, res) {
        const { id_pessoa } = req.body;

        try {
            const sql = "SELECT id_endereco FROM relatorioUserEndereco WHERE id_pessoa = ? ORDER BY id_endereco DESC LIMIT 1";
            const [data] = await connection.execute(sql, [id_pessoa]);

            res.send(data);
            console.log("> Usuario.getIdEndereco enviou Status 200");

        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }   
}

export default new Usuario;