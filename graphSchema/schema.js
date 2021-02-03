const Response = require('../models/response');
const Vacancies = require('../models/vacancy');
const Candidates = require('../models/candidate');
const verifyToken = require("../verifyToken");
const config=require('../config/env');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const bcrypt =require('bcrypt')
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
const { json } = require('express');
const poolData = {    
  UserPoolId : config.UserPoolId, // Your user pool id here    
  ClientId : config.ClientId, // Your client id here
  }; 
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
const VacancyType = new GraphQLObjectType({
    name: 'Vacancy',
    description: 'This represents a Vacancy',
    fields: () => ({
      vacancyId:{ type: GraphQLNonNull(GraphQLID) },
      vacancyPost: { type: GraphQLNonNull(GraphQLString) },
      noOfOpenings: { type: GraphQLNonNull(GraphQLInt) },
      stipend: { type: GraphQLNonNull(GraphQLInt) },
      perks: { type: GraphQLNonNull(new GraphQLList(GraphQLString)) },
      duration: { type: GraphQLNonNull(GraphQLInt) },
      aboutPost: { type: GraphQLNonNull(GraphQLString) },
      skillsRequired: { type: GraphQLNonNull(new GraphQLList(GraphQLString)) },
      status: { type: GraphQLNonNull(GraphQLBoolean)},
    })
})

