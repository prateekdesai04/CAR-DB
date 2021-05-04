const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql'); //allows express to understand GraphQL

app.use('/graphql', graphqlHTTP({})); //This function handles the graphql requests

app.listen(4200, () => {
  console.log('Server up and running...');
});
