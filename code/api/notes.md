# Server side testing with Jest and Supertest

If this were a Rails API, what tests would you want to write?
  - Endpoint tests
  - Model tests (user, product, crate, etc..)
    - relationships
    - queries - get
    - mutations - create, update, destroy
    - CRUD (resolvers) - where quereies and mutations are mapped from

Think of every `package.json` as a unique appliocation

GOAL: test query for all `users`, and single `user`

using Jest and Supertest
jest 
  - simple
  - tests will run automatically when changes are made (with the optional --watch)
    - watch for changes, and run again/constantly
  - will run anyfile that ends with `.test.js`
    - can live anywhere, today, its going in the user directory
supertest = make http requests, built in functionality for getting graphql 

What we want to verify when testing endpoints 
- status
- content 
- content-type
- format

SIMPLE SETUP
------------
if we need it in the application, we need it in the test
`index.js` this is the server file (i think)
the server = `express()`
must send it an endpoint
invove the graphql function
send it a schema
graphiql: true

** graphiql ** 
---------------
the interface that allows you to play around on localhost

follow the imports! highlight and press `fn + f12`

from the docs
--------------
// install jest
$ npm install --save-dev jest  //saves it to the development environment

add to package.json file
"test": "jest --watch" 

// install supertest
$ npm install supertest --save-dev

at the top of the test

const request = require('supertest');
const epress - requrire('express');

const app = express(); // express server

--------------------------
ERROR: cannot read property 'database' of undefined 
-> need to setup a test database for postgres
$ psql 
=# CREATE DATABASE crate_test

modify database.json 
copy and modify 'development' for test
NODE_ENV=test npm run setup:db
npm test
-------------------------
ERORR: Cannot log after tests are done. Did you forget to wait for something async in your test?
check database.js in setup
comment that code out!
-----------------------
ERRORL graphqlHTTP is not defined
================================
Link to Docs
jestjs.io/docs/en/getting-started
https://github.com/visionmedia/supertest
https://dev.to/neshaz/testing-graphql-server-in-nodejs-55cm