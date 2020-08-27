import request from 'supertest'
import express from 'express'
import schema from '../../setup/schema'
import graphqlHTTP from 'express-graphql'
import authentication from '../../setup/authentication'
import models from '../../setup/models'
import { isType } from 'graphql'



describe('crate mutations', () => {
  let server;

  beforeAll(async () => { // get the server running and attached for each of our future tests
    server = express();

    server.use(authentication);

    server.use(
      '/',
      graphqlHTTP(request => ({
        schema: schema, // import the schema
        graphiql: true,
        context: {
          auth: {
            user: request.user,
            isAuthenticated: request.user && request.user.id > 0
          }
        }
      })
    )
    )

  })

  it('updates a crate', async () => {
    const responseLogin = await request(server)
      .get('/')
      .send({ query: `{userLogin(email: "admin@crate.com", password: "123456" ){token}}` })
      .expect(200)
    const token = responseLogin.body.data.userLogin.token
    console.log(token)

    const response = await request(server)
    .post('/')
    .set('Authorization', `Bearer ${token}`)
    .send({query: 
      `mutation {
      crateCreate(name: "crate1", description: "description1")
      {id name description}}`
    })
    .expect(200)
    console.log(response.headers)

    console.log(response.body)
  })

  })