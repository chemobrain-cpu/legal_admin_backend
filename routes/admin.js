const express = require("express")
const router = express.Router()
const app = express()
const ejs = require("ejs")
const bodyParser = require("body-parser")
const path = require("path")
const fs = require("fs")
const { verifyAdmin} = require("../utils/utils")
const { body, validationResult, Result } = require('express-validator')


let login = require("../controller/admin").login
let signup = require("../controller/admin").signup



//case import
let fetchCase = require("../controller/admin").fetchCase

let fetchCases = require("../controller/admin").fetchCases

let updateCase = require('../controller/admin').updateCase

let deleteCase = require('../controller/admin').deleteCase

let getAdminFromJwt = require('../controller/admin').getAdminFromJwt

//attorney import
let fetchAttorney = require("../controller/admin").fetchAttorney

let fetchAttorneys = require("../controller/admin").fetchAttorneys

let updateAttorney = require('../controller/admin').updateAttorney

let deleteAttorney = require('../controller/admin').deleteAttorney

let newAttorney= require('../controller/admin').newAttorney



//blog import
let fetchBlog = require("../controller/admin").fetchBlog

let fetchBlogs = require("../controller/admin").fetchBlogs

let updateBlog = require('../controller/admin').updateBlog

let deleteBlog = require('../controller/admin').deleteBlog

let newBlog = require('../controller/admin').newBlog

//blog cases import

let fetchBlogCase = require("../controller/admin").fetchBlogCase

let fetchBlogCases = require("../controller/admin").fetchBlogCases

let updateBlogCase = require('../controller/admin').updateBlogCase

let deleteBlogCase = require('../controller/admin').deleteBlogCase

let newBlogCase = require('../controller/admin').newBlogCase




//auth route
router.get("/adminbytoken", getAdminFromJwt)
router.post("/adminlogin",
[
    body("email")
        .isEmail()
        .trim()
        .not()
        .isEmpty()
        .withMessage("email is required"),
    body("password")
        .trim()
        .not()
        .isEmpty()
        .withMessage("password is required"),
],login)
router.post('/adminsignup',signup)




//cases route
router.get('/auth/cases',verifyAdmin,fetchCases)
router.get('/auth/cases/:id',verifyAdmin,fetchCase)
router.patch('/auth/case/:id',verifyAdmin,updateCase)
router.delete('/auth/case/:id',verifyAdmin,deleteCase)


//attorney route
router.post('/auth/newattorney',verifyAdmin,newAttorney)
router.get('/auth/attorneys',verifyAdmin,fetchAttorneys)
router.get('/auth/attorneys/:id',verifyAdmin,fetchAttorney)
router.patch('/auth/attorney/:id',verifyAdmin,updateAttorney)
router.delete('/auth/attorney/:id',verifyAdmin,deleteAttorney)





//blog routes
router.post('/auth/newblog',verifyAdmin,newBlog)
router.get('/auth/blogs',verifyAdmin,fetchBlogs)
router.get('/auth/blogs/:id',verifyAdmin,fetchBlog)
router.patch('/auth/blog/:id',verifyAdmin,updateBlog)
router.delete('/auth/blog/:id',verifyAdmin,deleteBlog)


//defining the blog case route


router.post('/auth/newblogcase',verifyAdmin,newBlogCase)
router.get('/auth/blogcases',verifyAdmin,fetchBlogCases)
router.get('/auth/blogcases/:id',verifyAdmin,fetchBlogCase)
router.patch('/auth/blogcase/:id',verifyAdmin,updateBlogCase)
router.delete('/auth/blogcase/:id',verifyAdmin,deleteBlogCase)



exports.router = router