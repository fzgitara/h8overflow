const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()

mongoose.connect(`mongodb://${process.env.dbuser}:${process.env.dbpass}@ds255539.mlab.com:55539/h8overflow`, (err => {
  if(err){
    console.log('failed connect')
  } else {
    console.log('successfully connect to database')
  }
}))

const users = require('./routes/users')
const questions = require('./routes/questions')
const answers = require('./routes/answers')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use('/users', users)
app.use('/questions', questions)
app.use('/answers', answers)

app.listen(3000, console.log('Aye aye, Captain! We are on 3000'))

module.exports = app