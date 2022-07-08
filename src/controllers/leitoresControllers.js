// Importações
const routes = require('express').Router();
const Leitores = require('../models/leitoresModel')

// Rota de cadastro para receber as newsletter
routes.post('/', async (req, res) => {

    const { nome, email } = req.body

    if(!nome) return res.status(400).json({ error: 'O campo (nome) é obrigatório' })
    if(!email) return res.status(400).json({ error: 'O campo (email) é obrigatório' })

    const verificarEmail = await Leitores.findOne({ email: email })
    if(verificarEmail) return res.status(400).json({ error: 'O email já foi cadastrado, tente outro' })

    const newLeitor = { nome, email }

    try {
        await Leitores.create(newLeitor)
        return res.status(200).json({ sucess: 'Email cadastrado com sucesso, logo mais você vai receber as newsletter' })
    }
    catch(err) {
        return res.status(500).json({ error: 'Erro no cadastro, tente mais tarde' })
    }
    

})

module.exports = routes