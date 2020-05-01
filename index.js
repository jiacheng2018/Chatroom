const express=require('express');
const bodyParser=require('body-parser');
const ejs=require('ejs');
const http=require('http');
const container=require('./container');
const cookieParser=require('cookie-parser');
const validator=require('express-validator');
const session=require('express-session');
const MongoStore=require('connect-mongo')(session);
const mongoose=require('mongoose');
const flash=require('flash');
const passport=require('passport');
container.resolve(function(users,_,admin,home){
  mongoose.Promise=global.Promise;
  mongoose.connect('mongodb://localhost/footer',{useNewUrlParser:true});
  const app=setUpExpress();
  function setUpExpress(){
      const app=express();
      const server=http.createServer(app);
      server.listen(3000,()=>{
        console.log("Listening on Port")
      });
      ConfigureExpress(app);
      const router=require('express-promise-router')();
      users.SetRouting(router);
      admin.SetRouting(router);
      home.SetRouting(router);
      app.use(router);
  }
  function ConfigureExpress(app){
      require('./passport/passport-local');
      require('./passport/passport-facebook');
      app.use(express.static('public'));
      app.set('view engine','ejs');
      // app.use(validator());
      app.use(cookieParser());
      app.use(session({
          secret:'thisisasecretkey',
          resave:true,
          saveInitialized:true,
          store:new MongoStore({mongooseConnection:mongoose.connection})
      }))
      app.use(bodyParser.json()); 
      app.use(bodyParser.urlencoded({extended:true}));
      app.use(flash());
      app.use(passport.initialize());
      app.use(passport.session());
      app.locals._=_;

  }
})



