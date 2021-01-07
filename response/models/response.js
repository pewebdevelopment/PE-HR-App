const mongoose = require('mongoose');

var responseSchema = mongoose.Schema({
    vacancyId:{
        type:String
    },
    candidateId:{
        type:String
    },
    whyHire:{
        type:String
    },
    projectsLinks:[{
        type:String
    }],
    githubId:{
        type:String
    },
    status:{
        type:String
    }
})

module.exports = mongoose.model('responses', responseSchema);