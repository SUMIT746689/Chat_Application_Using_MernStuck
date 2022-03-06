//External module
const bcrypt = require('bcrypt');
//internal module
const User = require("../../schema/userSchema");

async function addUser (req,res,next){
    let user ;
    const hashPassword = await bcrypt.hash(req.body.password,Number(process.env.SALT));
    if(req.files && req.files.length>0){
        user = new User({
            ...req.body,
            avatar : req.files[0].filename,
            password : hashPassword
        })
    }
    else{
        user = new User({
            ...req.body,
            password : hashPassword
        })
    }
    try{
        await user.save();
        res.status(200).json({
            message : "User added database Successfully"
        });
    }
    catch(err){
        res.status(400).json({
            errors : {
                common : {
                    msg : "unknown error accourd!"
                }
            }
        })
    }
}

module.exports = addUser ;