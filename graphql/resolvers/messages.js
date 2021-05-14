const { User, Message } = require("../../models");

const { UserInputError, AuthenticationError } = require("apollo-server-errors");
const { Op } = require("sequelize");

module.exports = {
  Query: {
    getMessages: async (_, { from }, { user }) => {
      try {
        if (!user) throw new AuthenticationError("Unauthenticated");

        const otherUser = await User.findOne({
          where: { username: from },
        });
        if (!otherUser) throw new UserInputError("User not found");

        const usernames = [user.username, otherUser.username];

        const messages = await Message.findAll({
          where: {
            from: { [Op.in]: usernames },
            to: { [Op.in]: usernames },
          },
          order: [["createdAt", "DESC"]],
        });

        return messages;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },
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
