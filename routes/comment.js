const express = require('express')

const router = express.Router()

const Comment = require('../models/comment')

router.post('/', async (req, res) => {
     console.log("Received POST request at /comment")
     const { author, content } = req.body
     const newComment = new Comment({author, content})
     await newComment.save()
     res.status(200).json({msg: 'Comment posted successfully'})
})

router.get('/', async (req, res) => {
     console.log("Received GET request at /comment")
     const commentHistory = await Comment.find()
     res.status(200).json({msg: commentHistory})
})

module.exports = router