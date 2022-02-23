const uploader = require("../../utilities/uploader");

function avatarUpload(req,res,next){
    const upload = uploader(
        "avatars",
        ["image/jpeg","image/jpg","image/png"],
        10000,
        "Only .jpeg, .png or .jpeg format allowed!"
    );

    //call the middleware function
    upload.any()(req,res,(err)=>{
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
module.export = avatarUpload ;