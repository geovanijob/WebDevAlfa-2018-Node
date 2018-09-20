const jwt = require('jsonwebtoken');

/**
 * Chave de validação do JWT.
 */
const SECRET_KEY = 'segredodotoken';

/**
 * Middleware que verifica a validade e decodifica o token de autenticação presente no header 'x-access-token'.
 * 
 * @param {request} request
 * @param {response} response
 * @param {next} next
 */
function authenticationMiddleware(request, response, next) {
    const token = request.headers["token"] || request.cookies["token"];
    try {
        const payload = jwt.verify(token, SECRET_KEY);
        request.usuarioLogado = payload;
        next();
    } catch (ex) {
        
        console.error('Não foi possível decodificar o token:', token, ex);
        response.status(401).send('Acesso não autorizado.');
    }
}

/**
 * Gera o token de autenticação para o usuário.
 * 
 * @param {object} payload objeto plano contendo os dados do usuário.
 * @return {string} Token de autenticação.
 */
function generateToken(payload) {
    delete payload.senha;
    console.log(payload)
    const token = jwt.sign(payload.nome, SECRET_KEY, { encoding: 'UTF8' });
    return token;
}

module.exports = {
    authenticationMiddleware,
    generateToken,
};
