// App Imports
import { isEmpty } from '../../../setup/helpers'
import { SURVEY_USER_POST_REQUEST, SURVEY_USER_GET_RESPONSE, SURVEY_USER_REQUEST_FAILURE } from './actions'

// Initial State
export const surveyInitialState = {
  error: null,
  isLoading: false,
  style: null
}

export default (state = surveyInitialState, action) => {
    switch (action.type) {
      case SURVEY_USER_POST_REQUEST:
        return {
          ...state,
          error: null,
          isLoading: action.isLoading
        }
  
      case SURVEY_USER_GET_RESPONSE:
        return {
          ...state,
          error: null,
          isLoading: false
        }
  
      case SURVEY_USER_REQUEST_FAILURE:
        return {
          ...state,
          error: true,
          isLoading: false,
        }
  
      default:
        return state
    }
  }