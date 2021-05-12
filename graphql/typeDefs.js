const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    email: String!
    username: String!
  }
  input RegisterInput {
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  }
  type Query {
    getUsers: [User]!
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
  }
`;
