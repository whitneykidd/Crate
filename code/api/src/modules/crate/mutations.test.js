import request from 'supertest'
import express from 'express'
import schema from '../../setup/schema'
import graphqlHTTP from 'express-graphql'
import authentication from '../../setup/authentication'
import models from '../../setup/models'
import { isType } from 'graphql'



describe('crate mutations', () => {
  let server;
  let token;
  let crateId;

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

  beforeEach(async () => {
    const responseLogin = await request(server)
      .get('/')
      .send({ query: `{userLogin(email: "admin@crate.com", password: "123456" ){token}}` })
      .expect(200)
    token = responseLogin.body.data.userLogin.token
  })

  it('creates a crate', async () => {

    const response = await request(server)
    .post('/')
    .set('Authorization', `Bearer ${token}`)
    .send({query: 
      `mutation {
      crateCreate(name: "crate1", description: "description1")
      {id name description}}`
    })
    .expect(200)

    expect(response.body.data.crateCreate.name).toEqual("crate1")
    expect(response.body.data.crateCreate.description).toEqual("description1")
    crateId = response.body.data.crateCreate.id
  })

  it('updates a crate', async () => {

    const response = await request(server)
      .post('/')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query:
          `mutation {
      crateUpdate(id: ${crateId}, description: "dog")
      {id name description}}`
      })
      .expect(200)
      console.log(response.body.data.crateUpdate)
      // expect(response.body.data.updateCrate)
  })

  it('deletes a crate', async () => {
    const response = await request(server)
      .post('/')
      .set('Authorization', `Bearer ${token}`)
      .send({query: `mutation {crateRemove(id: ${crateId}){id name description}}`})
      .expect(200)
    console.log(response.body.data.crateRemove)
  })

  })