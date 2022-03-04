//external middleware
const express = require('express');
const router = express.Router();

router.get('/',(req,res,next)=>{
    res.render('inbox');
}
)

module.exports = router;