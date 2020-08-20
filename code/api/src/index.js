/* code-annotations-wk
  This file imports express for backend application use,
  imports necessary files to configure and start server & GraphQL
*/
// Imports
import express from 'express'

// App Imports
import setupLoadModules from './setup/load-modules'
import setupGraphQL from './setup/graphql'
import setupUpload from './setup/upload'
import setupStartServer from './setup/start-server'

// Create express server
const server = express()

// Setup load modules
setupLoadModules(server)

// Setup uploads
setupUpload(server)

// Setup GraphQL
setupGraphQL(server)

// Start server
setupStartServer(server)
