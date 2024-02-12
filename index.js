const express = require('express')
const path = require('path')
const {logEvents, logger} = require('./middlware/logger.js')
const errorHandler = require('./middlware/errorHandler.js')
const cp = require('cookie-parser')
require('dotenv').config()


const app = express()

// user defined middleware
// it will work for every requests, here logger used as a refrence
app.use(logger)



// receives and parse the data into json format
app.use(express.json())

// using cookie-parser here
app.use(cp())


// finding static file in public folder 
// express.static means in and out of static files
// express.static is middleware
app.use('/',express.static(path.join(__dirname, '/public')))



// router we are getting from ./routes/root.js
// we can simply takes this above one then write simply router here
// here the /api or /something is starting point for all routes of router
// we can use it without any / or /api, as here router is middleware
app.use('/', require('./routes/root.js'))



// '*' means universal all
// routes which are no mentioned above handled here
// setting up status as 404 for error (page not found or not exists)
// sending res according to req accepts like json, html, simple txt
// in html -> simply sending file
// in json -> sending text in json form
// in txt -> sending simple line
app.all('*', (req, res)=>{
    res.status(404)
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    }else if(req.accepts('json')){
        res.json({"message":"404! not found"})
    }else{
        res.type('txt').send('404! not found')
    }
})


// error handler comes at last
// errorHandler used as refrence
app.use(errorHandler)




// listening the server
const PORT = 3000 || process.env.PORT
app.listen(PORT, ()=>{
    console.log(`server listen at port: ${PORT}`)
})