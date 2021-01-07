const graphql = require("graphql");
const Response = require('../models/response');

const {GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLID
}=require('graphql')


//ResponseType
const ResponseType = new GraphQLObjectType({
    name: 'Response',
    description: 'Responses of Candidates',
    fields: () => ({
      vacancyId: { type: GraphQLNonNull(GraphQLString) },
      candidateId: { type:  GraphQLNonNull(GraphQLString) },
      whyHire: { type:  GraphQLNonNull(GraphQLString) },
      projectsLinks: { type: GraphQLNonNull(new GraphQLList(GraphQLString)) },
      githubId: { type: GraphQLNonNull(GraphQLString)},
      status: { type: GraphQLNonNull(GraphQLString)},
    })
})


const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
      response: {
        type: new GraphQLList(ResponseType),
        description: 'A Single Vacancy',
        args: {
          ResponseId: { type: GraphQLID }
        },
        resolve: (parent, args) =>
          Response.find({_id:args.ResponseId},(err,docs)=>{
            if(docs.length>0){
              return docs;
            }
            else
                console.log('No Documents Fetched1')
        })
      },


      responses: {
        type: new GraphQLList(ResponseType),
        description: 'List of All Vcancies',
        resolve: () => Response.find({},(err,docs)=>{
            if(docs.length>0)
                return docs;
            else
                return 'No Documents Fetched'
        })
      },
      
    })
  })
const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
      addResponse: {
        type: ResponseType,
        description: 'Add a vacancy',
        args: {
          vacancyId: { type: GraphQLNonNull(GraphQLString) },
          candidateId: { type:  GraphQLNonNull(GraphQLString) },
          whyHire: { type:  GraphQLNonNull(GraphQLString) },
          projectsLinks: { type: GraphQLNonNull(new GraphQLList(GraphQLString)) },
          githubId: { type: GraphQLNonNull(GraphQLString)},
          status: { type: GraphQLNonNull(GraphQLString)},
        },
        resolve: (parent, args) => {
            try{
                var newResponse=new Response({
                  vacancyId:args.vacancyId,
                  candidateId:args.candidateId,
                  whyHire:args.whyHire,
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
        description:'Update a Delete',
        args:{
          vacancyId: { type: GraphQLNonNull(GraphQLString) },
          candidateId: { type:  GraphQLNonNull(GraphQLString) },
          whyHire: { type:  GraphQLNonNull(GraphQLString) },
          projectsLinks: { type: GraphQLNonNull(new GraphQLList(GraphQLString)) },
          githubId: { type: GraphQLNonNull(GraphQLString)},
          status: { type: GraphQLNonNull(GraphQLString)}
        },
        resolve: (parent, args) => {
            const updateResponse = {
                  vacancyId:args.vacancyId,
                  candidateId:args.candidateId,
                  whyHire:args.whyHire,
                  projectsLinks:args.projectsLinks,
                  githubId:args.githubId,
                  status:args.status
            }
            Response.updateOne({_id:args.ResponseId},{$set:updateResponse},(err,docs)=>{
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
      }
    })
  })

module.exports = new GraphQLSchema({
    query:RootQueryType,
    mutation: RootMutationType
  })