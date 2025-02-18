const knex = require('../config');
const jwt = require('jsonwebtoken');
const senhaHash = require('../senhaHash');

const autenticacao = async (req, res, next) => {
    const { authorization } = req.headers;

    const token = authorization.replace('Bearer', '').trim();

    if (!token) {
        return res.status(404).json('Token não foi informado');
    }
    
    try {
        
        const { id_usuario } = jwt.verify(token, senhaHash);

        const usuario = await knex('usuarios').where({ id_usuario });

        if (!usuario) {
            return res.status(404).json("Token inválido");
        }
        
        const { senha, ...dadosUsuario } = usuario;

        req.usuario =  dadosUsuario;
    
        next();

        } catch (error) {
        return res.status(400).json(error.message);
    }
};

module.exports = autenticacao;