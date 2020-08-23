// App Imports
import List from '../../modules/crate/List'

// Crate routes
export default {
  list: {
    path: '/crates',
    component: List,
    auth: true
  }
}

// Route to display a list of all crates to normal user.
