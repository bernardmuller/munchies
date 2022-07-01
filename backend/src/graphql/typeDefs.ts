import {gql} from 'apollo-server'

export const typeDefs = gql`
  type User {
    id: String
    firstName: String!
    emailAddress: String!
    password: String!
    token: String
  }

  type Menu {
    id: String
    name: String
  }

  type Grocerylist {
    id: String
    name: String
    menuId: String
  }

  type Item {
    id: String
    name: String!
  }

  type Ingredient {
    id: String
    typeId: String!
    ingredientId: String!
    check: Boolean
  }

  input CreateUserInput {
    firstName: String!
    emailAddress: String!
    password: String!
  }

  input UpdateUserInput {
    id: String
    firstName: String!
  }

  input DeleteUserInput {
    id: String
  }

  input LoginInput {
    emailAddress: String!
    password: String!
  }

  input RegisterInput {
    emailAddress: String!
    password: String!
  }

  input MenuInput {
    id: String
    name: String
  }

  input ItemInput {
    id: String
    typeId: String!
    ingredientId: String!
    check: Boolean
  }

  input GrocerylistInput {
    id: String
    menuId: String
  }

  input ItemInput {
    id: String
    ingredientId: String
    typeId: String
  }

  input IngredientInput {
    id: String
    name: String!
  }

  type Token {
    token: String
  }

  type AuthPayload {
    user: User
  }

  type Query {
    users: [User]
    user(id: String): User
    menus: [Menu]
    menu(id: String): Menu
    grocerylists: [Grocerylist]
    grocerylist(id: String): Grocerylist
    items: [Item]
    item(id: String): Item
    ingredients: [Ingredient]
    ingredient(id: String): Ingredient
  }

  type Mutation {
    createUser(input: CreateUserInput): User
    updateUser(input: UpdateUserInput): User
    deleteUser(input: DeleteUserInput): User
    login(input: LoginInput): Token
    register(input: RegisterInput): User
    createMenu(input: MenuInput): Menu
    updateMenu(input: MenuInput): Menu
    deleteMenu(input: MenuInput): Menu
    createGrocerylist(input: GrocerylistInput): Grocerylist
    updateGrocerylist(input: GrocerylistInput): Grocerylist
    deleteGrocerylist(input: GrocerylistInput): Grocerylist
    createItem(input: ItemInput): Item
    updateItem(input: ItemInput): Item
    deleteItem(input: ItemInput): Item
    createIngredient(input: IngredientInput): Ingredient
    updateIngredient(input: IngredientInput): Ingredient
    deleteIngredient(input: IngredientInput): Ingredient
  }
`
