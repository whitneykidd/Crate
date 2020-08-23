// App Imports
// Each of these imputs is tied to a route
import Login from '../../modules/user/Login'
import Signup from '../../modules/user/Signup'
import Profile from '../../modules/user/Profile'
import Subscriptions from '../../modules/user/Subscriptions'
// will need 
// import StyleSurvey from '../../modules/user/StyleSurvey

// User routes
export default {
  login: {
    path: '/user/login',
    component: Login
  },

  signup: {
    path: '/user/signup',
    component: Signup
  },

  profile: {
    path: '/user/profile',
    component: Profile,
    auth: true
  },  
  // after clicking subscribe on a crate we end up here 
  // this will redirect to user subscriptions page
  // where your style will show up
  subscriptions: {
    path: '/user/subscriptions',
    component: Subscriptions,
    auth: true
  }
  // will need the following path 
  // styleSurvey: {
  //   path: 'user/styleSurvey',
  //   component: StyleSurvey, // this needs to be created in ../../modules/user/StyleSurvey.js
  //   auth: true 
  // }

}
