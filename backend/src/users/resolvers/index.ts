import {getUsers} from '../actions/getUsers'
import {createUser} from '../actions/createUser'
import {updateUser} from '../actions/updateUser'
import {deleteUser} from '../actions/deleteUser'

export const resolvers = {
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
