const graphql = require('graphql');
const _ = require('lodash');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = graphql;

//Dummy Data
var cars = [
  { name: 'M3 (E30)', segment: 'Coupe', id: '1', brandId: '1' },
  { name: 'E-Type', segment: 'Roadster', id: '2', brandId: '3' },
  { name: 'Quattroporte', segment: 'Sedan', id: '3', brandId: '2' },
  { name: 'D-Type', segment: 'Roadster', id: '4', brandId: '3' },
  { name: 'Z8', segment: 'Roadster', id: '5', brandId: '1' },
  { name: 'Ghibli', segment: 'Sedan', id: '6', brandId: '2' },
];

var brands = [
  { name: 'BMW', c_origin: 'Germany', id: '1' },
  { name: 'Maserati', c_origin: 'Italy', id: '2' },
  { name: 'Jaguar', c_origin: 'United Kingdom', id: '3' },
];

const CarType = new GraphQLObjectType({
  //this function takes in a object
  name: 'Car', // name of the object
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString }, // name of all the fields in the Object Car - id, name, class
    segment: { type: GraphQLString },
    brand: {
      // to get brand of a particular car - calling it brand because a car can only be of one brand
      type: BrandType,
      resolve(parent, args) {
        return _.find(brands, { id: parent.brandId }); // id of brands matches id of parent which is Car, brand doesn't have Car IDs hence Find
      },
    },
  }),
});

const BrandType = new GraphQLObjectType({
  name: 'Brand', //name of object
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    c_origin: { type: GraphQLString },
    cars: {
      // if we want to fetch cars by brand, calling it cars because a brand can have many cars
      type: new GraphQLList(CarType), // list of CarType because multiple cars may exist
      resolve(parent, args) {
        return _.filter(cars, { brandId: parent.id }); //cars has brand IDs hence filter
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    //not a function because order does not matter

    car: {
      //name of query is car and this is to fetch a particular car - START OF QUERY
      type: CarType, // type of data that we're querying
      args: { id: { type: GraphQLID } }, //the argument our query takes
      resolve(parent, args) {
        //connect to DB or get data from other source
        return _.find(cars, { id: args.id }); //find it by id using lodash, whatever we send to the user we return - EOQ
      },
    },

    brand: {
      // query 2 - SOQ
      type: BrandType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(brands, { id: args.id }); // ID property of brands matches ID property of args
      },
    }, // EOQ

    cars: {
      //query 3 - SOQ o/p multiple cars and relationship already est. between cars and brand (singular) in CarType
      type: new GraphQLList(CarType),
      resolve(parent, args) {
        return cars;
      },
    }, //EOQ

    brands: {
      //query 4 - SOQ o/p multiple brands and relationship already est. between brands and cars in BrandType
      type: new GraphQLList(BrandType),
      resolve(parent, args) {
        return brands;
      },
    }, //EOQ
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery, //the query of this schema is going to be this
});
