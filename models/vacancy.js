const mongoose = require('mongoose');

var vacanciesSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    vacancyId:{  
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    vacancyPost:{
        type:String,
        required:true
    },
    noOfOpenings:{
        type:Number,
        required:true
    },
    stipend:{
        type:Number,
        required:true
    },
    perks:[{
        type:String,
        required:true
    }],
    duration:{
        type:Number,
        required:true
    },
    
    aboutPost:{
        type:String,
        required:true
    },
    skillsRequired:[{
        type:String,
        required:true
    }],
    
    status:{
        type:Boolean,
        required:true
    },
   
})

module.exports = mongoose.model('vacancies', vacanciesSchema);