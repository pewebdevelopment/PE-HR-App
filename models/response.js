  
const mongoose = require('mongoose');

var responseSchema = mongoose.Schema({
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
    assessmentAns:[{
        type:String
    }],
    projectsLinks:[{
        type:String
    }],
    githubId:{
        type:String,
    },
    status:{
        type:String
    }
})

module.exports = mongoose.model('responses', responseSchema);