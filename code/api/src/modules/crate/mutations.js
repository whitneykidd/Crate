/* code-annotations-wk
  This file imports GraphQL that's used to return mutation results
*/

// Imports
import { GraphQLString, GraphQLInt } from 'graphql'

// App Imports
/* code-annotations-wk
  Import crate object as its defined in types
  Import create, remove, update resolvers
*/
import CrateType from './types'
import { create, remove, update } from './resolvers'

// Crate create
export const crateCreate = {
  type: CrateType,
  args: {
    name: {
      name: 'name',
      type: GraphQLString
    },

    description: {
      name: 'description',
      type: GraphQLString
    }
  },
  resolve: create
}

// Crate update
export const crateUpdate = {
  type: CrateType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    },

    name: {
      name: 'name',
      type: GraphQLString
    },

    description: {
      name: 'description',
      type: GraphQLString
    }
  },
  resolve: update
}

// Crate remove
export const crateRemove = {
  type: CrateType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    }
  },
  resolve: remove
}