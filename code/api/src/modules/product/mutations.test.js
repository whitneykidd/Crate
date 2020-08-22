import request from 'supertest'
import express from 'express'
import schema from '../../setup/schema'
import graphqlHTTP from 'express-graphql'

describe('product mutations', () => {
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

  // *** unable to figure out how to authenticate an admin before creating product....
  it.skip('creates and deletes products', async () => {

    // const response = await request(server)
    //   .post('/')
    //   .send({ query: '{ userLogin(email: "admin@crate.com", password: "123456"){ token user {name}}}' })
    //   .send({ query: `mutation {productCreate(name: "dog" 
    //                                           slug: "this-is-a-dog",
    //                                           description: "This is a Dog",
    //                                           type: 1,
    //                                           gender: 1,
    //                                           image: "www.image.com")
    //                                           { name id}
    //                                         }`})
    //   .expect(200)
    // console.log(`new dog: ${response.body.data.productCreate}`)

    // const responseCreate = await request(server)
    //   .post('/')
    //   .send({query: `mutation {productCreate(name: "dog" 
    //                                           slug: "this-is-a-dog",
    //                                           description: "This is a Dog",
    //                                           type: 1,
    //                                           gender: 1,
    //                                           image: "www.image.com")
    //                                           { name id}
    //                                         }`})
    //   .expect(200)
    //   console.log(`new dog: ${responseCreate.body.data.productCreate}`)
      // let dogID = responseCreate.body.data.productCreate.id

    // const responseDelete = await request(server)
    //   .post('/')
    //   .send({query: `mutation {productRemove(id: ${dogID}){name}}`})
    //   .expect(200)
  })
})
