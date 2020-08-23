// App Imports
import params from '../../../setup/config/params'
import CrateList from '../../../modules/admin/crate/List'
import CrateCreateOrEdit from '../../../modules/admin/crate/CreateOrEdit'

// Admin crate routes
export const crateList = {
  path: '/admin/crates',
  component: CrateList,
  auth: true,
  role: params.user.roles.admin
}

export const crateCreate = {
  path: '/admin/crate/create',
  component: CrateCreateOrEdit,
  auth: true,
  role: params.user.roles.admin
}

export const crateEdit = {
  path: (id = ':id') => (`/admin/crate/${ id }/edit`),
  component: CrateCreateOrEdit,
  auth: true,
  role: params.user.roles.admin
}

// Similar to user crates path, this allows us to view available crates.
// However, there are a couple of additional details/routes. Namely,
// all of these route objects include a role property to further
// specify that these routes should be viewble by the appropriate user.
// Admin crate routes have two additional routes: one to create a new crate
// and another to edit an existing crate. Note: we are using a function to create
// a dynamic path using crate id. 
