 const http = require('http')
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session')
const cookieParser = require('cookie-parser')

//initialises npm modules
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
     userName: 'pass',
    password: 123
}
app.use(session({
     secret: 'pass',
     saveUninitialized: true,
    cookie: { maxAge: 60000 },
    resave: false

}))

// cache

app.use((req, res, next) => {
     res.set(
         "Cache-Control",
         "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
     );
     next()
 })
//navigation
app.get('/', (req,res)=>{
     if(req.session.user){
          res.render('home')
     }else{
          res.render('login')
     }
})
app.post('/form-submit',(req,res)=>{
     if(req.body.user === user.userName && req.body.password == user.password){
          req.session.user = req.body.user
          console.log('Logged In')
          res.render('home')
     }else{
          res.redirect('./')
     }

})
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