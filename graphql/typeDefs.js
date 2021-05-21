const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    email: String
    username: String!
    token: String
    createdAt: String!
    latestMessage: Message
    imageUrl: String
  }
  type Message {
    to: String!
    uuid: String!
    from: String!
    content: String!
    createdAt: String!
  }

  type Reaction {
    uuid: String!
    content: String!
    createdAt: String!
    message: Message!
    user: User!
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
    getMessages(from: String!): [Message]!
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    sendMessage(to: String, content: String): Message!
    reactToMessage(uuid: String!, content: String!): Reaction!
  }

  type Subscription {
    newMessage: Message!
    newReaction: Reaction!
  }
`;
