const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    email: String!
    username: String!
  }

  type Query {
    getUsers: [User]!
  }
`;

const resolvers = {
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
          id: 2,
        },
      ];
      return users;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
