// App Imports
import params from '../../../setup/config/params'
import Dashboard from '../../../modules/admin/Dashboard'

// Admin dashboard routes
export const dashboard = {
  path: '/admin/dashboard',
  component: Dashboard,
  auth: true,
  role: params.user.roles.admin
}

// This could be said to be the admin home page, or hub of activity.
// When this route is active, there is a secondary nav bar that allows admin
// user to navigate through actions, such as viewing all user crates,
// subscriptions, and products. From here, admin can navigate to route
// where these items may be edited.
