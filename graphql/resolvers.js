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
      //TODO: Validate not empty fields
      //TODO: Validate if username / email exists

      //TODO: Hash password
      password = await bcrypt.hash(password, 12);

      //TODO: Create user
      const user = await User.create({ username, email, password });

      //TODO: Return User

      return user;
    },
  },
};
