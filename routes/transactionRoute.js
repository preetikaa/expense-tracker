const express = require('express')
const { addTrans, getallTrans } = require('../controllers/transactionController')

//router object
const router = express.Router()

//routes
//add transaction POST method
router.post('/add-transaction', addTrans)

//get transaction
router.get('/get-transaction', getallTrans)


module.exports = router;