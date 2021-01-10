const express = require('express');  
const app = express();
const port = 8000; 
require('dotenv').config();


const db =require('./config/mongoose');


app.get('/',function(req,res){
    res.send("Hello-World");
})



app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`server is running on the port : ${port}`);
})
