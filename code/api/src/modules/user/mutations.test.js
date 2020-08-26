import request from 'supertest'
import express, { response } from 'express'
import schema from '../../setup/schema'
import graphqlHTTP from 'express-graphql'
import { isType } from 'graphql'

describe('user mutations', () => {
  let server;
  beforeAll(() => {
    server = express();
    server.use(
      '/',
      graphqlHTTP({
        schema: schema,
        graphiql: true,
      })
    )
  })
  it('is true', () => {
    expect(true).toBe(true)
  })


  it('creates a user', async () => {
    const responseCreate = await request(server)
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

    let userId = responseCreate.body.data.userSignup.id
    const responseDestroy = await request(server)
      .post('/')
      .send({
        query: `mutation{
          userRemove(id: ${userId}){
            name
          }
        }`
      })
  })
    
  it('updates a user attributes', async() => {
    const responseCreate = await request(server)
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

    expect(responseCreate.body.data.userSignup.style).toBe(null)
    expect(responseCreate.body.data.userSignup.name).toEqual("New User")
    let userId = responseCreate.body.data.userSignup.id

    const responseUpdate = await request(server)
      .post('/')
      .send({
        query: `mutation{
          userUpdate(id: ${userId}, style:"Sporty, Casual, Sporty, Sporty, Vintage, Vintage"){
            name
          }
        }`
      })
      .expect(200)
    
    const responseUser = await request(server)
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
    expect(responseUser.body.data.user.style).toEqual("Sporty but Vintage with a touch of Casual")
    expect(responseUser.body.data.user.name).toEqual("New User")

    const responseDestroy = await request(server)
      .post('/')
      .send({
        query: `mutation{
          userRemove(id: ${userId}){
            name
          }
        }`
      })
  })
})


