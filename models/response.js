  
const mongoose = require('mongoose');

var responseSchema = mongoose.Schema({
    vacancyId:{
        type:String,
        required:true
    },
    candidateId:{
        type:String,
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