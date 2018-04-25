const express = require('express')
const router = express.Router()
const {create, readAll, update, del, vote} = require('../controllers/answers')

router.post('/:_id', create)
router.get('/', readAll)
router.put('/:_id', update)
router.delete('/:_id', del)
router.put('/:_id/vote', vote)

module.exports = router