const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require('aws-sdk');
const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
const {rudOnVacancy,createOnVacancy,rudOnResponse,createOnResponse,rudOnCandidate,createOnCandidate}=require('./permission')
global.fetch = require('node-fetch');
const express =require('express');
const bcrypt=require('bcrypt')
const app=express();
const mongoconnect = require("./mongoconnect/mongoconnect")
mongoconnect()
const user = require('./models/user');
const expressGraphQL=require('express-graphql').graphqlHTTP;
const {GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLID,
    GraphQLInputObjectType,
    GraphQLFloat
}=require('graphql');


const poolData = {    
    UserPoolId : "us-east-2_gbGsTviN1", // Your user pool id here    
    ClientId : "5mancm4soeolgeii6aa01p6lm4", // Your client id here
    }; 
const pool_region = 'us-east-2';
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

function registerUser(email,password){
    var attributeList = [];
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"email",Value:email}));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"custom:role",Value:'candidate'}));
    userPool.signUp(email, password, attributeList, null, function(err, result){
        if (err) {
            console.log(err);
            return;
        }
        cognitoUser = result.user;
        console.log('user name is ' + cognitoUser.get);
    });
}


 

function login(email,password) {
    var newRes=new Array();
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username : email,
        Password : password,
    });

    var userData = {
        Username : email,
        Pool : userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            user.updateOne({email:email},{accessToken:result.getAccessToken().getJwtToken(),idToken:result.getIdToken().getJwtToken(),refreshToken:result.getRefreshToken().getToken()})
        },
        onFailure: function(err) {
            console.log(err);
        },
        
    });
    return newRes;
}

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        signUp: {
            type:GraphQLString,
            description: 'Signup',
            args: {
              email: { type: GraphQLNonNull(GraphQLString )},
              
            },
            resolve:async (parent, args) =>{
              
            }
          },
    })
})

const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
        signUp: {
            type:GraphQLString,
            description: 'Signup',
            args: {
              email: { type: GraphQLNonNull(GraphQLString )},
              password:{type: GraphQLNonNull(GraphQLString )},
              userName:{type: GraphQLNonNull(GraphQLString )},
              permission:{type: GraphQLNonNull(GraphQLString )},
            },
            resolve:async (parent, args) =>{
             return new Promise((resolve,reject)=>{
                user.findOne({email:args.email},async (err,docs)=>{
                  if(!docs){
                    var attributeList = [];
                    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"email",Value:args.email}));
                    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"custom:role",Value:args.permission}));
                    userPool.signUp(args.email, args.password, attributeList, null,async function(err, result){
                    if (err) {
                        console.log(err);
                        reject(err)
                    }
                    try{
                       const passwordHash=await bcrypt.hashSync(args.password,10);
                       var newUser=new user({  
                           email:args.email,
                           password:passwordHash,
                           userName:args.userName,
                           permission:args.permission
                       })
                       newUser.userId=newUser._id;
                       await newUser.save();
                       resolve('user created');
                    }catch(err){
                       console.log(err);
                    }
                      
                    
                    cognitoUser = result.user;
                
                    })
                 }
                 else{
                    reject('Email exists');
                 }

                })   
            })
          }
        },
          signIn:{
              type:GraphQLString,
              description:"SignIn",
              args:{
                  email:  { type: GraphQLNonNull(GraphQLString )},
                  password:{ type: GraphQLNonNull(GraphQLString )},
              },
              resolve:(parent,args)=>{
                var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
                    Username : args.email,
                    Password : args.password,
                });
                var userData = {
                    Username : args.email,
                    Pool : userPool
                };
                var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
                return new Promise((resolve, reject) => (
                    cognitoUser.authenticateUser(authenticationDetails, {
                     onSuccess: (result) => resolve(JSON.stringify({accessToken:result.getAccessToken().getJwtToken(),idToken:result.getIdToken().getJwtToken(),refreshToken:result.getRefreshToken().getToken()})),
                     onFailure: (err) => reject(err),
                    })
                ));
              }
          }
    })
})

const schema = new GraphQLSchema({
    query:RootQueryType,
    mutation: RootMutationType

  })
  app.use('/graphql', expressGraphQL({
    schema:schema,
    graphiql:true,
    
  }))
   .listen(5000,()=>{console.log("Server is Running")});




//RegisterUser("stephcuriejulie33@gmail.com","stephenRaj22@");
//login("stephcuriejulie33@gmail.com","stephenRaJ22#");
