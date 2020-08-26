import request from 'supertest'
import express from 'express'
import schema from '../../setup/schema'
import graphqlHTTP from 'express-graphql'


describe('crate mutations', () => {
  let server;

  beforeAll( async () => { // get the server running and attached for each of our future tests
    server = express();

    server.use(
      '/',
      graphqlHTTP({
        schema: schema, // import the schema
        graphiql: true, // use the graphiql feature
      })
    )
    // const response = await request(server)
    //   .get('/')
    //   .send({query: `{userLogin(email:"admin@crate.com", password: "123456"){
    //     token
    //   }}`})
    //   .expect(200)

      // console.log(auth.user)
  })

  it('is true', () => {
    expect(true).toBe(true)
  })

  // it('returns crates and crate given an ID', async () => {
  //   const response = await request(server)
  //     .get('/')
  //     .send({query: `mutation {crateCreate(name: "c1", description: "d1"){name}}`})
  //     .expect(200)

  //     console.log(response.body.data.crateCreate)

  // })

})
