const User = require("../../schema/userSchema");

const users = async (req,res,next)=>{
    const users = await User.find();
    res.render('users',{
        users 
    });
}

module.exports = users ;