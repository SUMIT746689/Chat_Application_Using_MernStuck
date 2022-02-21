//External module 
const express = require('express');
const middlewareForLocals = require('../checkout/middlewareForLocals');
const loginController = require('../controller/loginController');

//create a router 
const loginRouter = express.Router();

loginRouter.get('/',middlewareForLocals('login'),loginController);

module.exports = {
    loginRouter
} ;
