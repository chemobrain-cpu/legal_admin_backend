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

let getAdminFromJwt = require('../controller/admin').getAdminFromJwt

let deleteCase = require('../controller/admin').deleteCase


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



router.get('/auth/cases',verifyAdmin,fetchCases)

router.get('/auth/cases/:id',verifyAdmin,fetchCase)

router.patch('/auth/case/:id',verifyAdmin,updateCase)

router.delete('/auth/case/:id',verifyAdmin,deleteCase)


exports.router = router