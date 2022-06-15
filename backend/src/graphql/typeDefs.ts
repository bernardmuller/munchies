import {gql} from 'apollo-server'

// const schema = z.object({
//   id: z.string().uuid(),
//   emailAddress: z.string().email(),
//   firstName: z.string(),
// })

export const typeDefs = gql`
  type User {
    id: String
    firstName: String!
    emailAddress: String!
  }

  input CreateUserInput {
    firstName: String!
    emailAddress: String!
  }

  input UpdateUserInput {
    id: String
    firstName: String!
  }

  input DeleteUserInput {
    id: String
  }

  type Query {
    users: [User]
    user(id: String): User
  }

  type Mutation {
    createUser(input: CreateUserInput): User
    updateUser(input: UpdateUserInput): User
    deleteUser(input: DeleteUserInput): User
  }
`
