const Response = require('./models/response');
const Vacancies = require('./models/vacancy');
const Candidates = require('./models/candidate');
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
const { json } = require('express');

const VacancyType = new GraphQLObjectType({
    name: 'Vacancy',
    description: 'This represents a Vacancy',
    fields: () => ({
      vacancyPost: { type: GraphQLNonNull(GraphQLString) },
      noOfOpenings: { type: GraphQLNonNull(GraphQLInt) },
      stipend: { type: GraphQLNonNull(GraphQLInt) },
      perks: { type: GraphQLNonNull(new GraphQLList(GraphQLString)) },
      duration: { type: GraphQLNonNull(GraphQLInt) },
      startingDate: { type: GraphQLNonNull(GraphQLInt) },
      aboutPost: { type: GraphQLNonNull(GraphQLString) },
      skillsRequired: { type: GraphQLNonNull(new GraphQLList(GraphQLString)) },
      whoCanApply: { type: GraphQLNonNull(new GraphQLList(GraphQLString)) },
      Status: { type: GraphQLNonNull(GraphQLBoolean)},
    })
})

const CandidateType = new GraphQLObjectType({
  name: 'Candidate',
  description: 'This represents a Candidate',
  fields: () => ({
      candidateName:{ type: GraphQLNonNull(GraphQLString) },
      email:{ type: GraphQLNonNull(GraphQLString) },
      phoneNo:{ type: GraphQLNonNull(GraphQLString) },
      address:{ type: GraphQLNonNull(GraphQLString) },
      pgCollege:{type:GraphQLString},
        pgSpecialization:{type:GraphQLString},
        pgFrom:{type:GraphQLInt},
        pgTo:{type:GraphQLInt},
        pgPercentage:{type:GraphQLFloat},
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
    vacancyId: { type: GraphQLNonNull(GraphQLString) },
    candidateId: { type:  GraphQLNonNull(GraphQLString) },
    assessmentAns: { type:  GraphQLNonNull(new GraphQLList((GraphQLString)))},
    projectsLinks: { type: new GraphQLList(GraphQLString) },
    githubId: { type: GraphQLNonNull(GraphQLString)},
    status: { type: GraphQLNonNull(GraphQLString)},
  })
})
const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
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
      vacancies: {
        type: new GraphQLList(VacancyType),
        description: 'List of All Vacancies',
        resolve: () => Vacancies.find({},(err,docs)=>{
            if(docs.length>0)
                return docs;
            else
                return 'No Documents Fetched'
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
      candidates: {
        type: new GraphQLList(CandidateType),
        description: 'List of All Vacancies',
        resolve: () => Candidates.find({},(err,docs)=>{
            if(docs.length>0)
                return docs;
            else
                return 'No Documents Fetched'
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
    })
  })
const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
      addVacancy: {
        type: VacancyType,
        description: 'Add a vacancy',
        args: {
            vacancyPost: { type: GraphQLNonNull(GraphQLString) },
            noOfOpenings: { type: GraphQLNonNull(GraphQLInt) },
            stipend: { type: GraphQLNonNull(GraphQLInt) },
            perks: { type: GraphQLNonNull(new GraphQLList(GraphQLString)) },
            duration: { type: GraphQLNonNull(GraphQLInt) },
            startingDate: { type: GraphQLNonNull(GraphQLInt) },
            aboutPost: { type: GraphQLNonNull(GraphQLString) },
            skillsRequired: { type: GraphQLNonNull(new GraphQLList(GraphQLString)) },
            whoCanApply: { type: GraphQLNonNull(new GraphQLList(GraphQLString)) },
            status: { type: GraphQLNonNull(GraphQLBoolean) },
            assessment: { type: GraphQLNonNull(new GraphQLList(GraphQLString)) },
        },
        resolve: (parent, args) => {
            Vacancies.find({vacancyPost:args.vacancyPost},(err,docs)=>{
              if(docs.length==0){
                var newVacancy=new Vacancies({vacancyPost:args.vacancyPost,noOfOpenings:args.noOfOpenings,stipend:args.stipend,perks:args.perks,
                    duration:args.duration,startingDate:args.startingDate,aboutPost:args.aboutPost,skillsRequired:args.skillsRequired,whoCanApply:args.whoCanApply,
                    status:args.status,assessment:args.assessment
                }) 
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
            startingDate: { type: GraphQLNonNull(GraphQLInt) },
            aboutPost: { type: GraphQLNonNull(GraphQLString) },
            skillsRequired: { type: GraphQLNonNull(new GraphQLList(GraphQLString)) },
            whoCanApply: { type: GraphQLNonNull(new GraphQLList(GraphQLString)) },
            status: { type: GraphQLNonNull(GraphQLBoolean) },
            assessment: { type: GraphQLNonNull(new GraphQLList(GraphQLString)) },
        },
        resolve: (parent, args) => {
            const vacancy = {vacancyPost:args.vacancyPost,noOfOpenings:args.noOfOpenings,stipend:args.stipend,perks:args.perks,
              duration:args.duration,startingDate:args.startingDate,aboutPost:args.aboutPost,skillsRequired:args.skillsRequired,whoCanApply:args.whoCanApply,
              status:args.status,assessment:args.assessment
            }
            Vacancies.updateOne({_id:args.vacancyId},{$set:vacancy},(err,docs)=>{
              if(docs.length>0)
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
            if(docs.length==0){
              var newCandidate=new Candidates({candidateName:args.candidateName,email:args.email,phoneNo:args.phoneNo,address:args.address,
                hseSchool:args.hseSchool,hseBoard:args.hseBoard,hseSpecialization:args.hseSpecialization,hseFrom:args.hseFrom,hseTo:args.hseTo,hsePercentage:args.hsePercentage,
                sslcSchool:args.sslcSchool,sslcBoard:args.sslcBoard,sslcFrom:args.sslcFrom,sslcTo:args.sslcTo,sslcPercentage:args.sslcPercentage,ugCollege:args.ugCollege,ugSpecialization:args.ugSpecialization,
                ugFrom:args.ugFrom,ugTo:args.ugTo,ugPercentage:args.ugPercentage,skills:args.skills
              })
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
          assessmentAns: { type:  GraphQLNonNull(new GraphQLList((GraphQLString)))},
          projectsLinks: { type: new GraphQLList(GraphQLString) },
          githubId: { type: GraphQLNonNull(GraphQLString)},
          status: { type: GraphQLNonNull(GraphQLString)},
        },
        resolve: (parent, args) => {
            try{
                var newResponse=new Response({
                  vacancyId:args.vacancyId,
                  candidateId:args.candidateId,
                  assessmentAns:args.assessmentAns,
                  projectsLinks:args.projectsLinks,
                  githubId:args.githubId,
                  status:args.status
                })
                Response.find({candidateId:args.candidateId,vacancyId:args.vacancyId},(err,docs)=>{
                  if(docs.lenght==0){
                    newResponse.save();
                    return newResponse
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
          vacancyId: { type: GraphQLNonNull(GraphQLID) },
          candidateId: { type:  GraphQLNonNull(GraphQLID) },
          assessmentAns: { type:  GraphQLNonNull(new GraphQLList((GraphQLString)))},
          projectsLinks: { type: new GraphQLList(GraphQLString) },
          githubId: { type: GraphQLNonNull(GraphQLString)},
          status: { type: GraphQLNonNull(GraphQLString)}
        },
        resolve: (parent, args) => {
            const updateResponse = {
                  vacancyId:args.vacancyId,
                  candidateId:args.candidateId,
                  assessmentAns:args.assessmentAns,
                  projectsLinks:args.projectsLinks,
                  githubId:args.githubId,
                  status:args.status
            }
            Response.updateOne({_id:args.responseId},{$set:updateResponse},(err,docs)=>{
              if(docs.length>0)
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
          ResponseId:{type:GraphQLNonNull(GraphQLID)},
        },
        resolve: (parent, args) => {
          Response.deleteOne({_id:args.ResponseId},(err,docs)=>{
            return docs;
          })
        }
      },
      
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
  app.listen(5000,()=>{console.log("Server is Running")});
