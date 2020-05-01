module.exports=function(){
   return{
    SetRouting:function(router){
        router.get('/home',this.getHome);
    },
    getHome:function(req,res){
        return res.render('home');
    }
   }
}