//external middleware
const express = require('express');
const localsHandler = require('../middleware/common/localsHandler');
const addUser = require('../middleware/usersHandler/addUser');
const avatarUpload = require('../middleware/usersHandler/avatarUpload');
const users = require('../middleware/usersHandler/users');
const {validateCheck,validationResults} = require('../middleware/usersHandler/validateCheck');
const User = require('../schema/userSchema');
const {unlink} = require('fs');
const path = require('path');  
//Internal middleware
const router = express.Router();

router.get('/',localsHandler,users);

router.post('/',avatarUpload,validateCheck,validationResults,addUser);

router.delete('/:id',async (req,res,next)=>{
    let errors ;
    const user = await User.findOne({_id : req.params.id});
    if(user ){
        if(user.avatar){
            const deleteFilePath = path.join(__dirname,'../public/uploads/avatars',user.avatar)
            await unlink(deleteFilePath,(err)=>{
                if(err){
                    errors = { msg : err}
                }
            });
        }
        await User.deleteOne({_id : user._id})
            .catch((err)=>{
                errors = {...errors , deletemsg : err }
            })
        if(!errors.deletemsg){
            res.json({message: "Successfully Deleted"});
        }
        else{
            res.json({
                error : errors
            })
        }
        
    }
    
})

module.exports = router;