const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const QuakeAPI = require('./dataSources/quake');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    QuakeAPI: new QuakeAPI(),
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
