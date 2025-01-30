const express = require('express')
const { addTrans, getallTrans, editTrans, delTrans } = require('../controllers/transactionController')

//router object
const router = express.Router()

//routes
//add transaction POST method
router.post('/add-transaction', addTrans)


router.post('/edit-transaction', editTrans)


router.post('/delete-transaction', delTrans)

//get transaction
router.post('/get-transaction', getallTrans)


module.exports = router;