import request from 'supertest'
import express, { response } from 'express'
import schema from '../../setup/schema'
import graphqlHTTP from 'express-graphql'
import { isType } from 'graphql'
import models from '../../setup/models'
import db from '../../setup/database'

describe('user mutations', () => {
  let server;

  beforeAll( async () => {
    server = express();

    server.use(
      '/',
      graphqlHTTP({
        schema: schema,
        graphiql: true
      })
    )
    await models.User.destroy({ where: {} })
  })

  afterAll(async() => {
    await models.User.destroy({ where: {} })
  })

  it('is true', () => {
    expect(true).toBe(true)
  })

  it('creates updates and deletes user attributes', async() => {
    const responseUserCreate = await request(server)
      .post('/')
      .send({
        query: `mutation{
          userSignup(name:"New User", email:"new_email@email.com", password: "password"){
            name
            style
            id
          }
        }`
      })
      .expect(200)

    expect(responseUserCreate.body.data.userSignup.style).toBe(null)
    expect(responseUserCreate.body.data.userSignup.name).toEqual("New User")
    let userId = responseUserCreate.body.data.userSignup.id

    const responseUserUpdate = await request(server)
      .post('/')
      .send({
        query: `mutation{
          userUpdate(id: ${userId}, style: "Sporty, Casual, Sporty, Sporty, Vintage, Vintage"){
            name
          }
        }`
      })
      .expect(200)
    
    const responseUserOne = await request(server)
      .get('/')
      .send({
        query: `{
          user(id: ${userId}){
            name
            style
          }
        }`
      })
      .expect(200)
    expect(responseUserOne.body.data.user.style).toEqual("Sporty but Vintage with a touch of Casual")
    expect(responseUserOne.body.data.user.name).toEqual("New User")

    const responseUsers1 = await request(server)
      .get('/')
      .send({ query: '{users {name email password } }' })
      .expect(200)

    expect(responseUsers1.body.data.users.length).toEqual(1)

    const responseUserDestroy = await request(server)
      .post('/')
      .send({
        query: `mutation{
          userRemove(id: ${userId}){
            name
          }
        }`
      })

    const responseUsers2 = await request(server)
      .get('/')
      .send({ query: '{users {name email password } }' })
      .expect(200)

    expect(responseUsers2.body.data.users.length).toEqual(0)
  })

  
})


