import request from 'supertest'
import express from 'express'
import schema from '../../setup/schema'
import graphqlHTTP from 'express-graphql'
import models from '../../setup/models'
import { dedentBlockStringValue } from 'graphql/language/blockString'


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
  })

  beforeEach( async () => {
    const crate1 = {
      name: "crate1",
      description: "description1"
    }

    const crate2 = {
      name: "crate2",
      description: "description2"
    }

    await models.Crate.create(crate1);
    await models.Crate.create(crate2);
  })

  afterEach( async () => {
    await models.Crate.destroy({ where: {name: ["crate1", "crate2"]} })
  })

  afterAll( async () => {
    db.close();
  })


  it('returns crates and crate given an ID', async () => {
    const responseAll = await request(server)
      .get('/')
      .send({ query: `{crates (orderBy: "asc") {id name description}}`})
      .expect(200)

      expect(responseAll.body.data.crates.length >= 2).toBe(true)
      let length = responseAll.body.data.crates.length

      expect(responseAll.body.data.crates[length-1].name).toEqual("crate2")
      expect(responseAll.body.data.crates[length-1].description).toEqual("description2")
      let crateId = responseAll.body.data.crates[length-1].id

    const responseId = await request(server)
      .get('/')
      .send({query: `{crateById(crateId: ${crateId}){ id name description}}`})
      .expect(200)

      expect(responseId.body.data.crateById.id).toEqual(crateId)
      expect(responseId.body.data.crateById.name).toEqual("crate2")
      expect(responseId.body.data.crateById.description).toEqual("description2")
  })

})
