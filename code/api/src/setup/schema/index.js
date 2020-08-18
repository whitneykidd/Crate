// Imports
import { GraphQLSchema } from 'graphql'

// App Imports
import query from './queries'
import mutation from './mutations'

// Schema
const schema = new GraphQLSchema({
  // looks like we are calling queries and mutations. see those files
  // feels like rails db:migrate
  query,
  mutation
})

export default schema
