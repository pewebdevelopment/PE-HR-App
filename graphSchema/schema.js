const Response = require('../models/response');
const Vacancies = require('../models/vacancy');
const Candidates = require('../models/candidate');

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


const VacancyType = new GraphQLObjectType({
    name: 'Vacancy',
    description: 'This represents a Vacancy',
    fields: () => ({
      id: {type : GraphQLID},
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
      id: {type : GraphQLID},
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
        skillLevel:{type:new GraphQLList(GraphQLString)},
        internProfile:{type:new GraphQLList(GraphQLString)},
        internOrganization:{type:new GraphQLList(GraphQLString)},
        internLocation:{type:new GraphQLList(GraphQLString)},
        internStartingDate:{type:new GraphQLList(GraphQLInt)},
        internEndingDate:{type:new GraphQLList(GraphQLInt)},
        internDescription:{type:new GraphQLList(GraphQLString)},
        internWFH:{type:new GraphQLList(GraphQLBoolean)},
        jobProfile:{type:new GraphQLList(GraphQLString)},
        jobOrganization:{type:new GraphQLList(GraphQLString)},
        jobLocation:{type:new GraphQLList(GraphQLString)},
        jobStartingDate:{type:new GraphQLList(GraphQLInt)},
        jobEndingDate:{type:new GraphQLList(GraphQLInt)},
        jobDescription:{type:new GraphQLList(GraphQLString)},
        jobWFH:{type:new GraphQLList(GraphQLBoolean)},
        projectTitle:{type:new GraphQLList(GraphQLString)},
        projectStartingDate:{type:new GraphQLList(GraphQLInt)},
        projectEndingDate:{type:new GraphQLList(GraphQLInt)},
        projectDescription:{type:new GraphQLList(GraphQLString)},
        projectLink:{type:new GraphQLList(GraphQLString)}
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
      addCandidate: {
        type: CandidateType,
        description: 'Add an candidate',
        args: {
          candidateName:{ type: GraphQLNonNull(GraphQLString) },
          email:{ type: GraphQLNonNull(GraphQLString) },
          phoneNo:{ type: GraphQLNonNull(GraphQLString) },
          address:{ type: GraphQLNonNull(GraphQLString) },
        },
        resolve: (parent, args) => {
          var newCandidate=new Candidates({candidateName:args.candidateName,email:args.email,phoneNo:args.phoneNo,address:args.address})
          newCandidate.save({},(err,docs)=>{
            console.log(err)
          });
        }
      },
      addHse: {
        type: CandidateType,
        description: 'Add an HSE',
        args: {
          candidateId:{ type: GraphQLNonNull(GraphQLID) },
          school:{ type: GraphQLNonNull(GraphQLString) },
          board:{ type: GraphQLNonNull(GraphQLString) },
          specialization:{ type: GraphQLNonNull(GraphQLString) },
          from:{ type: GraphQLNonNull(GraphQLInt) },
          to:{ type: GraphQLNonNull(GraphQLInt) },
          percentage:{ type: GraphQLNonNull(GraphQLFloat) },
        },
        resolve: (parent, args) => {
          Candidates.updateOne({_id:args.candidateId},{hseSchool:args.school,hseBoard:args.board,hseSpecialization:args.specialization,
          hseFrom:args.from,hseTo:args.to,hsePercentage:args.percentage},(err,docs)=>{
            console.log(err,docs)
          })
        }
      },
      addSslc: {
        type: CandidateType,
        description: 'Add an SSLC',
        args: {
          candidateId:{ type: GraphQLNonNull(GraphQLID) },
          school:{ type: GraphQLNonNull(GraphQLString) },
          board:{ type: GraphQLNonNull(GraphQLString) },
          from:{ type: GraphQLNonNull(GraphQLInt) },
          to:{ type: GraphQLNonNull(GraphQLInt) },
          percentage:{ type: GraphQLNonNull(GraphQLFloat) },
        },
        resolve: (parent, args) => {
          Candidates.updateOne({_id:args.candidateId},{sslcSchool:args.school,sslcBoard:args.board,
          sslcFrom:args.from,sslcTo:args.to,sslcPercentage:args.percentage},(err,docs)=>{
            console.log(err,docs)
          })
        }
      },
      addUg: {
        type: CandidateType,
        description: 'Add an UG',
        args: {
          candidateId:{ type: GraphQLNonNull(GraphQLID) },
          college:{ type: GraphQLNonNull(GraphQLString) },
          specialization:{ type: GraphQLNonNull(GraphQLString) },
          from:{ type: GraphQLNonNull(GraphQLInt) },
          to:{ type: GraphQLNonNull(GraphQLInt) },
          percentage:{ type: GraphQLNonNull(GraphQLFloat) },
        },
        resolve: (parent, args) => {
          Candidates.updateOne({_id:args.candidateId},{ugCollege:args.college,ugSpecialization:args.specialization,
          ugFrom:args.from,ugTo:args.to,ugPercentage:args.percentage},(err,docs)=>{
            console.log(err,docs)
          })
        }
      },
      addPg: {
        type: CandidateType,
        description: 'Add an PG',
        args: {
          candidateId:{ type: GraphQLNonNull(GraphQLID) },
          college:{ type: GraphQLNonNull(GraphQLString) },
          specialization:{ type: GraphQLNonNull(GraphQLString) },
          from:{ type: GraphQLNonNull(GraphQLInt) },
          to:{ type: GraphQLNonNull(GraphQLInt) },
          percentage:{ type: GraphQLNonNull(GraphQLFloat) },
        },
        resolve: (parent, args) => {
          Candidates.updateOne({_id:args.candidateId},{pgCollege:args.college,pgSpecialization:args.specialization,
          pgFrom:args.from,pgTo:args.to,pgPercentage:args.percentage},(err,docs)=>{
            console.log(err,docs)
          })
        }
      },
      addJob: {
        type: CandidateType,
        description: 'Add an Job',
        args: {
          candidateId:{type:GraphQLNonNull(GraphQLID)},
          profile:{ type: GraphQLNonNull(GraphQLString) },
          organization:{ type: GraphQLNonNull(GraphQLString) },
          location:{ type: GraphQLNonNull(GraphQLString) },
          startingDate:{ type: GraphQLNonNull(GraphQLInt) },
          endingDate:{ type: GraphQLNonNull(GraphQLInt) },
          description:{ type: GraphQLNonNull(GraphQLString) },
          isWFH:{ type: GraphQLNonNull(GraphQLBoolean) },
        },
        resolve: (parent, args) => {
         Candidates.find({_id:args.candidateId,jobProfile:{$nin:[args.profile]}}, (err,docs)=>{
           if(docs!=undefined &&docs.length==1){
              console.log("ste")
              Candidates.updateOne({_id:args.candidateId},{$push:{jobProfile:args.profile,jobOrganization:args.organization,
              jobLocation:args.location,jobStartingDate:args.startingDate,jobEndingDate:args.endingDate,
              jobDescription:args.description,jobWFH:args.isWFH}
              },(err,docs)=>{
                console.log(docs);
              })
           }
         })
        }
      },
     
      deleteJob: {
        type: CandidateType,
        description: 'Delete an Job',
        args: {
          candidateId:{type:GraphQLNonNull(GraphQLID)},
          profile:{type:GraphQLNonNull(GraphQLString)},
        },
        resolve: async (parent, args) => {
          try{
            await Candidates.find({_id:args.candidateId},async (err,docs)=>{
              i=0;
              for(i=0;i<docs[0].jobProfile.length;i++){
                if(docs[0].jobProfile[i]==args.profile)
                  break;
              }
              var profileIndex = `jobProfile.${i}`;
              var organizationIndex=`jobOrganization.${i}`
              var locationIndex=`jobLocation.${i}`
              var startingDateIndex=`jobStartingDate.${i}`
              var endingDateIndex=`jobEndingDate.${i}`
              var descriptionIndex=`jobDescription.${i}`
              var isWFHIndex=`jobWFH.${i}`
              await Candidates.updateOne({_id:args.candidateId},{$unset:{[profileIndex]:1,[organizationIndex]:1,[locationIndex]:1,[startingDateIndex]:1,[endingDateIndex]:1,[descriptionIndex]:1,[isWFHIndex]:1}},(err,docs)=>{
                Candidates.updateOne({_id:args.candidateId},{$pull:{jobProfile:null,jobOrganization:null,jobLocation:null,jobStartingDate:null,jobEndingDate:null,jobDescription:null,jobWFH:null}},(err,docs)=>{
                  console.log(err,docs)
                })
              })
            })
            
          }
          catch(e){
            console.log(e)
          }
        }
      },
      
      addInternship: {
        type: CandidateType,
        description: 'Add an Internship',
        args: {
          candidateId:{type:GraphQLNonNull(GraphQLID)},
          profile:{ type: GraphQLNonNull(GraphQLString) },
          organization:{ type: GraphQLNonNull(GraphQLString) },
          location:{ type: GraphQLNonNull(GraphQLString) },
          startingDate:{ type: GraphQLNonNull(GraphQLInt) },
          endingDate:{ type: GraphQLNonNull(GraphQLInt) },
          description:{ type: GraphQLNonNull(GraphQLString) },
          isWFH:{ type: GraphQLNonNull(GraphQLBoolean) },
        },
        resolve: (parent, args) => {
         Candidates.find({_id:args.candidateId,internProfile:{$nin:[args.profile]}}, (err,docs)=>{
           if(docs!=undefined &&docs.length==1){
              console.log("ste")
              Candidates.updateOne({_id:args.candidateId},{$push:{internProfile:args.profile,internOrganization:args.organization,
              internLocation:args.location,internStartingDate:args.startingDate,internEndingDate:args.endingDate,
              internDescription:args.description,internWFH:args.isWFH}
              },(err,docs)=>{
                console.log(docs);
              })
           }
         })
        }
      },
     
      deleteInternship: {
        type: CandidateType,
        description: 'Delete an Internship',
        args: {
          candidateId:{type:GraphQLNonNull(GraphQLID)},
          profile:{type:GraphQLNonNull(GraphQLString)},
        },
        resolve: async (parent, args) => {
          try{
            await Candidates.find({_id:args.candidateId},async (err,docs)=>{
              i=0;
              for(i=0;i<docs[0].internProfile.length;i++){
                if(docs[0].internProfile[i]==args.profile)
                  break;
              }
              var profileIndex = `internProfile.${i}`;
              var organizationIndex=`internOrganization.${i}`
              var locationIndex=`internLocation.${i}`
              var startingDateIndex=`internStartingDate.${i}`
              var endingDateIndex=`internEndingDate.${i}`
              var descriptionIndex=`internDescription.${i}`
              var isWFHIndex=`internWFH.${i}`
              await Candidates.updateOne({_id:args.candidateId},{$unset:{[profileIndex]:1,[organizationIndex]:1,[locationIndex]:1,[startingDateIndex]:1,[endingDateIndex]:1,[descriptionIndex]:1,[isWFHIndex]:1}},(err,docs)=>{
                Candidates.updateOne({_id:args.candidateId},{$pull:{internProfile:null,internOrganization:null,internLocation:null,internStartingDate:null,internEndingDate:null,internDescription:null,internWFH:null}},(err,docs)=>{
                  console.log(err,docs)
                })
              })
            })
            
          }
          catch(e){
            console.log(e)
          }
        }
      },
      addProject: {
        type: CandidateType,
        description: 'Add a Project',
        args: {
          candidateId:{type:GraphQLNonNull(GraphQLID)},
          title:{ type: GraphQLNonNull(GraphQLString) },
          startingDate:{ type: GraphQLNonNull(GraphQLInt) },
          endingDate:{ type: GraphQLNonNull(GraphQLInt) },
          description:{ type: GraphQLNonNull(GraphQLString) },
          link:{ type: GraphQLNonNull(GraphQLString) },
        },
        resolve: (parent, args) => {
         Candidates.find({_id:args.candidateId,projectTitle:{$nin:[args.title]}}, (err,docs)=>{
           if(docs!=undefined &&docs.length==1){
              Candidates.updateOne({_id:args.candidateId},{$push:{projectTitle:args.title,projectStartingDate:args.startingDate
              ,projectEndingDate:args.endingDate,projectDescription:args.description,projectLink:args.link}
              },(err,docs)=>{
                console.log(docs);
              })
           }
         })
        }
      },
      deleteProject: {
        type: CandidateType,
        description: 'Delete an Project',
        args: {
          candidateId:{type:GraphQLNonNull(GraphQLID)},
          title:{type:GraphQLNonNull(GraphQLString)},
        },
        resolve: async (parent, args) => {
          try{
            await Candidates.find({_id:args.candidateId},async (err,docs)=>{
              i=0;
              for(i=0;i<docs[0].projectTitle.length;i++){
                if(docs[0].projectTitle[i]==args.title)
                  break;
              }
              var titleIndex = `projectTitle.${i}`;
              var startingDateIndex=`projectStartingDate.${i}`
              var endingDateIndex=`projectEndingDate.${i}`
              var descriptionIndex=`projectDescription.${i}`
              var linkIndex=`projectLink.${i}`
              await Candidates.updateOne({_id:args.candidateId},{$unset:{[titleIndex]:1,[startingDateIndex]:1,[endingDateIndex]:1,[descriptionIndex]:1,[linkIndex]:1}},(err,docs)=>{
                Candidates.updateOne({_id:args.candidateId},{$pull:{projectTitle:null,projectStartingDate:null,projectEndingDate:null,projectDescription:null,projectLink:null}},(err,docs)=>{
                  console.log(err,docs)
                })
              })
            })
            
          }
          catch(e){
            console.log(e)
          }
        }
      },
      addSkill: {
        type: CandidateType,
        description: 'Add a Skill',
        args: {
          candidateId:{type:GraphQLNonNull(GraphQLID)},
          skill:{ type: GraphQLNonNull(GraphQLString) },
          level:{ type: GraphQLNonNull(GraphQLString) },
        },
        resolve: (parent, args) => {
         Candidates.find({_id:args.candidateId,skills:{$nin:[args.skill]}}, (err,docs)=>{
           if(docs!=undefined &&docs.length==1){
              Candidates.updateOne({_id:args.candidateId},{$push:{skills:args.skill,skillLevel:args.level}},(err,docs)=>{
                console.log(docs);
              })
           }
         })
        }
      },
      deleteSkill: {
        type: CandidateType,
        description: 'Delete a Skill',
        args: {
          candidateId:{type:GraphQLNonNull(GraphQLID)},
          skill:{ type: GraphQLNonNull(GraphQLString) },
        },
        resolve: async (parent, args) => {
          try{
            await Candidates.find({_id:args.candidateId},async (err,docs)=>{
              i=0;
              for(i=0;i<docs[0].skills.length;i++){
                if(docs[0].skills[i]==args.skill)
                  break;
              }
              var skill = `skills.${i}`;
              var skillLevel=`skillLevel.${i}`
              await Candidates.updateOne({_id:args.candidateId},{$unset:{[skill]:1,[skillLevel]:1}},(err,docs)=>{
                Candidates.updateOne({_id:args.candidateId},{$pull:{skills:null,skillLevel:null}},(err,docs)=>{
                  console.log(err,docs)
                })
              })
            })
            
          }
          catch(e){
            console.log(e)
          }
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
             
                newResponse.save();
                return newResponse
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
      }
    })
  })

  module.exports = new GraphQLSchema({
    query:RootQueryType,
    mutation: RootMutationType
  })
