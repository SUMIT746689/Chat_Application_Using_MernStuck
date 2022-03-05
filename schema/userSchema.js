//external library
const mongoose = require('mongoose');

//create a schema
const peopleSchema = mongoose.Schema({
    name : {
        type: String,
        required : true 
    },
    email : {
        type : String,
        required : true
    },
    mobile : {
        type : String,
        required : true
    },
    password: {
        type : String,
        required : true
    },
    avatar : {
        type : String
    }
})

const User = mongoose.model('people',peopleSchema)

module.exports = User ;

