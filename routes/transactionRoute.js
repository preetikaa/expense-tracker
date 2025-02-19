const express = require('express');
const { addTrans, getallTrans, editTrans, delTrans } = require('../controllers/transactionController');

const router = express.Router();

// Add transaction (POST)
router.post('/add-transaction', addTrans);

// Get all transactions (GET)
router.get('/get-transaction', getallTrans);

// Edit transaction (PUT)
router.put('/edit-transaction/:transactionId', editTrans);

// Delete transaction (DELETE)
router.delete('/delete-transaction/:transactionId', delTrans);

module.exports = router;
