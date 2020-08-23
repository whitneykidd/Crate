// App Imports
import params from '../../../setup/config/params'
import SubscriptionList from '../../../modules/admin/subscription/List'

// Admin subscriptions routes
export const subscriptionList = {
  path: '/admin/subscriptions',
  component: SubscriptionList,
  auth: true,
  role: params.user.roles.admin
}

// A route that allows admin user to view all active subscriptions. It is a single
// route since, unlike other admin routes, subscriptions should only be editable
// by the user and not the admin.
