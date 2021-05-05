const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql'); //allows express to understand GraphQL
const schema = require('./schema/schema');

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
); //This function handles the graphql requests - middleware

app.listen(4200, () => {
  console.log('Server up and running...');
});
