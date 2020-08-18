// Imports
import { GraphQLObjectType } from 'graphql'

// App Imports
import * as user from '../../modules/user/mutations'
import * as product from '../../modules/product/mutations'
import * as crate from '../../modules/crate/mutations'
import * as subscription from '../../modules/subscription/mutations'
// bring in all the tables, then add them to the db structure

// Mutation
const mutation = new GraphQLObjectType({
  name: 'mutations',
  description: 'API Mutations [Create, Update, Delete]',

  fields: {
    // the spread opperator! this will shove everything into a well formatted array/object
    ...user,
    ...product,
    ...crate,
    ...subscription
  }
})

export default mutation
