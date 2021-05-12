const { User } = require("../models");
const bcrypt = require("bcryptjs");
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
  },

  Mutation: {
    //Function register for user
    register: async (
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) => {
      let errors = {};

      try {
        //TODO: Validate not empty fields
        if (email.trim() === "") errors.email = "email must not be empty";
        if (username.trim() === "")
          errors.username = "username must not be empty";
        if (password.trim() === "")
          errors.password = "password must not be empty";
        if (confirmPassword.trim() === "")
          errors.confirmPassword = "repeat password must not be empty";

        if (password !== confirmPassword)
          errors.confirmPassword = "passwords must match";

        //TODO: Validate if username / email exists

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
        console.log(error);
      }
    },
  },
};
