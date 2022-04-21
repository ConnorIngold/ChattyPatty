const express = require("express") // Web api
const router = express.Router() // Importing the routers
const mongoose = require("mongoose")  // Importing mongoose, an object data modelling library for MongoDB

// const db = require("../db/connection")
const User = require("../db/user.model")

router.get("/", (req, res,) => {
  res.json({"msg": "hello word"})
})

router.post("/signup", (req, res, next) => { // all index.js files must use router is used 
    // username is unique
    User.findOne({
      username: req.body.username,
    }).then((user) => {
      if (user) {
        // if there is a user return a error
        const error = new Error("That username is already in use")
        res.status(409)
        next(error)
      } else {
          let username = req.body.username
          let password = req.body.password
         
          let newUser = new User({
            _id: new mongoose.Types.ObjectId(), 
            username: username,
            password: password,
            
          })

          newUser.save((err, newUser) => {
            if (err) {
              return res.send({
                success: false,
                message: "Server error: " + err,
              })
            }
            // else
            return res.json(newUser).status(200)
          })

      }
    }).catch(err => console.log(err))
  
})
router.get('/findAll', (req, res) => {

  User.find().then(user => {
    res.json(user)
  })

})
module.exports = router // exporting the router for other files to access, the router muse also imports in other files