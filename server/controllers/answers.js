const Answer = require('../models/answers')
const Question = require('../models/questions')
const jwt = require('jsonwebtoken')

module.exports = {
  create (req, res) {
    Question.findOne({_id: req.params._id})
    .then(question => {
      const decoded = jwt.verify(req.headers.token, process.env.secret)
      const answer = new Answer
      answer.user = decoded._id
      answer.question = question._id
      answer.text = req.body.text
      answer.save()
      question.answers.push(answer)
      question.save()
      .then(data => {
        res.status(201).json({
          message: 'Add new answer',
          data
        })
      })
    })
  },
  readAll (req, res) {
    Answer.find()
    .populate('user', 'question')
    .exec()
    .then(data => {
      res.status(200).json({
        message: 'All answers',
        data
      })
    })
  },
  update (req, res) {
    Answer.findOne({_id: req.params._id})
    .then(answer => {
      Answer.update({_id: req.params._id}, {$set: req.body}, {upsert: true})
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
        message: 'Answer not found',
        error
      })
    })
  },
  del (req, res) {
    Answer.remove({_id: req.params._id})
    .then(answer => {
      res.status(200).json('Answer deleted')
    })
  },
  vote (req, res) {
    Answer.findOne({_id: req.params._id})
    .then(answer => {
      const decoded = jwt.verify(req.headers.token, process.env.secret)
      answer.votes.push(decoded)
      answer.save()
      res.status(200).json({
        message: 'Vote success',
        answer
      })
    })
  }
}