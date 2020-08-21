import request from 'supertest' // grayed out if unsued
import express from 'express'
import schema from '../../setup/schema'
import graphqlHTTP from 'express-graphql'

//everything is a function words(args() => {code})
describe('user queries', () => {
  let server;

  beforeAll(() => { // get the server running and attached for each of our future tests
    server = express();

    server.use(
      '/',
      graphqlHTTP({
        schema: schema, // gotta import the schema
        graphiql: true, // use the graphiql feature
      })
    )
  })

  it('returns all users', async () => {
    const response = await request(server)
      .get('/') // get and post operate similarly
      .send({ query: '{ users { id name email } }'}) // `users` has to match whats in the query
      .expect(200) // status code
      // console.log(response.body.data.users)
      console.log(`all users ${response.body.data.users.length}`)
      expect(response.body.data.users.length).toEqual(2)
  })
  
  it('returns user by id', async () => {
    const response = await request(server)
      .get('/')
      .send({ query: '{ user(id: 4) { email name} }'}) // could send a mutation. testing resolvers is different...
      .expect(200)
      // console.log(response.body)
      expect(response.body.data.user.name).toEqual('The Admin')
  })

  it('User Login success', async () => {
    const response = await request(server)
      .get('/')
      .send({ query: '{ userLogin(email: "admin@crate.com", password: "123456"){ token user {name}}}'})
      .expect(200)
      
      // console.log(response.body.data.userLogin.token)
      expect(typeof response.body.data.userLogin.token).toEqual('string')
      expect(response.body.data.userLogin.user.name).toEqual('The Admin')
  })
  it('User Login bad email', async () => {
    const response = await request(server)
      .get('/')
      .send({ query: '{ userLogin(email: "admin@casdfrarte.com", password: "123456"){ token user {name}}}'})
      .expect(200)

    let errMessage = 'We do not have any user registered with admin@casdfrarte.com email address. Please signup.'
      

    expect(response.body.errors[0].message).toEqual(errMessage)
  })
  it('User Login bad password', async () => {
    const response = await request(server)
      .get('/')
      .send({ query: '{ userLogin(email: "admin@crate.com", password: "bad"){ token user {name}}}'})
      .expect(200)

      let errMessage = 'Sorry, the password you entered is incorrect. Please try again.'

      expect(response.body.errors[0].message).toEqual(errMessage)
  })
  
  it('is true', () => {
    expect(true).toBe(true)
  })
})

