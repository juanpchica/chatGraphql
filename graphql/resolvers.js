const { User } = require("../models");
const bcrypt = require("bcryptjs");
const { UserInputError, AuthenticationError } = require("apollo-server-errors");
module.exports = {
  Query: {
    getUsers: async () => {
      try {
        const users = await User.findAll();
        return users;
      } catch (error) {
        console.log(error);
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
        const user = User.findOne({ where: { username } });
        if (!user) {
          errors.username = "User not found";
          throw new AuthenticationError("User not found!", { errors });
        }

        // Validate if password is correct
        const correctPassword = await bcrypt.compare(password, user.password);
        if (!correctPassword) {
          errors.password = "Password Incorrect!";
          throw new AuthenticationError("Password Incorrect!", { errors });
        }

        return user;
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
  },
};
