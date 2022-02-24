//external library
const {check,validationResult} = require('express-validator');
const createError = require('http-errors');
const User = require('../../schema/mongooseSchema');


const userValidation = [
    check('name')
    .isLength({min : 1})
    .withMessage("Name is required")
    .isAlpha("en-US",{ignore : ' -'})
    .withMessage("Name must not contain anythig rather then alphabet")
    .trim(),
    
    check('email')
    .isEmail()
    .withMessage("Invalid Email address")
    .trim()
    .custom(async(value)=>{
        try{
            const user = await User.findOne({email : value})
            if(user){
                throw createError("This email already used")
            }
        }
       catch(err){
            throw createError(err.message)
       }

    }),

    check('number')
    .isMobilePhone("bn-BD",{
        strictMode : true
    })
    .withMessage("Mobile Number must be a valid bangladeshi number")
    .custom(async(value)=>{
        try{
            const user = User.findOne({number : value});
            if(user){
                throw createError("This number already in used")
            }
        }
        catch(err){
            throw createError(err.message);
        }
    }),

    check('password')
    .isStrongPassword()
    .withMessage(
        "password must be ata least 8 character & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol"
    ),


]

const addUserValidationHandler = (req,res,next)=>{
    const errors = validationResult(req);
    const mappedError = errors.mapped();
    if(Object.keys(mappedError).length === 0 ){
        next();
    }
    else{
        //removed upload files
    }
    console.log(Object.keys(mappedError).length)
}

module.exports = {
    userValidation,
    addUserValidationHandler
} ;