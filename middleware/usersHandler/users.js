const users = (req,res,next)=>{
    console.log(res.locals.types);
    res.render('users');
}

module.exports = users ;