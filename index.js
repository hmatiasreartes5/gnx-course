const express = require('express');
const gnx = require('@simtlix/gnx');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql');

const app = express();

mongoose.plugin(require('./plugins/auditablePluginSchema'));

mongoose.connect('mongodb://localhost/gnx',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('Connected to data base');
});

const Types = require('./types');
const includedTypes = Object.values(Types);
const schema = gnx.createSchema(includedTypes,includedTypes);

app.use('/graphql-API',graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(3000, () => {
    console.log('Listening on port 3000')
});
