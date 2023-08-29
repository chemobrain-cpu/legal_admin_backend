const mongoose = require("mongoose")
mongoose.connect(process.env.DB_STRING).then(() => {
    //console.log("connected to database")
})

const caseSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    caseOwner: {
        type: String,
    },

    subject: {
        type: String,
    },
    clientEmail: {
        type: String,
    },
    clientPhoneNumber: {
        type: String,

    },
    clientAddress: {
        type: String,
    },
    
    caseNumber:{
        type:String
    },
    caseSubject:{
        type:String
    },
    caseCategory:{
        type:String
    },
    caseMatter:{
        type:String
    },
    status:{
        type:String
    },
    attorney:{
        type:String
    },
    courtCaseNumber:{
        type:String
    },
    stage1:{
        type:String
    },
    stage2:{
        type:String
    },
    stage3:{
        type:String
    },
    progress:{
        type:String
    },
    chargingCourt:{
        type:String
    },
    nextCaseDate:{
        type:String
    },

    dateAdded:{
        type:String
    }
})




const adminSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
    },
    password: {
        type: String
    }
})


let Case = new mongoose.model("case", caseSchema)
let Admin = new mongoose.model("admin", adminSchema)

module.exports.Case = Case
module.exports.Admin = Admin