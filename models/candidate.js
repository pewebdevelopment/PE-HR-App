const mongoose = require('mongoose')

const candidateSchema=mongoose.Schema({
    candidateId:{    
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
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
       
        ugCollege:{type:String},
        ugSpecialization:{type:String},
        ugFrom:{type:Number},
        ugTo:{type:Number},
        ugPercentage:{type:Number},
        sslcSchool:{type:String},
        sslcBoard:{type:String},
        sslcFrom:{type:Number},
        sslcTo:{type:Number},
        sslcPercentage:{type:Number},
        hseSchool:{type:String},
        hseBoard:{type:String},
        hseSpecialization:{type:String},
        hseFrom:{type:Number},
        hseTo:{type:Number},
        hsePercentage:{type:Number},
        skills:[{type:String}],
       
})
module.exports =mongoose.model('candidates', candidateSchema);
