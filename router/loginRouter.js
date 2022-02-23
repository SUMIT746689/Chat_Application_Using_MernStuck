//External module 
const express = require('express');

//Internal Upload
const middlewareForLocals = require('../checkout/middlewareForLocals');
const loginController = require('../controller/loginController');
const avatarUpload = require('../middleware/users/avatarUpload')

//create a router 
const loginRouter = express.Router();

loginRouter.get('/',middlewareForLocals('login'),loginController);

loginRouter.post('/',avatarUpload);

module.exports = {
    loginRouter
} ;
