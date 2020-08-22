// Imports
import axios from 'axios'
import { query, mutation } from 'gql-query-builder'
import cookie from 'js-cookie'

// App Imports
import { routeApi } from '../../../setup/routes'

// Actions Types
export const LOGIN_REQUEST = 'AUTH/LOGIN_REQUEST'
export const LOGIN_RESPONSE = 'AUTH/LOGIN_RESPONSE'
export const SET_USER = 'AUTH/SET_USER'
export const LOGOUT = 'AUTH/LOGOUT'

// Actions

// Set a user after login or using localStorage token
export function setUser(token, user) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }

  return { type: SET_USER, user }
}

// Login a user using credentials
export function login(userCredentials, isLoading = true) {
  return dispatch => {
    dispatch({
      type: LOGIN_REQUEST,
      isLoading
    })

    return axios.post(routeApi, query({
      operation: 'userLogin',
      variables: userCredentials,
      fields: ['user {name, email, role}', 'token']
    }))
      .then(response => {
        let error = ''

        if (response.data.errors && response.data.errors.length > 0) {
          error = response.data.errors[0].message
        } else if (response.data.data.userLogin.token !== '') {
          const token = response.data.data.userLogin.token
          const user = response.data.data.userLogin.user

          dispatch(setUser(token, user))

          loginSetUserLocalStorageAndCookie(token, user)
        }

        dispatch({
          type: LOGIN_RESPONSE,
          error
        })
      })
      .catch(error => {
        dispatch({
          type: LOGIN_RESPONSE,
          error: 'Please try again'
        })
      })
  }
}

// Set user token and info in localStorage and cookie
export function loginSetUserLocalStorageAndCookie(token, user) {
  // Update token
  window.localStorage.setItem('token', token)
  window.localStorage.setItem('user', JSON.stringify(user))

  // Set cookie for SSR
  cookie.set('auth', { token, user }, { path: '/' })
}

// Register a user
export function register(userDetails) {
  return dispatch => {
    return axios.post(routeApi, mutation({
      operation: 'userSignup',
      variables: userDetails,
      fields: ['id', 'name', 'email']
    }))
  }
}

// Log out user and remove token from localStorage
export function logout() {
  return dispatch => {
    logoutUnsetUserLocalStorageAndCookie()

    dispatch({
      type: LOGOUT
    })
  }
}

// Unset user token and info in localStorage and cookie
export function logoutUnsetUserLocalStorageAndCookie() {
  // Remove token
  window.localStorage.removeItem('token')
  window.localStorage.removeItem('user')

  // Remove cookie
  cookie.remove('auth')
}

// Get user gender
export function getGenders() {
  return dispatch => {
    return axios.post(routeApi, query({
      operation: 'userGenders',
      fields: ['id', 'name']
    }))
  }
}

// ln2-4: Package imports
// ln7: routeApi is a variable name for process.env.APP_URL_API which process
// environment to find api address.
// ln10-13: These are our action types that will fire off reducer and return respective
// state redux store
// ln18-26: setUser() - function that will set user when LOGIN_REQUEST fulfill or on page
// load if token/user exist in localStorage(refer to root index.js file) returns an action
// ln29-67: login fn handles user login request, it does so in a number of steps:
    // ln31-34: first dispatch, isLoading is changed to true; is loading message
    // diplayed on dom
    // ln36-40: This is our request to db, unfamiliar with axios & graphql it's hard to
    // which syntax belong to which library - warrant further exploring
    // ln41-59: then code block handles db response. If error exists, error message
    // is set to variable and eventually dispatched to state (ln55-58)
    // Else if token is not an empty string, setUser() is dispatched to set user and token
    // to state and another function set them to localStorage.
    // ln55-59: an action is dispatched that will return isLoading to false and error if it exists
    // ln60-64: second error boundary previous boundary would catch incorrect credentials
    // this catch may provide error handling for a down server.
// ln 70-77: Helper function store user & token in localStorage and in cookie
// unsure of how cookies work.
// ln80-88: Register user to database. Axios post request, graphql register mutation
// or that's how I'm interpreting the syntax
// ln91-109: These line will dispatch an action that will reset user details to null
// and will remove any information stored in localStorage
// ln112-119: An axios request to db to get user gender, not sure the extent that
// gender plays for app functionality and how this may be adapted to be more inclusive.
