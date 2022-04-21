const express = require("express")
const morgan = require("morgan") // morgan logs HTTPS requests and Responses

const app = express()

// const auth = require("./auth/index.js")
const auth = require("./auth") // importing the router

const notes = require('./routes/notes.js')

const cors = require("cors")




require("dotenv").config()
require("./db/connection")

app.use(morgan("dev"))
app.use(express.json())

app.get("/", (req, res) => { // get request 
  res.json({
    "message": "🦄🌈✨  Hello World!   🌈✨🦄",
  })
})

app.use(  
  cors(),
)

app.use( "/auth", auth) // uses /auth makes post requests e.g./auth/signup

app.use('/api/v1/notes', notes)

const notFound = (req, res, next) => {
  res.status(404)
  const error = new Error("Not Found - " + req.originalUrl)
  next(error)
}

const errorHandler = (err, req, res, next) => {
  res.status(res.statusCode || 500)
  res.json({
    message: err.message,
    stack: err.stack,
  })
}

app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log("Listening on port", port)
})

