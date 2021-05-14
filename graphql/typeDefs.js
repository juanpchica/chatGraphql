const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    email: String!
    username: String!
    token: String
    createdAt: String!
  }
  type Message {
    to: String!
    uuid: String!
    from: String!
    content: String!
    createdAt: String!
  }
  input RegisterInput {
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  }
  type Query {
    getUsers: [User]!
    login(username: String, password: String): User!
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    sendMessage(to: String, content: String): Message!
  }
`;
