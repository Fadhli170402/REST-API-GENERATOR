import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import System from './src/system/routes/System.js'
import LoadModel from './src/models/LoadModels.js'
import LoadMiddlewares from './src/middlewares/LoadMiddlewares.js'



const env = dotenv.config().parsed
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Database Connection
mongoose.connect(`mongodb://localhost:27017/${env.DB_NAME}`)

const db = mongoose.connection;
db.on('error', (err) => {
    console.error(err)
})
db.on('open', (err) => {
    console.log('Database Connected')
})

// Router System
app.use(System)

// Middleware
app.use(LoadMiddlewares)

// Load Model & Routes
app.use(LoadModel)


app.listen(env.PORT, () => {
    console.log(`Listening Port ${env.PORT}`)
})