const transactionModel = require('../models/transactionModel')

const getallTrans = async(req,res) => {
    try {
        const transactions = await transactionModel.find({userid:req.body.userid})
        res.status(200).json(transactions)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}
const addTrans = async(req,res) => {
    try {
        const newTrans = new transactionModel(req.body)
        await newTrans.save()
        res.status(201).send("Transaction created")
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
        
    }
}

module.exports = {getallTrans, addTrans};