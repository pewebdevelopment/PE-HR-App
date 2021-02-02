const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require('aws-sdk');
const {rudOnVacancy,createOnVacancy,rudOnResponse,createOnResponse,rudOnCandidate,createOnCandidate}=require('./permission')
global.fetch = require('node-fetch');
const express =require('express');
const bcrypt=require('bcrypt')
const app=express();
const mongoconnect = require("./mongoconnect/mongoconnect")
mongoconnect()
const user = require('./models/user');
const config = require("./config/env");
const verifyToken = require("./verifyToken");
const expressGraphQL=require('express-graphql').graphqlHTTP;
const {applyMiddleware}=require('graphql-middleware')
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
    UserPoolId : config.UserPoolId, // Your user pool id here    
    ClientId : config.ClientId, // Your client id here
    }; 
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        users: {
            type:GraphQLString,
            description: 'users',
            args: {
              email: { type: GraphQLNonNull(GraphQLString)},
            },
            resolve:async (parent, args,req) =>{
              var user=await verifyToken(req.headers.authorization)
              console.log(user)
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
              resolve:(parent,args,req)=>{
                var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
                    Username : args.email,
                    Password : args.password,
                });
                var userData = {
                    Username : args.email,
                    Pool : userPool
                };
                console.log(req.headers)
                
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
const schemaWithMiddleware = applyMiddleware(schema,verifyToken);

app.use('/graphql', expressGraphQL({
    schema:schema,
    graphiql:true,
    
}))
   .listen(5000,()=>{console.log("Server is Running")});




//RegisterUser("stephcuriejulie33@gmail.com","stephenRaj22@");
//login("stephcuriejulie33@gmail.com","stephenRaJ22#");
