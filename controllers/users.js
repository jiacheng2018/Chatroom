module.exports=function(_,passport,validator){
   return{
    SetRouting:function(router){
        router.get('/',this.indexPage);
        router.get('/signup',this.getsignup);
        router.post('/signup',[
            validator.check('username').not().isEmpty().isLength({min:5}).withMessage('Username is required'),
            validator.check('email').not().isEmpty().isEmail().withMessage('Email is required'),
            validator.check('password').not().isEmpty().withMessage('password is required')
        ],this.postValidation,this.postSignup);
        router.get('/auth/facebook',this.getFacebookLogin);
        router.get('/auth/facebook/callback',this.FacebookLogin)
    },
    indexPage:function(req,res){
        return res.render('index',{test:"This is a test"})
    },
    getGoogleLogin:passport.authenticate('google',{
        scope:['https://www.googleapis.com/auth/plus.login',
               'https://www.googleapis.com/auth/plus.profile.emails.read']
    }),
    getFacebookLogin:passport.authenticate('facebook',{
        scope:'email'
    }),
    FacebookLogin:passport.authenticate('facebook',{
        successRedirect:'/home',
        failureRedirect:'/signup',
        failureFlash:true
    }),
    postValidation:function(req,res,next){
         const err=validator.validationResult(req);
         const  errors=err.array();
                const messages=[];
                errors.forEach((item)=>{
                    messages.push(item.msg)
                });
                req.flash('error',messages)
                return next();
    },
    getsignup:function(req,res){
        const error=req.flash('error');
        return res.render('signup',{title:'Login',messages:error,hasErrors:error.length>0})
    },
    postSignup:passport.authenticate('local.signup',{
        successRedirect:'/home',
        failureRedirect:'/signup',
        failureFlash:true
    })
   }
}