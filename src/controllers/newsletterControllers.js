require('dotenv/config');
const routes = require('express').Router();
const nodemailer = require('nodemailer');
const Leitores = require('../models/leitoresModel')

routes.post('/enviar', async (req, res) => {

    const { titulo, corpo } = req.body

    if(!titulo) return res.status(400).json({ error: 'O campo (titulo) é obrigatório'})
    if(!corpo) return res.status(400).json({ error: 'O campo (corpo) é obrigatório'})

    const transporter = nodemailer.createTransport({
        
        host: process.env.HOSTSMTP,
        port: process.env.PORTSMTP,
        secure: true,
        auth: {
            user: process.env.USERMAIL,
            pass: process.env.PASSMAIL
        }
    })

    async function enviarEmails (usersemail){
        await transporter.sendMail({
            from: `Newsletter ${process.env.USERMAIL}`,
            to: usersemail,
            subject: titulo,
            text: corpo
         })
        .then(message => console.log(message))
        .catch(err => console.log(err))
    }
    
    const getLeitores = await Leitores.find()
    if(!getLeitores) return res.status(400).json({ error: 'Nenhum email foi encontrado' })
    
    getLeitores.forEach(function(item) {
        enviarEmails(JSON.stringify(item.email))
    })

    try {
        return res.status(200).json({ sucess: 'As newsletters foram enviadas com sucesso!' })
    }
    catch(err) {
        return res.status(500).json({ error: 'As newsletters não foram enviadas' })
    }

})

module.exports = routes;