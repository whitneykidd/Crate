// Imports

// App Imports

// these are the actions available to us
import {
  CRATES_GET_LIST_REQUEST,
  CRATES_GET_LIST_RESPONSE,
  CRATES_GET_LIST_FAILURE,
  CRATES_GET_REQUEST,
  CRATES_GET_RESPONSE,
  CRATES_GET_FAILURE,
} from './actions'

// Crates list

// Initial State
const cratesInitialState = {
  isLoading: false,
  error: null,
  list: []
}


// State
export const crates = (state = cratesInitialState, action) => {
  switch (action.type) {
    // this happens after user logs in
    case CRATES_GET_LIST_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading,
        error: null
      }


      // these cases are tested once logged in , and tests whether
      // app has crates to load or not
    case CRATES_GET_LIST_RESPONSE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        list: action.list
      }

  

    case CRATES_GET_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }

    default:
      return state
  }
}

// Single crate

// this is more relative to an admin

// Initial State
const crateInitialState = {
  isLoading: false,
  error: null,
  item: {}
}

// State
export const crate = (state = crateInitialState, action) => {
  switch (action.type) {

    // this does something similar to the switch above
    // except that it is for one crate, 
    case CRATES_GET_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading,
        error: null
      }

    case CRATES_GET_RESPONSE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        item: action.item
      }

    case CRATES_GET_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }

    default:
      return state
  }
}