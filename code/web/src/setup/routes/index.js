// App Imports
import { APP_URL_API } from '../config/env'
import admin from './admin'
import home from './home'
import user from './user'
import product from './product'
import crate from './crate'

// Combined routes
export const routes = Object.assign(admin, home, user, product, crate)

// API Routes
export const routeApi = APP_URL_API

// Image
export const routeImage = APP_URL_API


// Here we import all our routes to be exported as a single export to
// other files in the project. Note, there are different routes for different
// user roles (user, and admin), admin routes undergo a similar process
// within the index file of admin directory on same level as this file.
// We are also importing a variable from our config/env directory which processes
// the app's environment to determine the URL for request to project API
