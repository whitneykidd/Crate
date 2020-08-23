// App Imports
import Dashboard from '../../../modules/admin/Dashboard'

// Admin user routes
export const userList = {
  path: '/admin/users',
  component: Dashboard,
  auth: true
}

// An admin user should be able to see all the user that are subsribed to
// the crate service. However, the app does not have a way to access this route
// nor anything to render if this route is found (typed into url address).
// May be an unnecessary file.
