const mongoose = require('mongoose')

const Schema = mongoose.Schema

const user = new Schema({
     ip: {
          type: String,
          required: true
     },
})

module.exports = mongoose.model('users', user)