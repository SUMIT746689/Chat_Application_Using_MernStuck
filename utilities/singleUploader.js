const path = require('path')
const multer = require('multer');
const createError = require('http-errors');

function uploader(
    subfolder_path,
    allowed_file_type,
    max_file_size,
    error_msg
){

    const uploadPath = path.join(__dirname,'../public/uploads',`${subfolder_path}`);

    const storage = multer.diskStorage({
        
        destination : function(req,file,cb){
            cb(null,uploadPath);
        },
        filename : function(req,file,cb){
            const fileExt = path.extname(file.originalname);
            const fileName = file.originalname
                .replace(fileExt,'')
                .split(' ')
                .join('-')+ '-' + Date.now();
            cb(null,fileName + fileExt);
        }
    });

    const upload = multer({
        storage : storage,
        limits : {
            fileSize : max_file_size,
        },
        fileFilter : function (req,file,cb){
            if(allowed_file_type.includes(file.mimetype)){
                cb(null,true);
            }
            else{
                cb(createError(error_msg));
            }
        }
    })

    return upload;
}

module.exports = uploader;