import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Credenciais do Nodemailer
const REMETENTE = process.env.NODEMAILER_USER;
const SENHA_APP = process.env.NODEMAILER_PASS;
const FRONTEND_URL = process.env.FRONTEND_URL;

// Configuração do Transportador
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: REMETENTE,
        pass: SENHA_APP
    }
});

/**
 * Função utilitária genérica para envio de e-mail.
 * @param {object} options - Opções de e-mail ({ to, subject, htmlBody })
 */
const sendEmail = async ({ to, subject, htmlBody }) => {
    if (!SENHA_APP) {
        throw new Error("Senha de App (NODEMAILER_PASS) não configurada.");
    }

    const mailOptions = {
        from: REMETENTE,
        to: to,
        subject: subject,
        html: htmlBody,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('E-mail enviado com sucesso! ID:', info.messageId);
        return info;
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
        throw new Error(`Falha ao enviar e-mail. Erro: ${error.message}`);
    }
};

/**
 * Envia o e-mail específico de recuperação de senha.
 * @param {string} email - O endereço de e-mail do destinatário.
 * @param {string} resetToken - O JWT de uso único para o reset.
 */
const sendPasswordResetEmail = async (email, resetToken) => {
    // Montagem do link completo: FRONTEND_URL + caminho do HTML + token
    // Assumindo que o FRONTEND_URL é a URL base + caminho, ex: http://localhost:5500/assets/pages/
    const resetLink = `${FRONTEND_URL}?token=${resetToken}`;
    
    const subject = "Recuperação de Senha - Ação Necessária";
    
    // Corpo HTML formatado para o e-mail
    const corpoHtml = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2>Solicitação de Recuperação de Senha</h2>
            <p>Recebemos uma solicitação para redefinir a senha associada a este endereço de e-mail.</p>
            <p>Para prosseguir com a redefinição, clique no botão abaixo. Este link expira em 15 minutos.</p>
            
            <a href="${resetLink}" 
               style="display: inline-block; padding: 10px 20px; margin: 20px 0; font-size: 16px; color: white; background-color: #007bff; border-radius: 5px; text-decoration: none;">
                Redefinir Senha
            </a>
            
            <p>Se você não solicitou esta alteração, ignore este e-mail. Sua senha permanecerá inalterada.</p>
            <p>Obrigado,<br>Sua Equipe de Suporte</p>
            <p style="font-size: 0.8em; color: #777;">Link direto: <a href="${resetLink}">${resetLink}</a></p>
        </div>
    `;

    // Chama a função genérica de envio
    return sendEmail({ 
        to: email, 
        subject: subject, 
        htmlBody: corpoHtml 
    });
};

export default { sendEmail, sendPasswordResetEmail };
