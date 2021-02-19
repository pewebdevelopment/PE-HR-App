  
const mongoose = require('mongoose');

var responseSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    responseId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    vacancyId:{
        type: mongoose.Schema.Types.ObjectId, ref: 'vacancy',
        required:true
    },
    candidateId:{
        type: mongoose.Schema.Types.ObjectId, ref: 'candidate',
        required:true
    },

    projectsLinks:[{
        type:String
    }],
    githubId:{
        type:String,
    },
    status:{
        type:String
    },
    vacancyPost:{
        type:String,
        required:true
    },
    candidateName:{
        type:String,
        required:true
    },
    candidatePhoneNo:{
        type:String,
        required:true
    },
    candidateEmail:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    comment:{
        type:String,
        required:true
    },
    roundsAnswers:[
        [{
            type:String,
            required:true
        }]
    ]
  
})

module.exports = mongoose.model('responses', responseSchema);
