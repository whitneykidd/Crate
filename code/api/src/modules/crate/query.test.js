import request from 'supertest'
import express from 'express'
import schema from '../../setup/schema'
import graphqlHTTP from 'express-graphql'


describe('user mutations', () => {
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

  // afterAll(async done => {
  //   dbConnection.close();
  //   done();
  // })

  it('is true', () => {
    expect(true).toBe(true)
  })

  it('returns crates and crate given an ID', async () => {
    const responseAll = await request(server)
      .get('/')
      .send({ query: `{crates (orderBy: "asc") {id name description}}`})
      .expect(200)

      expect(responseAll.body.data.crates.length).toEqual(6)
      expect(responseAll.body.data.crates[0].name).toEqual("Clothes for Men")
      expect(responseAll.body.data.crates[0].description).toEqual("A monthly supply of trendy clothes for men.")
      let crateId = responseAll.body.data.crates[0].id

    const responseOne = await request(server)
      .get('/')
      .send({ query: `{crateById (crateId: ${crateId}) {id name description}}`})
      .expect(200)

    expect(responseOne.body.data.crateById.name).toEqual("Clothes for Men")
    expect(responseOne.body.data.crateById.description).toEqual("A monthly supply of trendy clothes for men.")
    expect(responseOne.body.data.crateById.id).toEqual(crateId)
  })

})


  // it('creates, updates style, and deletes new user', async () => {
  //   // create a new user - default has style === null
  //   const responseCreate = await request(server)
  //     .post('/')
  //     .send({
  //       query: `mutation { userSignup(name: "dog", 
  //                                   email: "dog@dog.com", 
  //                                   password: "dog") 
  //                                   { id name style}}`})
  //     .expect(200)

  //   expect(responseCreate.body.data.userSignup.name).toEqual("dog")
  //   expect(responseCreate.body.data.userSignup.style).toEqual(null)
  //   let userID = responseCreate.body.data.userSignup.id
