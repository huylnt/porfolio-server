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
     },
     ip_id: {
          type: Schema.Types.ObjectId,
          ref: 'userIPs'
     }
})

module.exports = mongoose.model('comments', comment)
