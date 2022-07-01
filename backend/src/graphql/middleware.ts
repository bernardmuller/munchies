/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import {z} from 'zod'
import {UserResolvers} from '../resources/users/resolvers'

const OptionsObject = z.object({
  query: z.boolean().optional(),
  mutation: z.boolean().optional(),
})

type MiddlewareOptions = z.infer<typeof OptionsObject>

const setMiddleware = (
  resolvers: any,
  middlewareFunctions = [],
  options: MiddlewareOptions,
) => {
  let middleware = {}
  for (const action in resolvers) {
    middleware[action] = async (
      resolve: any,
      parent: any,
      args: any,
      context: any,
      info: any,
    ) => {
      if (middlewareFunctions.length > 0) {
        for (const middlewareFunction of middlewareFunctions) {
          middlewareFunction(context)
        }
      }
      const result = await resolve(parent, args, context, info)
      return result
    }
  }
  if (options.query) {
    return {Query: middleware}
  } else if (options.muta) return {Mutation: middleware}
}

export const middlewareRoutes = {
  ...setMiddleware(UserResolvers.Query, [], {query: true}),
  ...setMiddleware(UserResolvers.Mutation, [], {mutation: true}),
}
