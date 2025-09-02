import connection from "../config/config.js";

//classe para administrar as funções das rotas envovendo admins, apesar desta api ter somente controllers estes arquivos estão fazendo a função de controllers(controladores), models(modelos) e, interface da aplicação.

class Adm {

    init(connection) {
        this.connection = connection;

        this.req = req;
        this.res = res;

        this.get();
        this.post();
        this.put();
    }

    //adm.get metodo para vizulizar dados do banco

    async get(req, res) {

        try {

            const sql = "SELECT * FROM relatorioAdmins";
            const [data] = await connection.query(sql);
            res.send(data);

        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }


    //adm.post metodo para postar novo conteudo no banco
    async post(req, res) {
        const adm = req.body;

        try {

            const sql = "INSERT INTO pessoa(nome, email, cpf, genero, data_nascimento) VALUES (?,?,?,?,?);";
            await connection.execute(sql, [adm.nome, adm.email, adm.cpf, adm.genero, adm.data_nascimento]);

            const sql_1 = "INSERT INTO administrador(matricula, cargo, salario, id_pessoa) VALUES(?,?,?,LAST_INSERT_ID())";
            await connection.execute(sql_1, [adm.matricula, adm.cargo, adm.salario]);

            res.sendStatus(200);
            console.log("> Admin.post enviou Status 200");

        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }

    //adm.put metodo para atualizar registros do banco
    async put(req, res) {
        const adm = req.body;

        try {

            const sql = "UPDATE administrador SET matricula =? , cargo=?, salario=?, situacao=? WHERE id_administrador = ?"

            await connection.execute(sql, [adm.matricula, adm.cargo, adm.salario, adm.situacao, adm.id_administrador]);

            const sql_1 = "UPDATE pessoa SET nome = ?, email = ?, cpf = ?, situacao = ?, genero = ?, data_nascimento = ? WHERE id_pessoa = (SELECT id_pessoa FROM administrador WHERE id_administrador = ?)";

            await connection.execute(sql_1, [adm.nome, adm.email, adm.cpf, adm.situacao, adm.genero, adm.data_nascimento, adm.id_administrador]);

            res.sendStatus(200);
            console.log("> Admin.put enviou Status 200");

        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }
}

export default new Adm;