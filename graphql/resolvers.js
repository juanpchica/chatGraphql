module.exports = {
  Query: {
    getUsers: () => {
      const users = [
        {
          username: "Juan",
          email: "juanpchica@hotmail.com",
        },
        {
          username: "Pablo",
          email: "pablo@hotmail.com",
        },
      ];
      return users;
    },
  },
};
