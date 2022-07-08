require('dotenv/config')
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE).then(() => console.log('Banco rodando!')).catch(err => console.log(err))

module.exports = mongoose;