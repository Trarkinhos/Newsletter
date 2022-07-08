const mongoose = require('mongoose');

const Leitores = mongoose.model('leitor', {

    nome: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = Leitores;