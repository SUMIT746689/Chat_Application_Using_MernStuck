const path = require("path");
const multer = require("multer");
const createError = require("http-errors");

function singleUpload (
    subfolder_path,
    allowed_file_types,
    max_file_size,
    error_msg
) {
    const folderPath = path.join(__dirname,'../public/uploads',subfolder_path);
    const storage = multer.diskStorage({
        destination : function(req,file,cb){
            cb(null,folderPath);
        },
        filename: function (req,file,cb){
            const fileExt = path.extname(file.originalname);
            const filename = file.originalname
                .replace(fileExt,'')+'-'+Date.now();
            console.log(fileExt); 
            cb(null,filename+fileExt);
        }
    });

    const upload = multer({
        storage : storage,
        limits : {
            fileSize : max_file_size
        },
        fileFilter : function fileFilter (req,file,cb){
            if(allowed_file_types.includes(file.mimetype)){
                cb(null,true);
            }
            else{
                cb(createError(error_msg))
            }
        } 
    });
    
    return upload ;
}

module.exports = singleUpload ;