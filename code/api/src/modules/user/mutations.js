// Imports
import { GraphQLString, GraphQLInt } from 'graphql'

// App Imports
import { UserType } from './types'
// need to add update to this list
import { create, remove, update} from './resolvers'

// note: only create and remove. No udpate for user\

// Create
export const userSignup = {
  type: UserType,
  args: {
    name: {
      name: 'name',
      type: GraphQLString
    },

    email: {
      name: 'email',
      type: GraphQLString
    },

    password: {
      name: 'password',
      type: GraphQLString
    }
  },
  // built in the resolvers file
  resolve: create
}

// Remove
export const userRemove = {
  type: UserType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    }
  },
  resolve: remove
}

// update user style 
// after a user submits their style survey they should hit web/src/modules/user/api/actions
export const userUpdateStyle = {
  type: UserType,
  // updateStyle is passed an id and a style string
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    },
    style: {
      name: 'style',
      type: GraphQLString
    }
  },
  // need to create a new resolve method for update user

  resolve: update
}
