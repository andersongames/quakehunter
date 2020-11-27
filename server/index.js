const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { createStore } = require('./utils');

const QuakeAPI = require('./dataSources/quake');
const UserAPI = require('./dataSources/user');

const store = createStore();

const server = new ApolloServer({
  context: async ({ req }) => {
    // simple auth check on every request
    const auth = req.headers && req.headers.authorization || '';
    const email = Buffer.from(auth, 'base64').toString('ascii');

    // find a user by their email
    const userCheck = await store.users.map(user => {
      if (email === user.email)
        return user
    });

    let users = [];

    await userCheck.forEach(elem => {
      if (elem)
        users.push(elem);
    });

    const user = users && users[0] || null;

    return { user };
  },
  typeDefs,
  resolvers,
  dataSources: () => ({
    QuakeAPI: new QuakeAPI(),
    UserAPI: new UserAPI({ store }),
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
