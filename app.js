
require('dotenv').config()
const app = require('express')();
const express = require('express')
const path = require("path")
require('dotenv').config()
const fs = require("fs")
const User = require("./database/databaseConfig").User
const session = require("express-session");
const mongoose = require("mongoose")
app.use(express.static("public"));
app.use("/",express.static("public"));
const cors = require("cors")
const bodyParser = require("body-parser")
const multer = require("multer")
app.use(bodyParser.json())
const { body, validationResult } = require('express-validator')
const compression = require('compression')
const { Server } = require('socket.io')
let server = require('http').createServer(app)
const axios = require('axios')


let io = new Server(server, {
  cors: {
    origin: "*",
    methods: ['GET', 'POST', 'PATCH','DELETE','UPDATE'],
  }
})


//setting express to use  the session


app.use(cors())
app.use(bodyParser.json())

const adminRoutes = require("./routes/admin")

//using the routes
app.use(adminRoutes.router)

app.get('/users',(req,res)=>{  
    console.log('testing')

    res.status(200).json({
        message:'ok'
    })

})




app.listen(process.env.PORT||9090,(err)=>{
   
    console.log("sucessfully")
})