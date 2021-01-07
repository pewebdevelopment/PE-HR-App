
const express =require('express');
const app=express();
const mongoconnect = require("./mongoconnect/mongoconnect")
mongoconnect()


//Import Schema
const schema = require('./schema/response');

const expressGraphQL=require('express-graphql').graphqlHTTP;



app.use('/graphql', expressGraphQL({
    schema,
    graphiql:true,
  })).listen(5000,()=>{console.log("Server is Running")});