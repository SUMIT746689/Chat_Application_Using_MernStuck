//External library
const express = require('express');
const {check} = require('express-validator');

//internal Library 
const router = express.Router();
const {userValidation, addUserValidationHandler} = require('../middleware/users/userValidation');
const avatarUpload = require('../middleware/users/avatarUpload');

//router methods
router.get('/',function(req,res,next){
    res.render('users');
});
router.post('/',avatarUpload,userValidation,addUserValidationHandler);

module.exports = router;