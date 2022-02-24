//External library
const express = require('express');

//internal Library 
const router = express.Router();

//router methods
router.get('/',function(req,res,next){
    res.render('inbox');
}) 

module.exports = router;