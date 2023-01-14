const express = require('express')

const router = express.Router()

const User = require('./models/User')

router.get('/', async (req,res) => {
     res.status.json({msg: 'Welcome'})
})

router.post('/', async (req, res) => {
     console.log("Received POST request at /welcome")
     const { visitor } = req.body

     console.log("\tVisitor: ", visitor)
     const currentVisitor = await User.findOne({ ip: visitor })
     if (currentVisitor) {
          res.status(200).json({msg: 'You have visited before.'})
     }

     else {
          const newUser = new User({ ip: visitor })
          await newUser.save()
          res.status(200).json({msg: 'New user ip has been stored.'})
     }
     
})

module.exports = router