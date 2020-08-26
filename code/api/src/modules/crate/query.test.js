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
    const responseAll = await request(server)
      .get('/')
      .send({ query: `{crates (orderBy: "asc") {id name description}}`})
      .expect(200)

      expect(responseAll.body.data.crates.length >= 6).toBe(true)
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
