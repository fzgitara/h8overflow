const mongoose = require('mongoose')

const Schema = mongoose.Schema

const questionSchema = new Schema ({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: String,
  text: String,
  votes: [],
  answers: []
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question