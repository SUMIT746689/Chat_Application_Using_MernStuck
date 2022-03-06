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
        required : true,
        trim : true,
        lowercase : true
    },
    mobile : {
        type : String,
        required : true
    },
    password: {
        type : String,
        required : true,
        
    },
    avatar : {
        type : String
    },
    role : {
        type : String,
        enum:["admin","user"],
        default : "user"
    }
},{
    timestamps : true 
})

const User = mongoose.model('people',peopleSchema)

module.exports = User ;

