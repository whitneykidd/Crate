import request from 'supertest'
import express from 'express'
import schema from '../../setup/schema'
import graphqlHTTP from 'express-graphql'
import authentication from '../../setup/authentication'
import models from '../../setup/models'
import { isType } from 'graphql'
import bcrypt from 'bcrypt'
import config from '../../config/server.json'
import db from '../../setup/database'




describe('product mutations', () => {

  let server;
  let token;
  let productId;

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
    await models.Product.destroy({ where: {} })
  })

  beforeEach(async () => {
    const adminUser = {
      id: 5,
      name: "adminProduct",
      email: "admin@crate.com",
      password: bcrypt.hashSync('123456', config.saltRounds),
      role: "ADMIN",
      createdAt: new Date(),
      updatedAt: new Date(),
      style: "Casual"
    };

    await models.User.destroy({where: {}});
    await models.User.create(adminUser);
    
    const responseLogin = await request(server)
      .get('/')
      .send({ query: `{userLogin(email: "admin@crate.com", password: "123456" ){token}}` })
      .expect(200)
    token = responseLogin.body.data.userLogin.token
  })

  // afterAll(async () => {
  //   await models.User.destroy({ where: {} });
  // })

  it('creates a product', async () => {

    const response = await request(server)
      .post('/')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query:
          `mutation {
      productCreate(name: "name1", slug: "s1", description: "d1", type: 1, gender: 2, image: "i1")
      {id name slug description type gender image}}`
      })
      .expect(200)

    expect(response.body.data.productCreate.name).toEqual("name1")
    expect(response.body.data.productCreate.slug).toEqual("s1")
    expect(response.body.data.productCreate.description).toEqual("d1")
    expect(response.body.data.productCreate.type).toEqual(1)
    expect(response.body.data.productCreate.gender).toEqual(2)
    expect(response.body.data.productCreate.image).toEqual("i1")
    productId = response.body.data.productCreate.id
  })

  it('updates a product', async () => {
    const responseUpdate = await request(server)
      .post('/')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query:
          `mutation {
      productUpdate(id: ${productId}, name: "name2", slug: "snail", description: "dog", type: 2, gender: 1, image: "none")
      {id name}}`
      })
      .expect(200)


    const responseProduct = await request(server)
      .get('/')
      .send({query: `{productById(productId: ${productId}){name slug description type gender image}}`})
      .expect(200)

    expect(responseProduct.body.data.productById.name).toEqual("name2")
    expect(responseProduct.body.data.productById.slug).toEqual("snail")
    expect(responseProduct.body.data.productById.description).toEqual("dog")
    expect(responseProduct.body.data.productById.type).toEqual(2)
    expect(responseProduct.body.data.productById.gender).toEqual(1)
    expect(responseProduct.body.data.productById.image).toEqual("none")

  })

  it('deletes a product', async () => {
    const response = await request(server)
      .post('/')
      .set('Authorization', `Bearer ${token}`)
      .send({ query: `mutation {crateRemove(id: ${productId}){id name description}}` })
      .expect(200)

  })

})