import {getUsers, createUser, updateUser, deleteUser} from './actions'

export const UserResolvers = {
  Query: {
    users: () => getUsers(),
    user: (parent, args: {id: string}) => {
      return getUsers({filters: {id: args.id}})
    },
  },
  Mutation: {
    createUser: (parent, args: any) => {
      return createUser(args?.input)
    },
    updateUser: (parent, args: any) => {
      return updateUser(args?.input?.id, args.input)
    },
    deleteUser: (parent, args: any) => {
      return deleteUser(args?.input?.id)
    },
  },
}
