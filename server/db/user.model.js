const mongoose = require("mongoose") 

const Schema = mongoose.Schema // connection to the database following the mongoose from the connection.js file

const UserSchema = new Schema( // the schema for the database users, consists of username and password
  {
    _id: mongoose.Schema.Types.ObjectId,
    username: {  // username attribute fields 
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    password: { // password attribute fields 
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("User", UserSchema) // export the User model with its attributes to be used inside env/index.js 
