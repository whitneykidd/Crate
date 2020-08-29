// Imports
import axios from 'axios'
import { query, mutation } from 'gql-query-builder'
import {updateUserDetails} from '../../user/api/actions'
import { SET_USER } from '../../user/api/actions'
// App Imports
import { routeApi } from '../../../setup/routes'

// // Actions Types


export const SURVEY_USER_POST_REQUEST = 'SURVEY/USER_POST_REQUEST'
export const SURVEY_USER_GET_RESPONSE = 'SURVEY/USER_GET_RESPONSE'
export const SURVEY_USER_REQUEST_FAILURE = 'SURVEY/USER_REQUEST_FAILURE'


// // Actions

// // Get list of products

export function postUserSurvey(variables, isLoading = true) {
  return dispatch => {
    dispatch({
      type: SURVEY_USER_POST_REQUEST,
      error: null,
      isLoading
    })
    return axios.post(routeApi, mutation({
      operation: 'userUpdate',
      variables,
      fields: ['id', 'name', 'style', 'email', 'role']
    }))
      .then(response => {
        const user = response.data.data.userUpdate
        dispatch({
          type: SET_USER,
          user
        })
      })
      .catch(error => {
        console.error(error)
        dispatch({
          type: SURVEY_USER_REQUEST_FAILURE,
          error: 'Some error occurred. Please try again.',
          isLoading: false
        })
      })
  }
}

