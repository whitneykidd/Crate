// App Imports
import * as dashboard from './dashboard'
import * as product from './product'
import * as crate from './crate'
import * as subscription from './subscription'
import * as user from './user'

// Admin routes
const admin = {
  ...dashboard,
  ...product,
  ...crate,
  ...subscription,
  ...user
}

export default admin

// Here we are exporting the interity of admin routes as a single object
// for other files to use/referance. This will be incorporated into yet another
// index file to combine with general user route paths. 
