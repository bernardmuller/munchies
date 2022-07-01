import {AuthResolvers} from '../resources/auth/resolvers'
import {UserResolvers} from '../resources/users/resolvers'
import {MenuResolvers} from '../resources/menus/resolvers'
import {GrocerylistResolvers} from '../resources/grocerylists/resolvers'
import {ItemResolvers} from '../resources/items/resolvers'
import {IngredientResolvers} from '../resources/ingredients/resolvers'

export const resolvers = {
  Query: {
    ...UserResolvers.Query,
    ...MenuResolvers.Query,
    ...GrocerylistResolvers.Query,
    ...ItemResolvers.Query,
    ...IngredientResolvers.Query,
  },
  Mutation: {
    ...UserResolvers.Mutation,
    ...MenuResolvers.Mutation,
    ...AuthResolvers.Mutation,
    ...GrocerylistResolvers.Mutation,
    ...ItemResolvers.Mutation,
    ...IngredientResolvers.Mutation,
  },
}
