/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
import dotenv from 'dotenv'
import {ApolloServer} from 'apollo-server'
import {applyMiddleware} from 'graphql-middleware'
import {makeExecutableSchema} from '@graphql-tools/schema'
import {middlewareRoutes} from './graphql/middleware'
import {resolvers} from './graphql/resolvers'
import {typeDefs} from './graphql/typeDefs'
import {tradeTokenForUser} from './shared/utils'

dotenv.config()

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

const schemaWithMiddleware = applyMiddleware(schema, middlewareRoutes)

const server = new ApolloServer({
  schema: schemaWithMiddleware,
  csrfPrevention: true,
  cache: 'bounded',
  context: async ({req}) => {
    const authToken = req.headers.authorization
    return authToken
  },
})

server.listen().then(({url}) => {
  console.log(`🚀 Server started on: ${url} 🚀`)
})
