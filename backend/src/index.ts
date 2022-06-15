/* eslint-disable @typescript-eslint/no-floating-promises */
import dotenv from 'dotenv'
import {ApolloServer} from 'apollo-server'
import {resolvers} from './users/resolvers'
import {typeDefs} from './graphql/typeDefs'

dotenv.config()

const server = new ApolloServer({typeDefs, resolvers, csrfPrevention: true})

server.listen().then(({url}) => {
  console.log(`Server started on: ${url}`)
})
