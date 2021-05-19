const messagesResolvers = require("./messages");
const usersResolvers = require("./users");
module.exports = {
  Message: {
    createdAt: (parent) => parent.createdAt.toISOString(),
  },
  // User: {
  //   createdAt: (parent) => parent.createdAt.toISOString(),
  // },
  Query: {
    ...usersResolvers.Query,
    ...messagesResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...messagesResolvers.Mutation,
  },
  Subscription: {
    ...messageResolvers.Subscription,
  },
};
