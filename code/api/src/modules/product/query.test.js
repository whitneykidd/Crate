import request from 'supertest'
import express from 'express'
import schema from '../../setup/schema'
import graphqlHTTP from 'express-graphql'


describe('product queries', () => {
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

  it('returns all products', async () => {
    const response = await request(server)
      .get('/')
      .send({ query: '{products {id name slug description type gender image}}'})
      .expect(200)
    // console.log(response.body.data.products)
      expect(response.body.data.products.length).toEqual(8)
      expect(response.body.data.products[0].name).toEqual('T-Shirt for Men - Grey')
  })

  it('returns products by slug, id, related', async () => {
    const responseSlug = await request(server)
      .get('/')
      .send({ query: '{ product(slug: "watch-for-women") { id name}}'})
      .expect(200) 

      expect(responseSlug.body.data.product.name).toEqual('Watch for Women')
      let watchID = responseSlug.body.data.product.id

    const responseID = await request(server)
      .get('/')
      .send({ query: `{ productById(productId: ${watchID}) { id name }}`})
      .expect(200)
      
      // console.log(responseID.body)
      expect(responseID.body.data.productById.id).toEqual(watchID)
      expect(responseID.body.data.productById.name).toEqual('Watch for Women')

      // related products throws an error because 'funciton rand() does not exist'
  })

  it('returns product types', async () => {
    const response = await request(server)
      .get('/')
      .send({ query: '{ productTypes{ name id }}'})
      .expect(200)

      expect(response.body.data.productTypes.length).toEqual(2)
      expect(response.body.data.productTypes[0].name).toEqual('Cloth')
      expect(response.body.data.productTypes[1].name).toEqual('Accessories')
  })
})