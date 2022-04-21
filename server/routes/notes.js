const express = require('express')

const mongoose = require('mongoose')
const Note = require('../db/note.model')

const router = express.Router()

router.post('/', (req, res) => {

  const newNote = new Note({
    _id: new mongoose.Types.ObjectId(),
    user_id: req.body.user_id,
	title: req.body.title,
	note: req.body.note,
  })

  console.log('User id: ', newNote)
  newNote.save((err, newNote) => {
    if (err) {
      return res.send({
        success: false,
        message: 'Server error: ' + err,
      })
    }
    console.log('note: ', newNote)
    res.status(200).json(newNote)
  })

})
router.get('/note', (req, res) => {
	const user_id = req.query.user_id
	Note.find({ user_id: user_id })
	  .then(result => {
		console.log(result)
		res.send(result)
	  })
	  .catch(err => {
		console.log(err)
	  })
  })

  router.get('/allnotes', (req, res) => {
	Note.find()
	  .then(result => {
		console.log(result)
		res.send(result)
	  })
	  .catch(err => {
		console.log(err)
	  })
  })
module.exports = router