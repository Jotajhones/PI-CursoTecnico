import connection from "../config/mySqlConfig.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import jwtConfig from "../config/jwtConfig.js";
import emailService from "../services/emailService.js"; // IMPORTAÇÃO DO NOVO SERVIÇO DE E-MAIL


dotenv.config();

// Variáveis de ambiente
const JWT_SECRET = jwtConfig.secret;
const FRONTEND_URL = process.env.FRONTEND_URL;

class LogPessoas {

    init(connection) {
        // Método de inicialização, mantido intacto.
    }

    async login(req, res) {
        const { usuario, senha } = req.body;

        try {
            const sqlVerificaUsuario = "SELECT id_pessoa, id_usuario, usuario, nome, tipo_usuario, alterar_senha, ultima_venda, data_acesso, senha FROM relatorioLogin WHERE usuario = ?";
            const [usuarioEncontrado] = await connection.execute(sqlVerificaUsuario, [usuario]);

            if (usuarioEncontrado.length === 0) {
                return res.status(401).json({ message: "Usuario não encontrado, se cadastre para entrar!" });
            }

            // Lógica MD5 para verificação de senha
            const sqlVerificaSenha = "SELECT id_pessoa, id_usuario, usuario, nome, tipo_usuario, alterar_senha, ultima_venda, data_acesso FROM relatorioLogin WHERE usuario = ? AND senha = UPPER(MD5(?))";
            const [data] = await connection.execute(sqlVerificaSenha, [usuario, senha]);

            if (data.length === 0) {
                return res.status(401).json({ message: "Credenciais invalidas, verifique sua senha!" });
            }

            const usuarioLogado = data[0];

            // 1. CRIAÇÃO DO PAYLOAD
            const payload = {
                id_pessoa: usuarioLogado.id_pessoa,
                id_usuario: usuarioLogado.id_usuario,
                usuario: usuarioLogado.usuario,
                tipo_usuario: usuarioLogado.tipo_usuario
            };

            // 2. GERAÇÃO DO TOKEN
            const token = jwt.sign(payload, JWT_SECRET, {
                expiresIn: jwtConfig.expiresIn
            });

            // 3. Atualização do acesso no BD
            const sqlUpdateAcesso = "UPDATE login SET data_acesso = CURRENT_TIMESTAMP WHERE id_pessoa = ?";
            await connection.execute(sqlUpdateAcesso, [usuarioLogado.id_pessoa]);

            // 4. RETORNA O TOKEN E OS DADOS DO USUÁRIO
            return res.json({
                message: "Login bem-sucedido",
                token: token,
                usuario: usuarioLogado
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro interno no servidor" });
        }
    }

    async obterDadosLogado(req, res) {
        // Usando dados do token injetados pelo middleware de autenticação
        const { id_usuario, id_pessoa, usuario } = req.usuarioLogado;

        try {

            const sql = "SELECT id_pessoa, id_usuario, usuario, nome, tipo_usuario, alterar_senha, ultima_venda, data_acesso FROM relatorioLogin WHERE id_usuario = ? AND id_pessoa = ? AND usuario =?";
            const [data] = await connection.execute(sql, [id_usuario, id_pessoa, usuario]);

            res.send(data);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro interno no servidor" });
        }
    }

    // Rota de envio de e-mail genérica, usa o serviço de e-mail
    async enviarEmail(req, res) {
        const { destinatarios, assunto, corpoHtml } = req.body;

        if (!destinatarios || !assunto || !corpoHtml) {
            return res.status(400).json({ message: "Dados de email incompletos (destinatarios, assunto e corpoHtml são obrigatórios)." });
        }

        try {
            // Chama a função genérica no serviço
            const info = await emailService.sendEmail({
                to: destinatarios,
                subject: assunto,
                htmlBody: corpoHtml
            });

            return res.status(200).json({
                message: "E-mail enviado com sucesso!",
                messageId: info.messageId
            });
        } catch (error) {
            console.error('Erro ao enviar e-mail:', error.message);
            return res.status(500).json({
                message: "Falha ao enviar e-mail.",
                error: error.message
            });
        }
    }


    /**
     * Passo 1: Rota pública para solicitar a recuperação de senha.
     * Gera um JWT de recuperação e dispara o e-mail via emailService.
     */
    async esqueciSenha(req, res) {

        const { email } = req.body;
        // Assume que 'email' na tabela 'pessoa' corresponde ao campo de login.
        const query = 'SELECT id_pessoa FROM pessoa WHERE email = ?';

        try {
            // 1. Encontrar o usuário pelo e-mail
            const [rows] = await connection.execute(query, [email]);
            const user = rows[0];

            // 2. SEGURANÇA: Resposta consistente
            if (!user) {
                console.log(`Tentativa de recuperação de senha para e-mail não existente: ${email}`);
                return res.status(200).json({ message: 'Se um usuário com este e-mail for encontrado, um link de recuperação será enviado.' });
            }

            // 3. Gerar o JWT de Recuperação
            const payload = {
                id_pessoa: user.id_pessoa,
                type: 'password_reset' // Tipo de token obrigatório para o middleware verifyRecoveryToken
            };

            // Token de curta duração (15 minutos)
            const resetToken = jwt.sign(
                payload,
                JWT_SECRET,
                { expiresIn: '15m' }
            );

            // 4. Enviar o e-mail usando o serviço (Nodemailer)
            await emailService.sendPasswordResetEmail(email, resetToken);

            // 5. Resposta final de sucesso
            return res.status(200).json({ message: 'Se um usuário com este e-mail for encontrado, um link de recuperação será enviado.' });

        } catch (error) {
            console.error('Erro na função esqueciSenha:', error.message);
            return res.status(500).json({ message: 'Erro interno do servidor ao processar a solicitação.' });
        }
    }

    async resetSenha(req, res) {
        // id_pessoa é INJETADO no req pelo middleware verifyRecoveryToken
        const id_pessoa = req.id_pessoa;
        const { nova_senha } = req.body;

        if (!nova_senha) {
            return res.status(400).json({ message: 'A nova senha é obrigatória.' });
        }

        try {
            // 1. QUERY SQL para atualizar a senha e o timestamp de segurança
            // Usa UPPER(MD5(?)) para compatibilidade com seu formato de armazenamento
            const updateQuery = `
                UPDATE login 
                SET 
                    senha = UPPER(MD5(?)), 
                    data_acesso = CURRENT_TIMESTAMP 
                WHERE 
                    id_pessoa = ?
            `;

            // Passamos a nova_senha como primeiro parâmetro e o id_pessoa como segundo
            await connection.execute(updateQuery, [nova_senha, id_pessoa]);

            // 2. Resposta final
            return res.status(200).json({ message: 'Senha alterada com sucesso! Todas as sessões antigas foram invalidadas. Faça login com a nova senha.' });

        } catch (error) {
            console.error('Erro na função resetSenha:', error);
            return res.status(500).json({ message: 'Erro interno do servidor ao tentar resetar a senha.' });
        }
    }

    async alterarSenha(req, res) {

        const { id_pessoa, senha, nova_senha } = req.body;

        if (!senha || !nova_senha || !id_pessoa) {
            return res.status(400).json({ message: "Dados incompletos. ID, senha atual e nova senha são obrigatórios." });
        }

        if (senha === nova_senha) {
            return res.status(400).json({ message: "A nova senha não pode ser igual à senha atual." });
        }

        try {
            const sqlVerificaSenha = `
            SELECT id_pessoa 
            FROM login 
            WHERE id_pessoa = ? AND senha = UPPER(MD5(?))
        `;

            const [usuarioEncontrado] = await connection.execute(sqlVerificaSenha, [id_pessoa, senha]);

            if (usuarioEncontrado.length === 0) {
                return res.status(401).json({ message: "ID ou Senha atual incorreta. Acesso negado." });
            }

            const sqlAtualizaSenha = `
            UPDATE login 
            SET senha = UPPER(MD5(?)) 
            WHERE id_pessoa = ?
        `;

            await connection.execute(sqlAtualizaSenha, [nova_senha, id_pessoa]);

            return res.status(200).json({ message: "Senha alterada com sucesso!" });

        } catch (error) {
            console.error("Erro ao tentar alterar a senha:", error);
            return res.status(500).json({ message: "Erro interno do servidor ao processar a alteração de senha." });
        }
    }
}

export default new LogPessoas;
