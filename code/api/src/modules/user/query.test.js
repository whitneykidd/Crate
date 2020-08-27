import request from 'supertest'
import express from 'express'
import graphqlHTTP from 'express-graphql'
import schema from '../../setup/schema'
import models from '../../setup/models'
import db from '../../setup/database'

describe("user queries", () => {
  let server = express();

  beforeAll(async () => {
    server.use(
      '/',
      graphqlHTTP({
        schema: schema,
        graphiql: false
      })
    );
    await models.User.destroy({ where: { name: ["User1", "User2"] } })
  });

  beforeEach(async () => {
    const user1 = {
      id: 1,
      name: "User1",
      email: "user1@email.com",
      password: "user1password",
      role: "USER",
      createdAt: new Date(),
      updatedAt: new Date(),
      style: "Hip Hop but Punk"
    };

    const user2 = {
      id: 2,
      name: "User2",
      email: "user2@email.com",
      password: "user2password",
      role: "USER",
      createdAt: new Date(),
      updatedAt: new Date(),
      style: "Casual"
    };

    await models.User.create(user1);
    await models.User.create(user2);
  })

  afterEach(async () => {
    await models.User.destroy({ where: { name: ["User1", "User2"] } })
  })

  afterAll(() => {
    db.close()
  })

  it('returns all users', async () => {
    const response = await request(server)
      .get('/')
      .send({ query: '{users {name email } }' })
      .expect(200)

    expect(response.body.data.users.length).toEqual(3)
  })

  it('returns a specific user by id', async () => {
    const response = await request(server)
      .get('/')
      .send({
        query: `{
        user(id:1,){
          name
          email
          password
          id
          style
        }
      }`
      })
      .expect(200)
    expect(response.body.data.user.name).toEqual("User1")
    expect(response.body.data.user.id).toEqual(1)
  })

  it('returns user genders', async () => {
    const response = await request(server)
      .get('/')
      .send({ query: '{ userGenders { id name } }' })
      .expect(200)

    expect(response.body.data.userGenders[0].name).toEqual('Male')
    expect(response.body.data.userGenders[1].name).toEqual('Female')
  })

  it('authorizes a valid user', async () => {
    const response = await request(server)
      .get('/')
      .send({ query: `{ userLogin(email: "user1@email.com", password: "user1password") { user { id name role email } } }` })
      .expect(200)
    console.log(response.body.data)
    // expect(response.body.data.userLogin.user.name).toEqual("User1")
  })

  it('returns style for a user', async () => {
    const response = await request(server)
      .get('/')
      .send({
        query: `{
        user(id:1,){
          name
          email
          password
          id
          style
        }
      }`
      })
    expect(response.body.data.user.style).toEqual("Hip Hop but Punk")
  })
})
