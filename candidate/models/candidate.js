const mongoose = require('mongoose')

const candidateSchema=mongoose.Schema({
        candidateName:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        phoneNo:{
            type:String,
            required:true
        },
        address:{
            type:String,
            required:true
        },
       
})
module.exports =mongoose.model('candidates', candidateSchema);