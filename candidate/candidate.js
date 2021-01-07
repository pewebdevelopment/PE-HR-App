
const express =require('express');
const app=express();
const mongoose=require('mongoose')
const mongoconnect = require("./mongoconnect/mongoconnect")
mongoconnect()
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

const CandidateType = new GraphQLObjectType({
  name: 'Candidate',
  description: 'This represents a Candidate',
  fields: () => ({
      candidateName:{ type: GraphQLNonNull(GraphQLString) },
      email:{ type: GraphQLNonNull(GraphQLString) },
      phoneNo:{ type: GraphQLNonNull(GraphQLString) },
      address:{ type: GraphQLNonNull(GraphQLString) },
      pgCollege:{type:GraphQLString},

  })
})
const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
      candidate: {
        type:CandidateType,
        description: 'A Single candidate',
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
    })
  })
const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
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
  app.listen(3000,()=>{console.log("Server is Running")});