const uploader = require("../../utilities/singleUploader");

function avatarUpload (req,res,next) {

    const upload = uploader(
        "avatars",
        ["iamge/jpeg","image/jpg","image/png"],
        100000,
        "Only .jpeg, .jpg and .png format allowed"
    )

    upload.any()(req,res,err=>{
        if(err){
            res.status(405).json({
                errors: {
                    avatar : {
                        msg : err.message
                    }
                }
            })
        }
        else{
            next()
        }
    })
    
}

module.exports = avatarUpload ;