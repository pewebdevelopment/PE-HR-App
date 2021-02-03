const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require('aws-sdk');
global.fetch = require('node-fetch');
const express = require('express');
const app = express();
const mongoconnect = require("./mongoconnect/mongoconnect")
mongoconnect()
const schema = require('./graphSchema/schema');
const cors = require('cors');
const {graphqlHTTP} = require('express-graphql');
const config = require('./config/env')


app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema:schema,
    graphiql:true,
}))

app.listen(process.env.PORT || config.PORT ,()=>{console.log("Server is Running")});