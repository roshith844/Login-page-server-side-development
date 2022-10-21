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
//navigation
app.get('/login',(req,res)=>{
     res.render('login')
 })
 app.get('/form-submit',(req,res)=>{
     if(req.query.email === 'a@a.com' && req.query.password=='a'){
          console.log("passed")
     }
    
 })

 //server
http.createServer(app).listen(8000,()=>{
     console.log("running")
})