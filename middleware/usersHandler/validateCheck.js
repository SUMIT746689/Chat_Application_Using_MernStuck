const {check,validationResult}  = require('express-validator');
const createError = require('http-errors');
const User = require('../../schema/userSchema');
const path = require('path');
const fs = require('fs');

const validateCheck = [
    check("name")
        .isLength({min : 1})
        .withMessage("Name is required")
        .isAlpha("en-US",{ignore : " -"})
        .withMessage("Name must not contain anything other than alphabet")
        .trim(),
    check("email")
        .isEmail()
        .withMessage("Invalid email address")
        .trim()
        .custom(async (value)=>{
            try{
                const user = await User.findOne({email : value});
                if(user){
                    throw createError("Email already in used");
                }
            }
            catch(err){
                throw createError(err.message);
            }
        }),
    check("mobile")
        .isMobilePhone("bn-BD",{
            strictMode : true
        })
        .withMessage("your Mobile number must be a valid bangladeshi number")
        .custom(async (value)=>{
            try { 
                const user = await User.findOne({mobile : value});
                if(user){
                    throw createError("Mobile alreaady is used");
                }
            }
            catch(err){
                throw createError(err.message);
            }
        }),
    check("password")
        .isStrongPassword()
        .withMessage(
            "Password must be at least 8 characters long & should at least 1 lowercase, 1 uppercase, 1 number & 1 symbol"
        )
];

function validationResults (req,res,next) {
    const errors =  validationResult(req) ;
    const mappedError = errors.mapped();
    if(Object.keys(mappedError).length === 0){
        next();
    }
    else{
        if(req.files.length > 0){
            const {filename} = req.files[0];
            fs.unlink(
                path.join(__dirname,`../../public/uploads/avatars/${filename}`),
                (err)=>{
                    if(err) {console.log(err)}
                }
            )  
        }
        res.status(500).json({
           errors : mappedError
        }); 
    }
    
}

module.exports = {
    validateCheck,
    validationResults
}