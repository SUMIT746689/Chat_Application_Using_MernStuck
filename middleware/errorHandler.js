const createError = require('http-errors');

const errorHandler =(req,res,next)=>{
    console.log(process.env.NODE_ENV)
    next(createError(401,'Your Requested content can not found'))
};
const defaultErrorHandler = (err,req,res,next)=>{
    
    console.log(res.locals.html);
    if(res.locals.html){
       
        res.render('errorFile',{
            errMessage : err
        })
    }
    else{
        res.status(err.status).send(err);
    }
}

module.exports = {
    errorHandler,
    defaultErrorHandler
}