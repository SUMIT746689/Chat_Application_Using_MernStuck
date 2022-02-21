//External module 
const express = require('express');
const middlewareForLocals = require('../checkout/middlewareForLocals');
const inboxController = require('../controller/inboxController');

//create a router 
const inboxRouter = express.Router();

inboxRouter.get('/',middlewareForLocals('inbox'),inboxController);

module.exports = {
    inboxRouter
};
