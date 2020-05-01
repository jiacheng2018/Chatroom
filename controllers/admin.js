const path=require('path');
const fs=require('fs');
module.exports=function(formidable,Club,AWSUpload){
   return{
    SetRouting:function(router){
        router.get('/dashboard',this.indexPage);
        router.post('/uploadFile',AWSUpload.Upload.any(),this.uploadFile);
        router.post('/dashboard',this.adminPostPage);
    },
    adminPostPage:function(req,res){
     
    },
    indexPage:function(req,res){
        res.render('admin/dashboard');
    },
    uploadFile:function(req,res){
        // test store locally
        const form=new formidable.IncomingForm();
        // form.uploadDir=path.join(__dirname,'../public/upload');
        form.on('file',(field,file)=>{
            // fs.rename(file.path,path.join(form.uploadDir,file.name),(err)=>{
            //     if(err){
            //         throw err;
            //         console.log('File renamed successfully');
            //     }
            // })
        });
        form.on('error',(err)=>{
            console.log(err);
        });
        form.on('end',()=>{
            console.log("file upload is successful")
        });
        form.parse(req);
    }
   }
}