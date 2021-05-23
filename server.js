const { ApolloServer } = require("apollo-server");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const { sequelize } = require("./models");
const contextMiddleware = require("./util/contextMiddleware");

require("dotenv").config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: contextMiddleware,
  subscriptions: { path: "/" },
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`🚀  Server ready at ${url}`);
  console.log(`🚀 Susbscription ready at ${subscriptionsUrl}`);

  //Connect to db with sequelize
  sequelize
    .authenticate()
    .then(() => {
      console.log("Db connected!!");
    })
    .catch((err) => {
      console.log(err);
    });
});
