// Imports
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// App Imports
import serverConfig from '../../config/server'
import params from '../../config/params'
import models from '../../setup/models'
import { validateSDL } from 'graphql/validation/validate'
// call these methods on User
// create
// login
// getById
// getAll
// remove
// getGenders

// Create
export async function create(parentValue, { name, email, password }) {
  // Users exists with same email check
  const user = await models.User.findOne({ where: { email } })

  if (!user) {
    // User does not exists
    const passwordHashed = await bcrypt.hash(password, serverConfig.saltRounds)

    return await models.User.create({
      name,
      email,
      password: passwordHashed
    })
  } else {
    // User exists
    throw new Error(`The email ${ email } is already registered. Please try to login.`)
  }
}

// Update user for STYLE
// what does parentValue do? included for consistency
export async function update(parentValue, {id, style}){ 
  // first need to determine style 
  let styleCount = {}
  // tally all the times eachs style has been selected
  style.forEach(styleType => {
    if (styleCount.styleType === null) {
      styleCount.styleType = 1;
    } else {
      styleCount.styleType ++;
    }
  });
  // find the highest values of style
  // this is much easier in ruby...
  // to order these values:
    // split them into keys and values 
    // make a copy of values and reorder them 
    // find the index position of the 0 index on sorted vals
    // pull the key using that index. DONE.
  let styleKeys = Object.keys(styleCount);
  let styleVals = Object.values(styleCount);
  // make a copy, then sort highest to lowest
  const styleValsSorted = styleVals.slice().sort((a,b) => a > b ? -1 : 1)

  let firstStyle = styleKeys[styleVals.indexOf(styleValsSorted[0])]
  let secondStyle = styleKeys[styleVals.indexOf(styleValsSorted[1])]
  let thirdStyle = styleKeys[styleVals.indexOf(styleValsSorted[2])]

  // put top 3 styles into a stylish string
  let userStyle = `${firstStyle} but ${secondStyle}, with a touch of ${thirdStyle}`

  // assign them to the user model.
  return await models.User.update( 
    // assign style
    {
      style: userStyle
    }, 
    // assign to the correct user
    { where: { id }}
  )

}

export async function login(parentValue, { email, password }) {
  const user = await models.User.findOne({ where: { email } })

  if (!user) {
    // User does not exists
    throw new Error(`We do not have any user registered with ${ email } email address. Please signup.`)
  } else {
    const userDetails = user.get()

    // User exists
    const passwordMatch = await bcrypt.compare(password, userDetails.password)

    if (!passwordMatch) {
      // Incorrect password
      throw new Error(`Sorry, the password you entered is incorrect. Please try again.`)
    } else {
      const userDetailsToken = {
        id: userDetails.id,
        name: userDetails.name,
        email: userDetails.email,
        role: userDetails.role,
        // must add user style here for it to show up un user.details
        style: userDetails.style
      }

      return {
        user: userDetails,
        token: jwt.sign(userDetailsToken, serverConfig.secret)
      }
    }
  }
}

// Get by ID
export async function getById(parentValue, { id }) {
  return await models.User.findOne({ where: { id } })
}

// Get all
export async function getAll() {
  return await models.User.findAll()
}

// Delete
export async function remove(parentValue, { id }) {
  return await models.User.destroy({ where: { id } })
}

// User genders
export async function getGenders() {
  return Object.values(params.user.gender)
}
