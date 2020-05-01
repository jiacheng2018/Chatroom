const aws=require('aws-sdk');
const multer=require('multer');
const multerS3=require('multer-s3');
const Scret =require('../secret/secret');
const s3CVonfig=aws.config.update({
    secretAccessKey:Scret.Aws.secretAccessKey,
    accessKeyId:Scret.Aws.accessKeyId,
    region:'ap-southeast-2'
});
const fileFilter=(req,file,cb)=>{
    if(file.mimetype=='image/jpeg'||file.mimetype=='image/png'){
        cb(null,true)
    }else{
        cb(null,false)
    }
}
const multerS3Config=multerS3({
    s3:s3CVonfig,
    bucket:Scret.Aws.AWS_buckName,
    metadata:function(req,file,cb){
        cb(null,{fieldName:file.fieldname})
    },
    key:function(req,file,cb){
        cb(null,new Date().toISOString()+'-'+file.originalname)
    }
})
const upload=multer({
    storage:multerS3Config,
    fileFilter:fileFilter,
    limits:{
        fileSize:1024*1024*5
    }
})

exports.Upload=upload;