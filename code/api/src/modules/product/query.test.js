import request from 'supertest'
import express from 'express'
import schema from '../../setup/schema'
import graphqlHTTP from 'express-graphql'
import models from '../../setup/models'


describe('product quereis', () => {
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
    const product1 = {
      name: "name1",
      slug: "slug1",
      type: 1,
      gender: 1,
      description: "desc1"
    }

    const product2 = {
      name: "name2",
      slug: "slug2",
      type: 2,
      gender: 2,
      description: "desc2"
    }

    await models.Product.create(product1)
    await models.Product.create(product2)
  })

  afterEach( async () => {
    await models.Product.destroy({ where: { name: ["name1", "name2"] } });
  })

  afterAll(() => {
    db.close();
  })

  it('returns all products and products by ID', async () => {
    const responseAll = await request(server)
      .get('/')
      .send({ query: `{products {id name slug type gender description }}`})
      .expect(200)

    expect(responseAll.body.data.products.length >= 2).toBe(true)

    expect(responseAll.body.data.products[0].name).toEqual("name2")
    expect(responseAll.body.data.products[0].slug).toEqual("slug2")
    expect(responseAll.body.data.products[0].type).toEqual(2)
    expect(responseAll.body.data.products[0].gender).toEqual(2)
    expect(responseAll.body.data.products[0].description).toEqual("desc2")
    let productId = responseAll.body.data.products[0].id

    const responseOne = await request(server)
      .get('/')
      .send({query: `{productById(productId: ${productId}){id name }}`})
      .expect(200)

      expect(responseOne.body.data.productById.name).toEqual("name2")
      expect(responseOne.body.data.productById.id).toEqual(productId)
  })
  //'t-shirt-for-men-grey'
  // it('returns crates and crate given an ID', async () => {
  //   const responseAll = await request(server)
  //     .get('/')
  //     .send({ query: `{crates (orderBy: "asc") {id name description}}` })
  //     .expect(200)

  //   expect(responseAll.body.data.crates.length).toEqual(6)
  //   expect(responseAll.body.data.crates[0].name).toEqual("Clothes for Men")
  //   expect(responseAll.body.data.crates[0].description).toEqual("A monthly supply of trendy clothes for men.")
  //   let crateId = responseAll.body.data.crates[0].id

  //   const responseOne = await request(server)
  //     .get('/')
  //     .send({ query: `{crateById (crateId: ${crateId}) {id name description}}` })
  //     .expect(200)

  //   expect(responseOne.body.data.crateById.name).toEqual("Clothes for Men")
  //   expect(responseOne.body.data.crateById.description).toEqual("A monthly supply of trendy clothes for men.")
  //   expect(responseOne.body.data.crateById.id).toEqual(crateId)
  // })

})
