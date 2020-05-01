module.exports=function(){
    return{
        SignUpValidation:(req,res,next,validator)=>{
            req.checkBody('username','Username is required').notEmpty();
            req.checkBody('username','Username is required').isLength({min:5});
            req.checkBody('email','Username is required').notEmpty();
            req.checkBody('email','Username is required').isEmail(); 
            req.checkBody('password','Password is required').notEmpty();
            req.checkBody('password','Password is required').isLength({min:8});
            req.getValidationResult().then((result)=>{
                const errors=result.array();
                const messages=[];
                errors.forEach((err)=>{
                    messages.push(error.msg)
                });
                req.flash('error',messages)
                res.redirect('/signup');
            })
            .catch((err)=>{
                return next();
            })
        }
    }
}

