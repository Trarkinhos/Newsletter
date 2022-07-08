require('dotenv/config');
const routes = require('express').Router();
const Users = require('../models/usersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

routes.post('/register', async (req, res) => {
    
    const { nome, email, senha, confirmar } = req.body

    if(!nome) return res.status(400).json({ error: 'O campo (nome) é obrigatório' })
    if(!email) return res.status(400).json({ error: 'O campo (email) é obrigatório' })
    if(!senha) return res.status(400).json({ error: 'O campo (senha) é obrigatório' })
    if(!confirmar) return res.status(400).json({ error: 'O campo (confirmar) é obrigatório' })

    if(senha !== confirmar) return res.status(400).json({ error: 'Os campos (senha) e (confirmar) precisam ser iguais' })

    const verificarEmail = await Users.findOne({ email: email })
    if(verificarEmail) return res.status(400).json({ error: 'O email já foi cadastrado, tente outro' })

    const salt = await bcrypt.genSalt(12)
    const hash = await bcrypt.hash(senha, salt)

    const newUser = { nome, email, senha: hash }

    try {
        await Users.create(newUser)
        return res.status(200).json({ sucess: 'Usuário cadastrado com sucesso' })
    }
    catch(err) {
        return res.status(500).json({ error: 'Erro com o banco de dados, tente mais tarde' })
    }

})

routes.post('/login', async (req, res) => {
    
    const { email, senha } = req.body

    if(!email) return res.status(400).json({ error: 'O campo (email) é obrigatório' })
    if(!senha) return res.status(400).json({ error: 'O campo (senha) é obrigatório' })
    
    const dadosUser = await Users.findOne({ email: email })
    if(!dadosUser) return res.status(400).json({ error: 'Usuário não encontrado'})

    const validarSenha = await bcrypt.compare(senha, dadosUser.senha)
    if(!validarSenha) return res.status(400).json({ error: 'Senha inválida' })

    try {
        const secret = process.env.SECRET
        const token = jwt.sign({
            id: dadosUser._id
        }, secret, {expiresIn: 60*60 })

        return res.status(200).json({ sucess: 'O token foi cadastrado com sucesso', token })
    }
    catch(err) {
        return res.status(500).json({ error: 'O token não pode ser gerado, tente mais tarde' })
    }

})

module.exports = routes;