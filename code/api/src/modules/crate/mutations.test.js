import request from 'supertest'
import express from 'express'
import schema from '../../setup/schema'
import graphqlHTTP from 'express-graphql'


describe('crate mutations', () => {
  let server;

  beforeAll(() => { // get the server running and attached for each of our future tests
    server = express();

    server.use(
      '/',
      graphqlHTTP({
        schema: schema, // import the schema
        graphiql: true, // use the graphiql feature
      })
    )
  })

  it('is true', () => {
    expect(true).toBe(true)
  })

  it('returns crates and crate given an ID', async () => {
    // need to figure out how to authenticate a user before doing 
    // ANYTHING to a crate

  })

})
