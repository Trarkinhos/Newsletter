// Importações
require('dotenv/config');
const express = require('express');
const app = express();
const port = 5000;

const mongoose = require('./src/database/connection') // database
const authToken = require('./src/middlewares/authToken') // middleware

// Controllers
const usersControllers = require('./src/controllers/usersControllers')
const leitoresControllers = require('./src/controllers/leitoresControllers')
const newsletterControllers = require('./src/controllers/newsletterControllers')

// Requisições
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// Rotas
app.use('/newsletter', authToken, newsletterControllers)
app.use('/registrar', leitoresControllers)
app.use('/auth', usersControllers)

// Server
app.listen(port, () => {
    console.log(`Servidor no ar: http://localhost:${port}`)
})