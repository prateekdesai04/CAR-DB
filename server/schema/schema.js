const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema } = graphql;

//Dummy Data
var cars = [
  { name: 'M3 (E30)', segment: 'Coupe', id: '1' },
  { name: 'Eagle Speedster', segment: 'Roadster', id: '2' },
  { name: 'Quattroporte', segment: 'Sedan', id: '3' },
];

const CarType = new GraphQLObjectType({
  //this function takes in a object
  name: 'Car', // name of the object
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString }, // name of all the fields in the Object Car - id, name, class
    segment: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    //not a function because order does not matter
    car: {
      //name of query is car and this is to fetch a particular car
      type: CarType, // type of data that we're querying
      args: { id: { type: GraphQLID } }, //the argument our query takes
      resolve(parent, args) {
        //connect to DB or get data from other source
        return _.find(cars, { id: args.id }); //find it by id using lodash, whatever we send to the user we return
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery, //the query of this schema is going to be this
});