const CandidateType = new GraphQLObjectType({
  name: 'Candidate',
  description: 'This represents a Candidate',
  fields: () => ({
      candidateId:{ type: GraphQLNonNull(GraphQLID) },
      candidateName:{ type: GraphQLNonNull(GraphQLString) },
      email:{ type: GraphQLNonNull(GraphQLString) },
      phoneNo:{ type: GraphQLNonNull(GraphQLString) },
      address:{ type: GraphQLNonNull(GraphQLString) },
        ugCollege:{type:GraphQLString},
        ugSpecialization:{type:GraphQLString},
        ugFrom:{type:GraphQLInt},
        ugTo:{type:GraphQLInt},
        ugPercentage:{type:GraphQLFloat},
        sslcSchool:{type:GraphQLString},
        sslcBoard:{type:GraphQLString},
        sslcFrom:{type:GraphQLInt},
        sslcTo:{type:GraphQLInt},
        sslcPercentage:{type:GraphQLFloat},
        hseSchool:{type:GraphQLString},
        hseSpecialization:{type:GraphQLString},
        hseBoard:{type:GraphQLString},
        hseFrom:{type:GraphQLInt},
        hseTo:{type:GraphQLInt},
        hsePercentage:{type:GraphQLFloat},
        skills:{type:new GraphQLList(GraphQLString)},
  })
})
const ResponseType = new GraphQLObjectType({
  name: 'Response',
  description: 'Responses of Candidates',
  fields: () => ({
    responseId:{ type: GraphQLNonNull(GraphQLID) },
    vacancyId: { type: GraphQLNonNull(GraphQLString) },
    candidateId: { type:  GraphQLNonNull(GraphQLString) },
    projectsLinks: { type: new GraphQLList(GraphQLString) },
    githubId: { type: GraphQLNonNull(GraphQLString)},
    status: { type: GraphQLNonNull(GraphQLString)},
    candidateName: { type: GraphQLNonNull(GraphQLString)},
    candidatePhoneNo: { type: GraphQLNonNull(GraphQLString)},
    candidateEmail: { type: GraphQLNonNull(GraphQLString)},
    vacancyPost: { type: GraphQLNonNull(GraphQLString)}
  })
})
const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
     
      vacancies: {
        type: new GraphQLList(VacancyType),
        description: 'List of All Vacancies',
        resolve: () => Vacancies.find({},(err,docs)=>{
            if(docs!=undefined && docs.length>0)
                return docs;
            else
                return 'No Documents Fetched'
        })
      },
    
      candidates: {
        type: new GraphQLList(CandidateType),
        description: 'List of All Vacancies',
        resolve: () => Candidates.find({},(err,docs)=>{
            if(docs!=undefined&&docs.length>0)
                return docs;
            else
                return 'No Documents Fetched'
        })
      },
      candidateResponses: {
        type: new GraphQLList(ResponseType),
        description: 'All Responses of a Candidate',
        args: {
          candidateId: { type: GraphQLNonNull(GraphQLID )}
        },
        resolve: (parent, args) =>
        Response.find({candidateId:args.candidateId},(err,docs)=>{
          if(err){
            console.log(err)
          }
        })
      },
      vacancyResponses: {
        type:new GraphQLList(ResponseType),
        description: 'All Responses to a Vacancy',
        args: {
          vacancyId: { type: GraphQLNonNull(GraphQLID )}
        },
        resolve: (parent, args) =>
          Response.find({vacancyId:args.vacancyId},(err,docs)=>{
            if(err){
              console.log(err)
            }
            
        })
      
      },
      responses: {
        type: new GraphQLList(ResponseType),
        description: 'List of All Responses',
        resolve: () => Response.find({},(err,docs)=>{
          if(err){
            console.log(err)
          }
        })
      },
      users: {
        type:GraphQLString,
        description: 'users',
        args: {
          email: { type: GraphQLNonNull(GraphQLString)},
        },
        resolve:async (parent, args,req) =>{
          var user=await verifyToken(req.headers.authorization)
          if(user['custom:role']=='candidate'){
            console.log("hi")
          }
          else{
            console.log("Not Candidate")
          }
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
      },
      vacancy: {
        type: VacancyType,
        description: 'A Single Vacancy',
        args: {
          vacancyId: { type: GraphQLID }
        },
        resolve: (parent, args) =>
          Vacancies.findOne({_id:args.vacancyId},(err,docs)=>{
              return docs;
        })
      },
      candidate: {
        type:CandidateType,
        description: 'A Single Vacancy',
        args: {
          candidateId: { type: GraphQLID }
        },
        resolve: (parent, args) =>
          Candidates.findOne({_id:args.candidateId},(err,docs)=>{
            
              return docs;
        })
      },
     response: {
        type: ResponseType,
        description: 'A Single Response',
        args: {
          responseId: { type: GraphQLNonNull(GraphQLID )}
        },
        resolve: (parent, args) =>
          Response.findOne({_id:args.responseId},(err,docs)=>{
            if(err){
              console.log(err)
            }
        })
      },
      addVacancy: {
        type: VacancyType,
        description: 'Add a vacancy',
        args: {
            vacancyPost: { type: GraphQLNonNull(GraphQLString) },
            noOfOpenings: { type: GraphQLNonNull(GraphQLInt) },
            stipend: { type: GraphQLNonNull(GraphQLInt) },
            perks: { type: GraphQLNonNull(new GraphQLList(GraphQLString)) },
            duration: { type: GraphQLNonNull(GraphQLInt) },
            aboutPost: { type: GraphQLNonNull(GraphQLString) },
            skillsRequired: { type: GraphQLNonNull(new GraphQLList(GraphQLString)) },
            status: { type: GraphQLNonNull(GraphQLBoolean) },
        },
        resolve: (parent, args) => {
            Vacancies.find({vacancyPost:args.vacancyPost},(err,docs)=>{
              if(docs!=undefined && docs.length==0){
                var newVacancy=new Vacancies({vacancyPost:args.vacancyPost,noOfOpenings:args.noOfOpenings,stipend:args.stipend,perks:args.perks,
                    duration:args.duration,aboutPost:args.aboutPost,skillsRequired:args.skillsRequired,
                    status:args.status
                })
                newVacancy.vacancyId=newVacancy._id 
                newVacancy.save();
                return newVacancy
              }
            })
        }
      },
      vacancyUpdate:{
        type:VacancyType,
        description:'Update a Vacancy',
        args:{
            vacancyId:{type:GraphQLNonNull(GraphQLID)},
            vacancyPost: { type: GraphQLNonNull(GraphQLString) },
            noOfOpenings: { type: GraphQLNonNull(GraphQLInt) },
            stipend: { type: GraphQLNonNull(GraphQLInt) },
            perks: { type: GraphQLNonNull(new GraphQLList(GraphQLString)) },
            duration: { type: GraphQLNonNull(GraphQLInt) },
            aboutPost: { type: GraphQLNonNull(GraphQLString) },
            skillsRequired: { type: GraphQLNonNull(new GraphQLList(GraphQLString)) },
            status: { type: GraphQLNonNull(GraphQLBoolean) },
        },
        resolve: (parent, args) => {
            const vacancy = {vacancyPost:args.vacancyPost,noOfOpenings:args.noOfOpenings,stipend:args.stipend,perks:args.perks,
              duration:args.duration,aboutPost:args.aboutPost,skillsRequired:args.skillsRequired,
              status:args.status
            }
            Vacancies.updateOne({_id:args.vacancyId},{$set:vacancy},(err,docs)=>{
              if(docs!=undefined && docs.length>0)
                  return docs;
              else
                  return 'No Documents Updated'
          })
            
          }     
      },
      vacancyDelete:{
        type:VacancyType,
        description:'Delete a Vacancy',
        args:{
          vacancyId:{type:GraphQLNonNull(GraphQLID)},
        },
        resolve: (parent, args) => {
          Vacancies.deleteOne({_id:args.vacancyId},(err,docs)=>{
            return docs;
          })
        }
      },
      addCandidate: {
        type: CandidateType,
        description: 'Add an candidate',
        args: {
          candidateName:{ type: GraphQLNonNull(GraphQLString) },
          email:{ type: GraphQLNonNull(GraphQLString) },
          phoneNo:{ type: GraphQLNonNull(GraphQLString) },
          address:{ type: GraphQLNonNull(GraphQLString) },
          hseSchool:{ type: GraphQLNonNull(GraphQLString) },
          hseBoard:{ type: GraphQLNonNull(GraphQLString) },
          hseSpecialization:{ type: GraphQLNonNull(GraphQLString) },
          hseFrom:{ type: GraphQLNonNull(GraphQLInt) },
          hseTo:{ type: GraphQLNonNull(GraphQLInt) },
          hsePercentage:{ type: GraphQLNonNull(GraphQLFloat)},
          sslcSchool:{ type: GraphQLNonNull(GraphQLString) },
          sslcBoard:{ type: GraphQLNonNull(GraphQLString) },
          sslcFrom:{ type: GraphQLNonNull(GraphQLInt) },
          sslcTo:{ type: GraphQLNonNull(GraphQLInt) },
          sslcPercentage:{ type: GraphQLNonNull(GraphQLFloat)},
          ugCollege:{ type: GraphQLNonNull(GraphQLString) },
          ugSpecialization:{ type: GraphQLNonNull(GraphQLString) },
          ugFrom:{ type: GraphQLNonNull(GraphQLInt) },
          ugTo:{ type: GraphQLNonNull(GraphQLInt) },
          ugPercentage:{ type: GraphQLNonNull(GraphQLFloat)},
          skills:{ type: GraphQLNonNull( new GraphQLList(GraphQLString))},
        },
        resolve: (parent, args) => {
          Candidates.find({email:args.email},(err,docs)=>{
            if(docs!=undefined && docs.length==0){
              var newCandidate=new Candidates({candidateName:args.candidateName,email:args.email,phoneNo:args.phoneNo,address:args.address,
                hseSchool:args.hseSchool,hseBoard:args.hseBoard,hseSpecialization:args.hseSpecialization,hseFrom:args.hseFrom,hseTo:args.hseTo,hsePercentage:args.hsePercentage,
                sslcSchool:args.sslcSchool,sslcBoard:args.sslcBoard,sslcFrom:args.sslcFrom,sslcTo:args.sslcTo,sslcPercentage:args.sslcPercentage,ugCollege:args.ugCollege,ugSpecialization:args.ugSpecialization,
                ugFrom:args.ugFrom,ugTo:args.ugTo,ugPercentage:args.ugPercentage,skills:args.skills
              })
              newCandidate.candidateId=newCandidate._id
              newCandidate.save({},(err,docs)=>{
                console.log(err)
              });
            }
          })
        }
      },
      deleteCandidate:{
        type:CandidateType,
        description:'Delete a Candidate',
        args:{
          candidateId:{type:GraphQLNonNull(GraphQLID)},
          
        },
        resolve: (parent, args) => {
          Candidates.deleteOne({_id:args.candidateId},(err,docs)=>{
            return docs;
          })
        }
      },
      updateCandidate: {
        type: CandidateType,
        description: 'Update a candidate',
        args: {
          candidateId:{type:GraphQLNonNull(GraphQLID)},
          candidateName:{ type: GraphQLNonNull(GraphQLString) },
          email:{ type: GraphQLNonNull(GraphQLString) },
          phoneNo:{ type: GraphQLNonNull(GraphQLString) },
          address:{ type: GraphQLNonNull(GraphQLString) },
          hseSchool:{ type: GraphQLNonNull(GraphQLString) },
          hseBoard:{ type: GraphQLNonNull(GraphQLString) },
          hseSpecialization:{ type: GraphQLNonNull(GraphQLString) },
          hseFrom:{ type: GraphQLNonNull(GraphQLInt) },
          hseTo:{ type: GraphQLNonNull(GraphQLInt) },
          hsePercentage:{ type: GraphQLNonNull(GraphQLFloat)},
          sslcSchool:{ type: GraphQLNonNull(GraphQLString) },
          sslcBoard:{ type: GraphQLNonNull(GraphQLString) },
          sslcFrom:{ type: GraphQLNonNull(GraphQLInt) },
          sslcTo:{ type: GraphQLNonNull(GraphQLInt) },
          sslcPercentage:{ type: GraphQLNonNull(GraphQLFloat)},
          ugCollege:{ type: GraphQLNonNull(GraphQLString) },
          ugSpecialization:{ type: GraphQLNonNull(GraphQLString) },
          ugFrom:{ type: GraphQLNonNull(GraphQLInt) },
          ugTo:{ type: GraphQLNonNull(GraphQLInt) },
          ugPercentage:{ type: GraphQLNonNull(GraphQLFloat)},
          skills:{ type: GraphQLNonNull( new GraphQLList(GraphQLString))},
        },
        resolve: (parent, args) => {
          Candidates.updateOne({_id:args.candidateId},{candidateName:args.candidateName,email:args.email,phoneNo:args.phoneNo,address:args.address,
            hseSchool:args.hseSchool,hseBoard:args.hseBoard,hseSpecialization:args.hseSpecialization,hseFrom:args.hseFrom,hseTo:args.hseTo,hsePercentage:args.hsePercentage,
            sslcSchool:args.sslcSchool,sslcBoard:args.sslcBoard,sslcFrom:args.sslcFrom,sslcTo:args.sslcTo,sslcPercentage:args.sslcPercentage,ugCollege:args.ugCollege,ugSpecialization:args.ugSpecialization,
            ugFrom:args.ugFrom,ugTo:args.ugTo,ugPercentage:args.ugPercentage,skills:args.skills
          },(err,docs)=>{
            console.log(err,docs)
          })
        }
      }, 
      addResponse: {
        type: ResponseType,
        description: 'Add a vacancy',
        args: {
          vacancyId: { type: GraphQLNonNull(GraphQLID) },
          candidateId: { type:  GraphQLNonNull(GraphQLID) },
          projectsLinks: { type: new GraphQLList(GraphQLString) },
          githubId: { type: GraphQLNonNull(GraphQLString)},
        },
        resolve: (parent, args) => {
            try{
                var newResponse=new Response({
                  vacancyId:args.vacancyId,
                  candidateId:args.candidateId,
                  projectsLinks:args.projectsLinks,
                  githubId:args.githubId,
                })
                Response.find({candidateId:args.candidateId,vacancyId:args.vacancyId},async (err,docs)=>{
                  if(docs!=undefined&&docs.length==0){
                    Vacancies.findOne({vacancyId:args.vacancyId}, (err,docs1)=>{
                      if(docs1){
                        Candidates.findOne({candidateId:args.candidateId},(err,docs2)=>{
                          if(docs2){
                            console.log(docs1)
                            console.log(docs2)
                            newResponse.responseId=newResponse._id
                            newResponse.status='Pending'
                            newResponse.vacancyPost=docs1.vacancyPost
                            newResponse.candidateName=docs2.candidateName
                            newResponse.candidatePhoneNo=docs2.phoneNo
                            newResponse.candidateEmail=docs2.email
                            newResponse.save();
                            return newResponse
                          }
                        })
                      }
                    })
                  }
                })   
            }catch(e){
              console.log(e)
            }
        }
      },
      responseUpdate:{
        type:ResponseType,
        description:'Response Update',
        args:{
          responseId:{type: GraphQLNonNull(GraphQLID)},
          projectsLinks: { type: new GraphQLList(GraphQLString) },
          githubId: { type: GraphQLNonNull(GraphQLString)},
        },
        resolve: (parent, args) => {
            const updateResponse = {
                  projectsLinks:args.projectsLinks,
                  githubId:args.githubId,
            }
            Response.updateOne({_id:args.responseId},{$set:updateResponse},(err,docs)=>{
              if(docs!=undefined && docs.length>0)
                  return docs;
              else
                  return 'No Documents Updated'
          })
            
          }     
      },
      responseDelete:{
        type:ResponseType,
        description:'Delete a Response',
        args:{
          responseId:{type:GraphQLNonNull(GraphQLID)},
        },
        resolve: (parent, args) => {
          Response.deleteOne({_id:args.responseId},(err,docs)=>{
            return docs;
          })
        }
      },
     candidateResponses:{
        type:new GraphQLList(ResponseType),
        args:{
          candidateId:{type:GraphQLNonNull(GraphQLID)}
        },
        resolve:(parent,args)=>
          Response.find({candidateId:args.candidateId})
      },
      vacancyResponses:{
        type:new GraphQLList(ResponseType),
        args:{
          vacancyId:{type:GraphQLNonNull(GraphQLID)}
        },
        resolve:(parent,args)=>
          Response.find({vacancyId:args.vacancyId})
      }
    })
  })

 module.exports = new GraphQLSchema({
    query:RootQueryType,
    mutation: RootMutationType
  })
