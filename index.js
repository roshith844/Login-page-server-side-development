 const http = require('http')
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
//initialises npm modules
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// cache
app.use((req, res, next) => {
     res.set('Cache-Control', 'no-store')
     next()
   })

app.use(cookieParser())
app.use(session(
     {
          resave: true,
          saveUninitialized: true,
          secret: 'secret'
     }
))
app.use(expressLayouts)
app.set('layout','./layouts/page.ejs')
app.set('view engine','ejs')

//predefined email and password
const user = {
     userName: 'pass@mail.com',
    password: 123
}
app.use(session({
     secret: 'pass@mail.com',
     saveUninitialized: true,
    cookie: { maxAge: 60000 },
    resave: false

}))


//navigation
//new code
app.get('/login', (req,res)=>{
       res.render('login')
})
app.get('/logout', (req, res) => {
     req.session.destroy((error)=>{
         if(error){
             console.log(error);
         }else{
             console.log('logout successfully');
             res.redirect('/login');
         }
 
     })
 })

 app.get('/', (req,res)=>{
     if(req.session.user){
          res.render('home')
     }else{
          res.redirect('/login')
     }
})
app.post('/form-submit',(req,res)=>{
     if(req.body.email === user.userName && req.body.password == user.password){
          req.session.user = req.body.email
          console.log('Logged In')
          res.render('home')
     }else{
          res.render('login',{layout : './layouts/invalid.ejs'})
     }

})
//new code ends
// app.get('/login',(req,res)=>{
//      res.render('login')
//  })
//  app.get('/form-submit',(req,res)=>{
//      if(req.query.email === 'a@a.com' && req.query.password=='a'){
//           console.log("passed")
//      }
    
//  })


 //server
http.createServer(app).listen(8000,()=>{
     console.log("running")
})