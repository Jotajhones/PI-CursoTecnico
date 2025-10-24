import jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwtConfig.js'; 

/**
 * Middleware para verificar a validade e o tipo do Token de Recuperação de Senha.
 * Ele anexa o id_pessoa (extraído do payload) ao objeto req.
 */
const verificarTokenRecuperacao = (req, res, next) => {
    // 1. Tenta obter o token do cabeçalho 'Authorization'
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        // 401 Unauthorized: Token não fornecido.
        return res.status(401).json({ message: 'Acesso negado. Token de recuperação não fornecido.' });
    }

    // Separa o esquema ('Bearer') do token real
    const [scheme, token] = authHeader.split(' ');

    if (scheme !== 'Bearer' || !token) {
        // 401 Unauthorized: Token mal formatado.
        return res.status(401).json({ message: 'Token mal formatado. Use o formato: Bearer [token].' });
    }

    // 2. Verifica e decodifica o token
    jwt.verify(token, jwtConfig.secret, (err, decoded) => {
        if (err) {
            // Captura erros de expiração ('TokenExpiredError') ou assinatura inválida
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'O link de recuperação expirou. Por favor, solicite um novo.' });
            }
            // 401 Unauthorized para qualquer outro erro
            return res.status(401).json({ message: 'Token de recuperação inválido.' });
        }
        
        // 3. SEGURANÇA CRÍTICA: Verificar o TIPO do token
        // O token deve ter 'type: password_reset' no payload (definido em LogPessoas.esqueciSenha)
        if (decoded.type !== 'password_reset') {
             return res.status(403).json({ message: 'Token inválido. Não é um token de recuperação de senha válido.' });
        }

        // 4. Anexa o id_pessoa decodificado ao objeto 'req'.
        // O controller resetSenha usará este ID.
        req.id_pessoa = decoded.id_pessoa;

        // 5. Continua para a próxima função na rota (o controller resetSenha)
        next();
    });
};

export default verificarTokenRecuperacao;
