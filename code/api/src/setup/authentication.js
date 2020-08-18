// Imports
import jwt from 'jsonwebtoken'
// what is json web token?
import serverConfig from '../config/server.json'
// config the server

// Authentication middleware
export default function (request, response, next) {
  // looks like authentication
  let authToken = request.headers.authorization

  // this could be useful for product show. list !== null
  if (authToken && authToken !== null) {
    try {
      const token = authToken.split(' ')
      request.user = jwt.verify(token[1], serverConfig.secret)
    } catch (e) {
      console.warn('Invalid token detected.')
    }
  } else {
    request.user = {}
  }
  // what does next do?
  next()
}
