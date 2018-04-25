const User = require('../models/users')
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)
const jwt = require('jsonwebtoken')

module.exports = {
  register (req, res) {
    const hash = bcrypt.hashSync(req.body.password, salt)
    const user = new User()
    user.name = req.body.name
    user.email = req.body.email
    user.password = hash
    const token = jwt.sign({email: user.email, _id: user._id, name: user.name}, process.env.secret)
    user.save()
    .then(data => {
      res.status(201).json({
        message: 'Register success',
        data,
        token
      })
    })
  },
  login (req, res) {
    User.findOne({email: req.body.email})
    .exec()
    .then(user => {
      if(user){
        const check = bcrypt.compareSync(req.body.password, user.password)
        const token = jwt.sign({email: user.email, _id: user._id, name: user.name}, process.env.secret)
        if(check){
          res.status(200).json({
            message: 'Login success',
            user,
            token
          })
        } else {
          res.status(409).json('Wrong password')
        }
      } else {
        res.status(409).json('Email not found')
      }
    })
  }
}