const messagesResolvers = require("./messages");
const usersResolvers = require("./users");
module.exports = {
  Query: {
    ...usersResolvers.Query,
    ...messagesResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...messagesResolvers.Mutation,
  },
};
