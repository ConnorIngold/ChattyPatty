const mongoose = require("mongoose") // importing mongoose,
require("dotenv").config() // calls the password from the environment file

mongoose //  constant alias for connection  // connection string to the node.js database
  .connect("mongodb+srv://Eamonn:MnNPCMlZwYyiioLv@eamonn.eh33q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", 
  { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("db connected")) // string outputted if database connection was successful
  .catch((err) => console.log(err)) // error will occur if the database was unsuccessful
