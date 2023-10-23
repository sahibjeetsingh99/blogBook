const mongoose = require('mongoose')

const user_Schema = new mongoose.Schema({

    //enter the username you want
    username: {
        type: String,
        required: true
    },

    //type the regisered mail id
    email: {
        type: String,
        required: true
    },

    //enter the password, it will get hashed on the UI
    password: {
        type: String,
        required: true
    },

    //it will generate automatically
    registrationDate: {
        type: Date,
        default: Date.now 
    },
    
})

module.exports = mongoose.model('users',user_Schema)


