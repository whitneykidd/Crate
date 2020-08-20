/* code-annotations-wk
  This file imports GraphQL that's used in returning query results
 */

// Imports
import { GraphQLInt, GraphQLString, GraphQLList } from 'graphql'

// App Imports
/* code-annotations-wk
  Import crate object as defined in types
  Import getAll and getById resolvers
 */
import CrateType from './types'
import { getAll, getById } from './resolvers'

// Crates All
/* code-annotations-wk
  `resolve: getAll` is the trigger to jump to the crate resolver create action
 */
export const crates = {
  type: new GraphQLList(CrateType),
  args: {
    orderBy: { type: GraphQLString }
  },
  resolve: getAll
}

// Crate By ID
export const crateById = {
  type: CrateType,
  args: {
    crateId: { type: GraphQLInt }
  },
  resolve: getById
}
