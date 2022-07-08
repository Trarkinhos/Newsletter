// Importações
require('dotenv/config');
const jwt = require('jsonwebtoken');

// Middleware
function authToken( req, res, next ){

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(!token){
        return res.status(400).json({ error: 'Token não encontrado' })
    }

    try{

        const secret = process.env.SECRET

        jwt.verify(token, secret)

        next()
    }
    catch(err) {
        res.status(500).json({ error: 'Token inválido, o acesso não pode ser liberado' })
    }

}

module.exports = authToken;