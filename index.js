const http = require('http')
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

//server
http.createServer(app).listen(8000,()=>{
     console.log("running")
})
app.use(expressLayouts)
app.set('layout','./layout/page.ejs')
app.set('view engine','ejs')