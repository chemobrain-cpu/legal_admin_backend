const express = require("express")
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")
const { generateAcessToken } = require('../utils/utils')
const { Admin, Case, Attorney } = require("../database/databaseConfig");
const { validationResult } = require("express-validator");


module.exports.getAdminFromJwt = async (req, res, next) => {
   try {
      let token = req.headers["header"]
      if (!token) {
         throw new Error("a token is needed ")
      }
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY)

      const admin = await Admin.findOne({ email: decodedToken.email })

      if (!admin) {
         //if user does not exist return 404 response
         return res.status(404).json({
            response: "admin has been deleted"
         })
      }

      return res.status(200).json({
         response: {
            admin: admin,
         }
      })

   } catch (error) {
      error.message = error.message || "an error occured try later"
      return next(error)
   }

}


module.exports.signup = async (req, res, next) => {
   try {
      //email verification
      let { password, email, secretKey } = req.body
      console.log(req.body)
      //checking for validation error
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
         let error = new Error("invalid user input")
         return next(error)
      }

      //check if the email already exist
      let adminExist = await Admin.findOne({ email: email })

      if (adminExist) {
         let error = new Error("admin is already registered")
         //setting up the status code to correctly redirect user on the front-end
         error.statusCode = 301
         return next(error)
      }


      //check for secretkey
      if (secretKey !== 'legal') {
         let error = new Error("secretKey mismatched")
         error.statusCode = 300
         return next(error)
      }


      //hence proceed to create models of admin and token
      let newAdmin = new Admin({
         _id: new mongoose.Types.ObjectId(),
         email: email,
         password: password,
      })

      let savedAdmin = await newAdmin.save()

      if (!savedAdmin) {
         //cannot save user
         let error = new Error("an error occured")
         return next(error)
      }

      let token = generateAcessToken(email)

      //at this point,return jwt token and expiry alongside the user credentials
      return res.status(200).json({
         response: {
            admin: savedAdmin,
            token: token,
            expiresIn: '500',
         }
      })


   } catch (error) {
      console.log(error)
      error.message = error.message || "an error occured try later"
      return next(error)
   }
}

//sign in user with different response pattern
module.exports.login = async (req, res, next) => {
   try {
      console.log(req.body)
      let { email, password } = req.body
      //checking for validation error
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
         let error = new Error("invalid user input")
         return next(error)
      }

      let adminExist = await Admin.findOne({ email: email })


      if (!adminExist) {
         return res.status(404).json({
            response: "admin is not yet registered"
         })
      }



      //check if password corresponds
      if (adminExist.password != password) {
         let error = new Error("Password does not match")
         return next(error)
      }

      let token = generateAcessToken(email)

      //at this point,return jwt token and expiry alongside the user credentials
      return res.status(200).json({
         response: {
            admin: adminExist,
            token: token,
            expiresIn: '500',
         }
      })


   } catch (error) {
      console.log(error)
      error.message = error.message || "an error occured try later"
      return next(error)

   }
}


module.exports.fetchCases = async (req, res, next) => {
   try {
      let cases = await Case.find()

      if (!cases) {
         let error = new Error("An error occured")
         return next(error)
      }

      console.log(cases)
      return res.status(200).json({
         response: {
            cases: cases
         }
      })
   } catch (error) {
      error.message = error.message || "an error occured try later"
      return next(error)

   }





}

module.exports.fetchCase = async (req, res, next) => {
   try {

      let caseId = req.params.id

      let case_ = await CaseOne.findOne({ _id: caseId })

      if (!case_) {
         let error = new Error("casenot found")
         return next(error)
      }
      return res.status(200).json({
         response: {
            case_
         }
      })
   } catch (error) {
      error.message = error.message || "an error occured try later"
      return next(error)

   }

}

