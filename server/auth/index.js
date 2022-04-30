const express = require("express") // Web api
const router = express.Router() // Importing the routers
const mongoose = require("mongoose")  // Importing mongoose, an object data modelling library for MongoDB

// const db = require("../db/connection")
const User = require("../db/user.model")

router.get('/test', (req, res) => {
  // get token from the headers
  res.send("Hello from auth")
})


// router.get('/user_id', (req, res) => {
//   // get user id from the query parameter
//   User.findOne({
//     _id: req.query.id,
//   }).then((result) => {
//     res.status(200).send("Authenticated:" + result)
//   }).catch((err) => {
//     res.status(401).send("Auth error: " + err)
//   });

// })


router.get('/user_id', (req, res) => {
  // get user id from the query parameter
  User.findOne({
    _id: req.query.id,
  }).then((result) => {
    if (result) {
      res.status(200).json(result)
    } else {
      res.status(401).json({"Auth error: ": err})
    }
  }).catch((err) => {
    res.status(401).json({"Auth error: ": err})
  });
})

router.get('/a', (req, res) => {
  // get user id from the query parameter
  User.find().then((result) => {
    if (result) {
      res.status(200).json(result)
    } else {
      res.status(401).json({"Auth error: ": err})
    }
  }).catch((err) => {
    res.status(401).json({"Auth error: ": err})
  });
})



// router.get('/user_id', (req, res) => {
//   // get user id from the query parameter
//   console.log("a", req.query.user_id);
//   User.findOne({
//     _id: req.query.user_id,
//   }).then((result) => {
//     if (result) {
//       res.status(200).send("Authenticated: ")
//     } else {
//       res.status(401).send("Db Auth error: " + err)
//       console.log("🚀 ~ file: index.js ~ line 23 ~ router.get ~ status")
//       // 
//     }
//   }).catch((err) => {
//     res.status(401).json({"Auth error: ": err, "mesage": "a"})
//     console.log("🚀 ~ file: index.js ~ line 28 ~ router.get ~ status")

//   });

// })

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
        return res.status(200).json(user._id)
      } else {
        const error = new Error("The username was correct but password is incorrect")
        res.status(401)
        next(error)
      }
    }
  }).catch(err => console.log(err))
})


router.get('/findAll', (req, res) => {
if (req.body.user.admin === true) {
  
  User.find().then(user => {
    res.json(user)
  })
}
})
module.exports = router // exporting the router for other files to access, the router muse also imports in other files