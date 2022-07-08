const mongoose = require('mongoose');

const Users = mongoose.model('user', {

    nome: {
        type: String,
        required: true
    },
    
    email: {
        type: String,
        required: true
    },
    
    senha: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = Users;