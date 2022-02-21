//External module 
const express = require('express');
const middlewareForLocals = require('../checkout/middlewareForLocals');
const usersController = require('../controller/usersController');

//create a router 
const usersRouter = express.Router();

usersRouter.get('/',middlewareForLocals('users'),usersController);

module.exports = {
    usersRouter
} ;
