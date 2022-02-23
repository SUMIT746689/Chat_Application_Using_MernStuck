const multer = require("multer");
const path = require('path');

 function uploader(subfolder_path,
    allowed_file_types,
    max_file_size,
    err_msg
){
    const storage = multer.diskStorage({
        destination : function (req,file,cb){
            const destination_path = `${__dirname}/../public/uploads/${subfolder_path}`;

            cb(null,destination_path);
        },
        filename : function (req,file,cb){
            const fileExt = path.extname(file.originalname);
            const unique_fileName = 
            file.originalname
            .replace(fileExt,"")
            .toLowerCase()
            .split(' ')
            .join('-') +"-"+
            Date.now();

            cb(null,unique_fileName+fileExt);
        }
    })
    const upload = multer({
        storage : storage,
        limits : {
            fileSize : max_file_size,
        },
        fileFilter : (req,file,cb)=>{
            if(allowed_file_types.includes(file.mimetype)){
                cb(null,true);
            }
            else{
                cb(createError(err_msg))
            }
        }
    })
    return upload ;
}

 module.exports = uploader ;