// MongoDB account: lnthuy29012002 && Lnthuy@29012002. 
// API key: ZEzQH9v0tPTZARXhfoB6g6gz6WA4t62JuwkeZbLoEkVHpUSAvZ1mfvluSWblaUg8

const express = require('express')
const cors = require('cors')

SERVER = express()
SERVER.use(cors())
SERVER.use(express.json())

const PORT = 3001 || process.env.PORT

const mongoose = require('mongoose')
mongoose.set('strictQuery', true)
const connectDB = async () => {
     try {
          await mongoose.connect('mongodb+srv://lnthuy29012002:Lnthuy29012002@my-portfolio.fwhehmb.mongodb.net/?retryWrites=true&w=majority', 
               {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
               }
          )
          console.log('MongoDB connected.')
     }
     catch (error) {
          console.log(error.message)
          process.exit(1)
     }
}
connectDB()

const comment = require('./routes/comment')
SERVER.use('/comment', comment)

SERVER.listen(PORT, () => console.log("Server is listening on port", PORT))