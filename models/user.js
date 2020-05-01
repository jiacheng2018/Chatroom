const mongoose=require('mongoose');
const bcrypt=require('bcrypt-nodejs');
const userSchema=mongoose.Schema({
  userName:{type:String,unique:true},
  fullName:{type:String,unique:true,default:''},
  email:{type:String,unique:true},
  passport:{type:String,unique:true,default:''},
  userImage:{type:String, default:'default.png'},
  facebook:{type:String,default:''},
  fbToken:Array,
  google:{type:String,unique:true},
  googleToken:Array
});
userSchema.methods.encryptPassword=function(password){
 return bcrypt.hashSync(password,bcrypt.genSaltSync(10),null);
}
userSchema.methods.validUserPassword=function(password){
   return bcrypt.compareSync(password,this.passpord);
}
module.exports=mongoose.model('User',userSchema);

