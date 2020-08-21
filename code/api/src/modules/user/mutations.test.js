import request from 'supertest' // grayed out if unsued
import express from 'express'
import schema from '../../setup/schema'
import graphqlHTTP from 'express-graphql'

//everything is a function words(args() => {code})
describe('user mutations', () => {
  let server;

  beforeAll(() => { // get the server running and attached for each of our future tests
    server = express();

    server.use(
      '/',
      graphqlHTTP({
        schema: schema, // gotta import the schema
        graphiql: false, // use the graphiql feature
      })
    )
  })

  it('is true', () => {
    expect(true).toBe(true)
  })

  it('creates and deletes new user', async () => {
    const responseCreate = await request(server)
    .post('/')
    .send({ 
      query: `mutation { userSignup(name: "cat", 
                                    email: "cad@cat.com", 
                                    password: "cat") 
                                    { id name}}`})
    .expect(200)

    expect(responseCreate.body.data.userSignup.name).toEqual("cat")
    let userID = responseCreate.body.data.userSignup.id
    // console.log(`id: ${userID}`)

    const responseDelete = await request(server)
      .post('/') 
      .send({ query: `mutation {userRemove(id: ${userID}) { id name }}`})
      .expect(200)
      // console.log(responseDelete.body)
      expect(typeof responseDelete.body.data.userRemove).toEqual('object')
      expect(typeof responseDelete.body.data.nothing).toEqual('undefined')
      // expect(responseDelete.body.data.)
  })
})


  // it('returns all users', async () => {
  //   const response = await request(server)
  //     .get('/') // get and post operate similarly
  //     .send({ query: '{ users { id name email } }' }) // `users` has to match whats in the query
  //     .expect(200) // status code
  //   // console.log(response.body.data.users)
  //   expect(response.body.data.users.length).toEqual(2)
  // })


