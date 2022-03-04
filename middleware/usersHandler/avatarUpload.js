const multer = require("multer");
const singleUpload = require("../../utilities/singleUpload");

function avatarUpload (req,res,next) {
    const uploaded = singleUpload('avatars',
    ['image/jpeg','image/jpg','image/png'],
    100000,
    'Only .jpeg, .jpg or .png file are allowed'
    )
    uploaded.any()(req,res,(err)=>{
        if(err){
            res.status(500).json({
                errors : {
                    avatar : {
                        msg : err.message
                    }
                }
            })
        }
        else{
            next();
        }
    })
}

module.exports = avatarUpload;