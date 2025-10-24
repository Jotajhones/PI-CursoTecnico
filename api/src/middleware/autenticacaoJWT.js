import jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwtConfig.js'; 

/**
 * Middleware para verificar a validade do Token JWT
 * e anexar os dados do usuário (payload) ao objeto req.
 */
const autenticacaoJWT = (req, res, next) => {
    // 1. Tenta obter o token do cabeçalho 'Authorization'
    // O formato esperado é: 'Bearer SEU_TOKEN_AQUI'
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        // 401 Unauthorized: Token não fornecido.
        return res.status(401).json({ message: 'Acesso negado. Token de autenticação não fornecido.' });
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
            // 403 Forbidden: Token inválido, expirado ou corrompido.
            return res.status(403).json({ message: 'Token inválido ou expirado. Faça login novamente.' });
        }

        // 3. Anexa o payload (dados do usuário) decodificado ao objeto 'req'.
        // Agora, qualquer função seguinte (controller) pode acessar req.usuarioLogado
        req.usuarioLogado = decoded;

        // 4. Continua para a próxima função na rota (o controller)
        next();
    });
};

export default autenticacaoJWT;