module.exports.updateCase = async (req, res, next) => {

   try {
      let caseId = req.params.id

      let {
         caseOwner,
         subject,
         clientEmail,
         clientPhoneNumber,
         clientAddress,
         caseNumber,
         caseSubject,
         caseCategory,
         caseMatter,
         status,
         attorney,
         courtCaseNumber,
         stage1,
         stage2,
         stage3,
         progress,
         chargingCourt,
         nextCaseDate,
         dateAdded

      } = req.body

      let case_ = await Case.findOne({ _id: caseId })

      if (!case_) {
         let error = new Error("casenot found")
         return next(error)
      }

      //update case here
      case_.caseOwner = caseOwner || ''
      case_.subject = subject || ''
      case_.clientEmail = clientEmail || ''
      case_.clientPhoneNumber = clientPhoneNumber || ''
      case_.clientAddress = clientAddress || ''
      case_.caseNumber = caseNumber || ' '
      case_.caseSubject = caseSubject || ' '
      case_.caseCategory = caseCategory || ''
      case_.caseMatter = caseMatter || ' '
      case_.status = status || ' '
      case_.attorney = attorney || ' '
      case_.courtCaseNumber = courtCaseNumber || ' '
      case_.stage1 = stage1 || ' '
      case_.stage2 = stage2 || ' '
      case_.stage3 = stage3 || ' '
      case_.progress = progress || ''
      case_.chargingCourt = chargingCourt || ' '
      case_.nextCaseDate = nextCaseDate || ' '
      case_.dateAdded = dateAdded || ''


      let savedCase = await case_.save()

      if (!savedCase) {
         let error = new Error("an error occured on the server")
         return next(error)
      }


      return res.status(200).json({
         response: savedCase
      })
   } catch (error) {
      error.message = error.message || "an error occured try later"
      return next(error)
   }

}

module.exports.deleteCase = async (req, res, next) => {
   try {
      let caseId = req.params.id
      let case_ = await Case.deleteOne({ _id: caseId })
      if (!case_) {
         let error = new Error("an error occured")
         return next(error)
      }
      return res.status(200).json({
         response: {
            message: 'deleted successfully'
         }
      })
   } catch (error) {
      error.message = error.message || "an error occured try later"
      return next(error)

   }


}


//attorneys controller section

module.exports.fetchAttorneys = async (req, res, next) => {
   try {
      let Attorneys = await Attorney.find()

      if (!Attorneys) {
         let error = new Error("An error occured")
         return next(error)
      }

      return res.status(200).json({
         response: {
            attorneys: Attorneys
         }
      })

   } catch (error) {
      error.message = error.message || "an error occured try later"
      return next(error)

   }


}
module.exports.fetchAttorney = async (req, res, next)=> {
   try {

      let attorneyId = req.params.id

      let attorney_ = await Attorney.findOne({ _id: attorneyId })

      if (!attorney_) {
         let error = new Error("attorney not found")
         return next(error)
      }

      return res.status(200).json({
         response: {
            attorney_
         }
      })
   } catch (error) {
      error.message = error.message || "an error occured try later"
      return next(error)

   }
}


module.exports.updateAttorney = async (req, res, next) => {
   try {
      let attorneyId = req.params.id

      //fetching details from the request object
      let {
         nameOfAttorney,
         about,
         address,
         email,
         phone } = req.body

      let attorney_ = await Attorney.findOne({ _id: attorneyId })

      if (!attorney_) {
         let error = new Error("attorney not found")
         return next(error)
      }

      //update attorney

      attorney_.nameOfAttorney = nameOfAttorney || ''

      attorney_.about = about || ''

      attorney_.address= address || ''
      attorney_.email = email || ''

      attorney_.phone = phone || ''

      let savedAttorney_ = await attorney_.save()

      if (!savedAttorney_ ) {
         let error = new Error("an error occured on the server")
         return next(error)
      }

      return res.status(200).json({
         response: savedAttorney_ 
      })
   } catch (error) {
      error.message = error.message || "an error occured try later"
      return next(error)
   }
}


module.exports.deleteAttorney = async (req, res, next) => {
   try {
      let attorneyId = req.params.id

      let attorney_ = await Attorney.deleteOne({ _id: attorneyId })

      if (!attorney_) {
         let error = new Error("an error occured")
         return next(error)
      }
      return res.status(200).json({
         response: {
            message: 'deleted successfully'
         }
      })
   } catch (error) {
      error.message = error.message || "an error occured try later"
      return next(error)

   }


}


module.exports.newAttorney = async (req, res, next) => {
   try {
      let {
         nameOfAttorney,
         about,
         address,
         email,
         phone,
         photo } = req.body

      //creating new attorney
      let newAttorney_ = new Attorney({
         _id: new mongoose.Types.ObjectId(),
         nameOfAttorney,
         about,
         address,
         email,
         phone,
         photo,
      })

      let savedAttorney = await newAttorney_.save()


      if (!savedAttorney) {
         let error = new Error("an error occured")
         return next(error)
      }
      return res.status(200).json({
         response:savedAttorney
      })

   } catch (error) {
      error.message = error.message || "an error occured try later"
      return next(error)

   }


}



Attorney.find().then(data=>{
   console.log(data)
})