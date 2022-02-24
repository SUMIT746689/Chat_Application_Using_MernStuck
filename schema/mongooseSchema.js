const mongoose = require('mongoose');

const peopleSchema =  mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true
    },
    number : {
        type : String,
        require :true
    },
    password : {
        type : String,
        required : true
    },
    avatar : {
        type : String,
    }
});

const User = new mongoose.model('user',peopleSchema);

module.exports = User ;