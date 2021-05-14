const { User, Message } = require("../../models");

const { UserInputError, AuthenticationError } = require("apollo-server-errors");

module.exports = {
  Query: {},
  Mutation: {
    sendMessage: async (_, { to, content }, { user }) => {
      if (!user) throw new AuthenticationError("Unauthenticated");

      try {
        //Validate if content message is not empty
        if (content.trim() === "")
          throw new UserInputError("Content cannot be empty");

        //Validate if recipient exist
        const recipient = await User.findOne({ where: { username: to } });
        if (!recipient) {
          throw new UserInputError("User not found!!");
        } else if (recipient.username === user.username) {
          throw new UserInputError("You cannot send messages to yourself!");
        }

        //Everything is ok then add new message
        const message = await Message.create({
          to,
          from: user.username,
          content,
        });

        return message;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};
