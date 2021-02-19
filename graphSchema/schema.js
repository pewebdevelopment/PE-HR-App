const Response = require('../models/response');
const Vacancies = require('../models/vacancy');
const Candidates = require('../models/candidate');
const user = require('../models/user');
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
      rounds : {type : GraphQLNonNull(new GraphQLList(GraphQLNonNull(new GraphQLList(GraphQLString))))}
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
    vacancyPost: { type: GraphQLNonNull(GraphQLString)},
    roundsAnswers : {type : GraphQLNonNull(new GraphQLList(GraphQLNonNull(new GraphQLList(GraphQLString))))}

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
                console.log(docs);
            else
                return 'No Documents Fetched'
        })
      },
      getUsername:{
        type: GraphQLString,
        desctription : 'Name of user logged in',
        resolve: () => cognitoUser.getUserAttributes((err, result) => {
          if (err) {
            alert(err.message || JSON.stringify(err));
            return;
          }
          return result.getName();
      
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
      
      users: {
        type:GraphQLString,
        description: 'users',
        args: {
          email: { type: GraphQLNonNull(GraphQLString)},
        },
        resolve:async (parent, args,req) =>{
          var user=await verifyToken(req.headers.authorization)
          if(user['custom:permission']=='candidate'){
            console.log(user)
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
      vacancies: {
        type: new GraphQLList(VacancyType),
        description: 'List of All Vacancies ',
        args:{
        },
        resolve: (parent,args,req) => {
          new Promise((resolve,reject)=>{
            if(req.user!=null&&req.user.permission=='admin')
              resolve(Vacancies.find({userId:req.user.userId}))
            else if(req.user!=null&&req.user.permission=='candidate'){
              resolve(Vacancies.find({userId:req.user.userId}))
            }
            else{
              resolve("Invalid Access")
            }
          })
        }
      },
      responses:{
        type:new GraphQLList(ResponseType),
        args:{
        },
        resolve:async (parent,args,req)=>{
        return new Promise((resolve,reject)=>{
          if(req.user!=null&&req.user.permission=='candidate'){
            resolve(Response.find({userId:req.user.userId}))
          }
          else if(req.user!=null&&req.user.permission=='admin'){
            Vacancies.find({userId:req.user.userId},async (err,docs)=>{
              if(docs.length>0){
                var vacIds=[];
                for(i=0;i<docs.length;i++){
                  vacIds.push(docs[i].vacancyId)
                }
                //console.log(vacIds)
               resolve(Response.find({vacancyId:{$in:vacIds}}))
              }
            })
          }
          else {
            resolve("Invalid access")
          }
        })
          
        }
      },
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
                attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"custom:permission",Value:args.permission}));
                userPool.signUp(args.email, args.password, attributeList, null,async function(err, result){
                if (err) {
                    console.log(err);
                    reject(err)
                }
                else{
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
                }
                })
             }
             else{
                resolve('Email exists');
             }

            })   
        })
      }
    },
    signIn:{
          type:GraphQLList (GraphQLString),
          description:"SignIn",
          args:{
              email:  { type: GraphQLNonNull(GraphQLString )},
              password:{ type: GraphQLNonNull(GraphQLString )},
          },
          resolve:async (parent,args,req)=>{
            

            var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
                Username : args.email,
                Password : args.password,
            });
            var userData = {
                Username : args.email,
                Pool : userPool
            };  
            
            var st = await user.findOne({email:args.email});

            var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
            return new Promise((resolve, reject) => (
                cognitoUser.authenticateUser(authenticationDetails, {


                 onSuccess: (result) => resolve([result.getAccessToken().getJwtToken(),result.getIdToken().getJwtToken(),result.getRefreshToken().getToken(),result.getIdToken().payload['custom:permission'],st.userName]),
                 onFailure: (err) => resolve([]),
                })
            ));
          }
      },
      adminVacancy: {
        type: new GraphQLList(VacancyType),
        description: 'Vacancies created by admin',
        args: {
        },
        resolve: (parent, args,req) =>{
          return new Promise((resolve,reject)=>{
            if(req.user!=null && req.user.permission=='admin'){
              resolve(Vacancies.find({userId:req.user.userId}))
            }
            else{
              resolve('Invalid Access')
            }
          })
          
        }

          
      },
      vacancy: {
        type: VacancyType,
        description: 'A Single Vacancy',
        args: {
          vacancyId: { type: GraphQLID }
        },
        resolve: (parent, args,req) =>{
          return new Promise((resolve,reject)=>{
            if(req.user!=null && req.user.permission=='admin'){
              resolve(Vacancies.findOne({_id:args.vacancyId}))
            }
            else{
              resolve("Invalid Access")
            }
          })
        }
          
      },
      candidate: {
        type:new GraphQLList(CandidateType),
        description: 'candidate',
        args: {
        },
        resolve: (parent, args,req) =>{
         return new Promise((resolve,reject)=>{
          if(req.user!=null && req.user.permission=='candidate'){
            console.log(req.user.userId);
             resolve(Candidates.find({userId:req.user.userId}))
          }
            else if(req.user!=null&&req.user.permission=='admin'){
              resolve(Candidates.find({}))
            }
            else{
              resolve("Invalid Access")
            }
          })
        }
        
          
      },
      oneCandidate: {
        type:new GraphQLList(CandidateType),
        description: 'A Single Candidate',
        args: {
          candidateId:{type :GraphQLID}
        },
        resolve: (parent, args,req) =>{
         return new Promise((resolve,reject)=>{
          if(req.user!=null ){
            console.log(req.user.userId);
             resolve(Candidates.find({candidateId:args.candidateId}))
          }
            
          })
        }
          
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
            rounds : {type : GraphQLNonNull(new GraphQLList(GraphQLNonNull(new GraphQLList(GraphQLString))))}
        },
        resolve: async (parent, args,req) => {
            console.log(req.user)
            if(req.user!=null&&req.user.permission=='admin'){
            Vacancies.find({vacancyPost:args.vacancyPost},(err,docs)=>{
              if(docs!=undefined && docs.length==0){
                var newVacancy=new Vacancies({vacancyPost:args.vacancyPost,noOfOpenings:args.noOfOpenings,stipend:args.stipend,perks:args.perks,
                    duration:args.duration,aboutPost:args.aboutPost,skillsRequired:args.skillsRequired,
                    status:args.status,userId:req.user.userId,rounds:args.rounds
                })
                newVacancy.vacancyId=newVacancy._id 
                newVacancy.save();
                return 1//success
              }
              return 0;//post name exists
            })
          }
          else{
            return 2//no permission
          }
        }
      },
      vacancyUpdate:{
        type:GraphQLInt,
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
            rounds : {type : GraphQLNonNull(new GraphQLList(GraphQLNonNull(new GraphQLList(GraphQLString))))}
        },
        resolve: (parent, args,req) => {
          if(req.user!=null&&req.user.permission=='admin'){
            const vacancy = {vacancyPost:args.vacancyPost,noOfOpenings:args.noOfOpenings,stipend:args.stipend,perks:args.perks,
              duration:args.duration,aboutPost:args.aboutPost,skillsRequired:args.skillsRequired,
              status:args.status
            }
            Vacancies.updateOne({_id:args.vacancyId,userId:req.user.userId},{$set:vacancy},(err,docs)=>{
              if(docs!=undefined && docs.length>0)
                  return 1;
              else
                  return 0
          })
          }else{
            return 2;
          }

          }     
      },
      vacancyDelete:{
        type:GraphQLInt,
        description:'Delete a Vacancy',
        args:{
          vacancyId:{type:GraphQLNonNull(GraphQLID)},
        },
        resolve: (parent, args,req) => {
          if(req.user!=null&&req.user.permission=='admin'){
            Vacancies.deleteOne({_id:args.vacancyId,userId:req.user.userId},(err,docs)=>{
              if(docs)
               return 1;
              else
                return 0;
          })
          }else{
            return 2;
          }
        }
      },
      addCandidate: {
        type: GraphQLInt,
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
        resolve: (parent, args,req) => {  
          if(req.user!=null&&req.user.permission=='candidate'){
          Candidates.find({email:args.email},(err,docs)=>{
            if(docs!=undefined && docs.length==0){
              var newCandidate=new Candidates({candidateName:args.candidateName,email:args.email,phoneNo:args.phoneNo,address:args.address,
                hseSchool:args.hseSchool,hseBoard:args.hseBoard,hseSpecialization:args.hseSpecialization,hseFrom:args.hseFrom,hseTo:args.hseTo,hsePercentage:args.hsePercentage,
                sslcSchool:args.sslcSchool,sslcBoard:args.sslcBoard,sslcFrom:args.sslcFrom,sslcTo:args.sslcTo,sslcPercentage:args.sslcPercentage,ugCollege:args.ugCollege,ugSpecialization:args.ugSpecialization,
                ugFrom:args.ugFrom,ugTo:args.ugTo,ugPercentage:args.ugPercentage,skills:args.skills,userId:req.user.userId
              })
              newCandidate.candidateId=newCandidate._id
              newCandidate.save({},(err,docs)=>{
                //console.log(err)
                if(docs)
                  return 1;//success
                
              });
            }
            return 0;//email exists
          })
        }else{
            return 2;//no permission
        }
        }
      },
      deleteCandidate:{
        type:GraphQLInt,
        description:'Delete a Candidate',
        args:{
          candidateId:{type:GraphQLNonNull(GraphQLID)},
          
        },
        resolve: (parent, args,req) => {
          Candidates.deleteOne({$or:[{_id:args.candidateId},{userId:req.user.userId}]},(err,docs)=>{
            if(docs)
              return 1;
            else
              return 0;
          })
        }
      },
      updateCandidate: {
        type: GraphQLInt,
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
        resolve: (parent, args,req) => {
          if(req.user!=null&&req.user.permission=='candidate'){

          Candidates.updateOne({_id:args.candidateId,userId:req.user.userId},{candidateName:args.candidateName,email:args.email,phoneNo:args.phoneNo,address:args.address,
            hseSchool:args.hseSchool,hseBoard:args.hseBoard,hseSpecialization:args.hseSpecialization,hseFrom:args.hseFrom,hseTo:args.hseTo,hsePercentage:args.hsePercentage,
            sslcSchool:args.sslcSchool,sslcBoard:args.sslcBoard,sslcFrom:args.sslcFrom,sslcTo:args.sslcTo,sslcPercentage:args.sslcPercentage,ugCollege:args.ugCollege,ugSpecialization:args.ugSpecialization,
            ugFrom:args.ugFrom,ugTo:args.ugTo,ugPercentage:args.ugPercentage,skills:args.skills
          },(err,docs)=>{
            if(docs)
              return 1;
            else
              return 0;
          })
        }else{
          return 2;
        }
        }
      }, 
      addResponse: {
        type: GraphQLInt,
        description: 'Add a vacancy',
        args: {
          vacancyId: { type: GraphQLNonNull(GraphQLID) },
          projectsLinks: { type: new GraphQLList(GraphQLString) },
          githubId: { type: GraphQLNonNull(GraphQLString)},
          roundsAnswers : {type : GraphQLNonNull(new GraphQLList(GraphQLNonNull(new GraphQLList(GraphQLString))))}
        },
        resolve: (parent, args,req) => {
          if(req.user!=null&&req.user.permission=='candidate'){
            
            try{
                var newResponse=new Response({
                  vacancyId:args.vacancyId,
                  projectsLinks:args.projectsLinks,
                  githubId:args.githubId,
                  roundsAnswers:args,roundsAnswers
                })

                Response.find({userId:req.user.userId,vacancyId:args.vacancyId},async (err,docs)=>{
                  if(docs!=undefined&&docs.length==0){
                    Vacancies.findOne({vacancyId:args.vacancyId}, (err,docs1)=>{
                      if(docs1){
                        Candidates.findOne({userId:req.user.userId},(err,docs2)=>{
                          if(docs2){
                            console.log(docs1)
                            console.log(docs2)
                            newResponse.candidateId=docs2._id
                            newResponse.responseId=newResponse._id
                            newResponse.status='Pending'
                            newResponse.userId=req.user.userId
                            newResponse.vacancyPost=docs1.vacancyPost
                            newResponse.candidateName=docs2.candidateName
                            newResponse.candidatePhoneNo=docs2.phoneNo
                            newResponse.candidateEmail=docs2.email
                            newResponse.save();
                            return 1;
                          }
                          return 0;
                        })
                      }
                      return 0;
                    })
                  }
                  return 2
                })   
            }catch(e){
              console.log(e)
            }
          }
        }
      },
      responseUpdate:{
        type:GraphQLInt,
        description:'Response Update',
        args:{
          responseId:{type: GraphQLNonNull(GraphQLID)},
          projectsLinks: { type: new GraphQLList(GraphQLString) },
          githubId: { type: GraphQLNonNull(GraphQLString)},
        },
        resolve: (parent, args,req) => {
          if(req.user!=null&&req.user.permission=='candidate'){
            const updateResponse = {
                  projectsLinks:args.projectsLinks,
                  githubId:args.githubId,
            }
            Response.updateOne({_id:args.responseId,userId:req.user.userId},{$set:updateResponse},(err,docs)=>{
              if(docs!=undefined)
                  return 1;
              else
                  return 0;
          })
            
          }
          return 2;  
        }   
      },
      responseDelete:{
        type:GraphQLInt,
        description:'Delete a Response',
        args:{
          responseId:{type:GraphQLNonNull(GraphQLID)},
        },
        resolve: (parent, args) => {
        if(req.user!=null&&req.user.permission=='candidate'){

          Response.deleteOne({_id:args.responseId,userId:req.user.userId},(err,docs)=>{
            if(docs)
              return 1
            else
            return 0
          })
        }
        return 2
        }
      },
   
      vacancyResponses:{
        type:new GraphQLList(ResponseType),
        args:{
          vacancyId:{type:GraphQLNonNull(GraphQLID)}
        },
        resolve:(parent,args)=>
          Response.find({vacancyId:args.vacancyId,userId:req.user.userId})
      }
    })
  })

 module.exports = new GraphQLSchema({
    query:RootQueryType,
    mutation: RootMutationType
  })
