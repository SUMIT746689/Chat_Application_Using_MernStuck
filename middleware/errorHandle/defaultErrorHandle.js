//exetrnal library
const createError = require('http-errors');

function defaultRoute (req,res,next){
    next(createError(401,"Router is not Fonud"));
}

function defaultErrorHandler (err,req,res,next){
    if(process.env.NODE_ENV==='development'){
        res.render('errorFile',{
            status : err.status,
            message : err.message,
            err : err
        })
    }
    else{
        res.status(400).json({
            "error" : err.message,
            "env" : process.env.NODE_ENV
        })
    }
   
}

module.exports = {
    defaultRoute,
    defaultErrorHandler
}