const Question = require('../models/questions')
const jwt = require('jsonwebtoken')

module.exports = {
  create (req, res) {
    const decoded = jwt.verify(req.headers.token, process.env.secret)
    const question = new Question
    question.user = decoded._id
    question.title = req.body.title
    question.text = req.body.text
    question.save()
    .then(data => {
      res.status(201).json({
        message: 'Add new question',
        data
      })
    })
  },
  readAll (req, res) {
    Question.find()
    .populate('user')
    .exec()
    .then(data => {
      res.status(200).json({
        message: 'All questions',
        data
      })
    })
  },
  update (req, res) {
    Question.findOne({_id: req.params._id})
    .then(question => {
      Question.update({_id: req.params._id}, {$set: req.body}, {upsert: true})
      .exec()
      .then(data => {
        res.status(201).json({
          message: 'Update success',
          data
        })
      })
    })
    .catch(error => {
      res.status(409).json({
        message: 'Question not found',
        error
      })
    }
    )
  },
  del (req, res) {
    Question.remove({_id: req.params._id})
    .then(question => {
      res.status(200).json('Question deleted')
    })
  },
  vote (req, res) {
    Question.findOne({_id: req.params._id})
    .then(question => {
      const decoded = jwt.verify(req.headers.token, process.env.secret)
      question.votes.push(decoded)
      question.save()
      res.status(200).json({
        message: 'Vote success',
        question
      })
    })
  }
}