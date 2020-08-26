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

  it('returns product by slug', async () => {
    const response = await request(server)
      .get('/')
      .send({ query: `{product(slug: "slug1") {id name slug type gender description }}` })
      .expect(200)

    expect(response.body.data.product.name).toEqual("name1")
    expect(response.body.data.product.slug).toEqual("slug1") 
  })

  it('returns product types', async () => {
    const response = await request(server)
      .get('/')
      .send({ query: `{productTypes{name id}}` })
      .expect(200)

    expect(response.body.data.productTypes.length).toEqual(2)
    expect(response.body.data.productTypes[0].id).toEqual(1)
    expect(response.body.data.productTypes[0].name).toEqual("Cloth")
    expect(response.body.data.productTypes[1].id).toEqual(2)
    expect(response.body.data.productTypes[1].name).toEqual("Accessories")
  })

})
