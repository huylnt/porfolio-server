require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const PORT = 3001 || process.env.PORT

SERVER = express()
SERVER.use(express.json())
SERVER.use(cors())


mongoose.set('strictQuery', true)
const connectDB = async () => {
     await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@my-portfolio.fwhehmb.mongodb.net/?retryWrites=true&w=majority`,
          {
               useNewUrlParser: true,
               useUnifiedTopology: true,
          }
     ).then(() => console.log('MongoDB connected.'))
     .catch(error => {
          console.log(error.message)
          process.exit(1)
     })
}
connectDB()

const commentRouter = require('./routes/comment')
SERVER.use('/comment', commentRouter)

const welcomeRouter = require('./routes/welcome')
SERVER.use('/welcome', welcomeRouter)

SERVER.listen(PORT, () => console.log('Server is listening on port', PORT))