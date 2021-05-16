const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql'); //allows express to understand GraphQL
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config'); // to get .env variables

app.use(cors());

app.use(
  //This function handles the graphql requests - middleware
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

// CONNECT TO DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log('Connected to DB !')
);

app.listen(4200, () => {
  console.log('Server up and running...');
});
