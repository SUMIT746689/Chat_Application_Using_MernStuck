//External library
const createError = require('http-errors');

//empty file handler  
function emptyFile (req,res,next){
    
    next(createError(401,'Please login to view this page.'))
}

function defaultErrorHandler (err,req,res,next){

    const status = err.status ? err.status : 500 ; 
    
    if(!process.env.NODE_ENV==='development'){
        res.send(400).json({error : err.message});
    }else{
        res.render('errorFile',{
            status : status,
            message : err.message
        });
    }
}

module.exports = {
    emptyFile,
    defaultErrorHandler
}