const messagesResolvers = require("./messages");
const usersResolvers = require("./users");

const { User, Message } = require("../../models");

module.exports = {
  Message: {
    createdAt: (parent) => parent.createdAt.toISOString(),
  },
  Reaction: {
    createdAt: (parent) => parent.createdAt.toISOString(),
    message: async (parent) => await Message.findByPk(parent.messageId),
    user: async (parent) =>
      await User.findByPk(parent.userId, {
        attributes: ["username", "imageUrl", "createdAt"],
      }),
  },
  User: {
    createdAt: (parent) => parent.createdAt.toISOString(),
  },
  Query: {
    ...usersResolvers.Query,
    ...messagesResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...messagesResolvers.Mutation,
  },
  Subscription: {
    ...messagesResolvers.Subscription,
  },
};
