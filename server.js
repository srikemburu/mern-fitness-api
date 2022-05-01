const express =  require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require ('dotenv').config()

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

const mongoURI = process.env.MONGODB_URI
mongoose.connect(mongoURI, {
    useNewUrlParser: true }
)

const connection = mongoose.connection

connection.once('open', () => {
    console.log('MongoDB connection established successfully')
})
connection.on('disconnected', () => 
    console.log('MongoDB disconnected')
)

// Load the controllers
const exercisesController = require('./controllers/exercises.js')
const membersController = require('./controllers/members.js')

// Add the controllers as middleware
app.use('/exercises', exercisesController)
app.use('/members', membersController)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})