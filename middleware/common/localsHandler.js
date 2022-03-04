function localsHandler (req,res,next) {
    res.locals.types = 'html';
    next()
}
module.exports = localsHandler ;