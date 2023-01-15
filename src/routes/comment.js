const express = require('express')

const router = express.Router()

const Comment = require('../models/Comment.js')
const User = require('../models/User.js')

router.get('/', async (req, res) => {
     console.log("Received GET request at /comment")
     const commentHistory = await Comment.find()
     res.status(200).json({msg: commentHistory})
})

router.get('/:ip', async (req, res) => {
     console.log("Received GET request at /comment/:ip")
     console.log("\tVisitor: ", req.params.ip)

     const user = await User.findOne( { ip: req.params.ip })
     if (user) {
          const ip_id = user['_id']
          const personalComment = await Comment.findOne( { ip_id })
          console.log("\tPersonal comment: ", personalComment)
          res.status(200).json({msg: personalComment})
     }
     else {
          res.status(200).json({msg: null})
     }
     
})

router.post('/', async (req, res) => {
     console.log("Received POST request at /comment")
     const { visitor, author, content } = req.body

     console.log("Visitor: ", visitor)
     const currentVisitor = await User.findOne({ ip: visitor })

     const searchedComment = await Comment.findOne({ ip_id: currentVisitor['_id']})

     if (searchedComment) {
          res.status(500).json({msg: 'You had already commented before.'})
     }

     else {
          const newComment = new Comment({author, content, ip_id: currentVisitor['_id']})
          await newComment.save()
          res.status(200).json({msg: 'Comment posted successfully'})
     }
     
})

router.delete('/', async (req, res) => {
     const { visitor } = req.body
     const currentVisitor = await User.findOne({ ip: visitor })
     await Comment.deleteOne({ ip_id: currentVisitor['_id'] })
     res.status(200).json({msg: 'Comment deleted successfully'})
})

router.put('/', async (req, res) => {
     const { visitor, author, content } = req.body
     const currentVisitor = await User.findOne({ ip: visitor })
     await Comment.deleteOne({ ip_id: currentVisitor['_id'] })
     const newComment = new Comment({author, content, ip_id: currentVisitor['_id']})
     await newComment.save() 
     res.status(200).json({msg: 'Comment edited successfully'})
})

module.exports = router
