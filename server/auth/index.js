const express = require("express") // Web api
const router = express.Router() // Importing the routers
const mongoose = require("mongoose")  // Importing mongoose, an object data modelling library for MongoDB

// const db = require("../db/connection")
const User = require("../db/user.model")

router.get("/", (req, res,) => {
  res.json({"msg": "hello word"})
})

router.post("/register", (req, res, next) => { // all index.js files must use router is used 
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
          let admin    = req.body.admin
// added admin 
          let newUser = new User({
            _id: new mongoose.Types.ObjectId(), 
            username: username,
            password: password,
            admin: admin
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

router.post("/login", (req, res, next) => { 
  let username = req.body.username
  let password = req.body.password

  // find a user with the username sent from the client
  User.findOne({
    username: username
  }).then((user) => {
    // if no user found
    if (!user) {
      // then throw an error letting the user know that username doesn't exist
      const error = new Error("That username is doesn't exist")
      // 404 means user doesn't exist
      res.status(404)
      next(error)
    } else {
      // else the username exists and need to check the password 
      // sent to us matches the password in the database
      if (user.password === password) {
        return res.json(user._id).status(200)
      } else {
        const error = new Error("The username was correct but password is incorrect")
        // 404 means user doesn't exist
        res.status(404)
        next(error)
      }
    }
  }).catch(err => console.log(err))
})


router.get('/findAll', (req, res) => {

  User.find().then(user => {
    res.json(user)
  })

})
module.exports = router // exporting the router for other files to access, the router muse also imports in other files