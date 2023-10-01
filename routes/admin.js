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


let fetchCase = require("../controller/admin").fetchCase

let fetchCases = require("../controller/admin").fetchCases

let updateCase = require('../controller/admin').updateCase

let deleteCase = require('../controller/admin').deleteCase

let getAdminFromJwt = require('../controller/admin').getAdminFromJwt


let fetchAttorney = require("../controller/admin").fetchAttorney

let fetchAttorneys = require("../controller/admin").fetchAttorneys

let updateAttorney = require('../controller/admin').updateAttorney

let deleteAttorney = require('../controller/admin').deleteAttorney

let newAttorney = require('../controller/admin').newAttorney


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



exports.router = router