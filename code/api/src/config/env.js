// Imports
import dotenv from 'dotenv'

// Load .env
// I used dotenv in a sinatra microservice to setup environment varibales. Maybe this is related
dotenv.config()

// Environment
export const NODE_ENV = process.env.NODE_ENV

// Port
// Crate uses localhost:8000 for its api endpoint
export const PORT = process.env.PORT || 8000
