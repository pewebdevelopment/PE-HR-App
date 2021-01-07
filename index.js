const express = require('express');
const app = express();
const mongoconnect = require("./mongoconnect/mongoconnect")
mongoconnect()
const schema = require('./graphSchema/schema');
const cors = require('cors');
const {graphqlHTTP} = require('express-graphql');


app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema:schema,
    graphiql:true,
}))

app.listen(5000,()=>{console.log("Server is Running")});