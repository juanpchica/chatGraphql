const { Message, User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const { UserInputError, AuthenticationError } = require("apollo-server-errors");
module.exports = {
  Query: {
    getUsers: async (_, __, { user }) => {
      try {
        if (!user) throw new AuthenticationError("Unathenticated");

        //Context checking

        //Get all users but not the one who is logged in
        const users = await User.findAll({
          where: { username: { [Op.ne]: user.username } },
        });

        return users;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    //Function for login
    async login(_, { username, password }) {
      let errors = {};

      try {
        // Validate empty inputs
        if (username.trim() === "")
          errors.username = "Username can not be empty";
        if (password === "") errors.password = "Password can not be empty";

        if (Object.keys(errors).length > 0) {
          throw new UserInputError("Empty inputs", { errors });
        }

        // Validate if user exist
        const user = await User.findOne({ where: { username } });
        if (!user) {
          errors.username = "User not found";
          throw new UserInputError("User not found!", { errors });
        }

        // Validate if password is correct
        const correctPassword = await bcrypt.compare(password, user.password);
        if (!correctPassword) {
          errors.password = "Password Incorrect!";
          throw new UserInputError("Password Incorrect!", { errors });
        }

        //Create a jwt for the user
        const token = jwt.sign({ username }, process.env.SECRET_KEY, {
          expiresIn: "1h",
        });

        return {
          ...user.toJSON(),
          token,
          createdAt: user.createdAt.toISOString(),
        };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },

  Mutation: {
    //Function register for user
    register: async (
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) => {
      let errors = {};

      try {
        // Validate not empty fields
        if (email.trim() === "") errors.email = "email must not be empty";
        if (username.trim() === "")
          errors.username = "username must not be empty";
        if (password.trim() === "")
          errors.password = "password must not be empty";
        if (confirmPassword.trim() === "")
          errors.confirmPassword = "repeat password must not be empty";

        if (password !== confirmPassword)
          errors.confirmPassword = "passwords must match";

        // Validate if username / email exists
        // const userByUsername = await User.findOne({ where: { username } });
        // const userByEmail = await User.findOne({ where: { email } });

        // if (userByUsername) errors.username = "Username is already taken";
        // if (userByEmail) errors.email = "Email is already taken";

        if (Object.keys(errors).length > 0) {
          throw errors;
        }

        // Hash password
        password = await bcrypt.hash(password, 12);

        // Create user
        const user = await User.create({ username, email, password });

        // Return User

        return user;
      } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
          error.errors.forEach((e) => {
            errors[e.path] = `${e.path} is already taken`;
          });
        } else if (error.name === "SequelizeValidationError") {
          error.errors.forEach((e) => (errors[e.path] = e.message));
        }
        throw new UserInputError("Input Error", { errors });
      }
    },
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
