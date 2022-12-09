const mongoose = require('mongoose')

const Schema = mongoose.Schema

const comment = new Schema({
     author: {
          type: String,
          required: true
     },
     content: {
          type: String,
          required: true,
     },
     createdAt: {
          type: Date,
          default: Date.now
     }
})

module.exports = mongoose.model('comment', comment)