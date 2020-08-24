// Imports

// App Imports/Action types for subscription store segment
import {
  SUBSCRIPTIONS_GET_LIST_REQUEST,
  SUBSCRIPTIONS_GET_LIST_RESPONSE,
  SUBSCRIPTIONS_GET_LIST_FAILURE,
  SUBSCRIPTIONS_GET_LIST_BY_USER_REQUEST,
  SUBSCRIPTIONS_GET_LIST_BY_USER_RESPONSE,
  SUBSCRIPTIONS_GET_LIST_BY_USER_FAILURE,
  SUBSCRIPTIONS_GET_REQUEST,
  SUBSCRIPTIONS_GET_RESPONSE,
  SUBSCRIPTIONS_GET_FAILURE,
} from './actions'

// Subscriptions list

// Initial State
// isLoading will allows us to display appropriate message while awaiting
// request responses.
// error will notify us of any errors
// list will be the actual list of a user's current subscriptions
const subscriptionsInitialState = {
  isLoading: false,
  error: null,
  list: []
}

// State
// Subscription reducer to handle getting all subscriptions, most likely used to
// get all subscriptions for display to admin user
// The different cases are ordered to display loading message and return a
// filled list when response is fulfilled. Third case handles any errors that
// may be encountered on the process.
export const subscriptions = (state = subscriptionsInitialState, action) => {
  switch (action.type) {
    case SUBSCRIPTIONS_GET_LIST_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading,
        error: null
      }

    case SUBSCRIPTIONS_GET_LIST_RESPONSE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        list: action.list
      }

    case SUBSCRIPTIONS_GET_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }

    default:
      return state
  }
}

// Subscriptions list by user

// This reducer, similar to the reducer above handles the fetching of subscriptions
// however, by the action names we can conclude that the subscriptions fetched
// will be a single user's subscriptions.

// Initial State
// Same structure as above.
const subscriptionsByUserInitialState = {
  isLoading: false,
  error: null,
  list: []
}

// State
export const subscriptionsByUser = (state = subscriptionsByUserInitialState, action) => {
  switch (action.type) {
    case SUBSCRIPTIONS_GET_LIST_BY_USER_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading,
        error: null
      }

    case SUBSCRIPTIONS_GET_LIST_BY_USER_RESPONSE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        list: action.list
      }

    case SUBSCRIPTIONS_GET_LIST_BY_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }

    default:
      return state
  }
}

// Single subscription

// Given that a user only sees a subscription card inside a list and the option
// to unsubscribe this reducer probably handles an admin action to get single subscription
// in order to edit that subscription's content

// Initial State
// Much like the previous two reducers, we have an error and isLoading property.
// However, rather than a list property (array of subscriptions), there is an
// item property that represent a single subscription.
const subscriptionInitialState = {
  isLoading: false,
  error: null,
  item: {}
}

// State
// Same basic structure, an action to identify that a request is in process, an
// action to add response to state, and lastly an action to handle any errors if any.
export const subscription = (state = subscriptionInitialState, action) => {
  switch (action.type) {
    case SUBSCRIPTIONS_GET_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading,
        error: null
      }

    case SUBSCRIPTIONS_GET_RESPONSE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        item: action.item
      }

    case SUBSCRIPTIONS_GET_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }

    default:
      return state
  }
}
