const transactionModel = require('../models/transactionModel')
const moment = require('moment')

const getallTrans = async(req,res) => {
    try {
        const {freq} = req.body
        const transactions = await transactionModel.find({
            date:{
                $gt : moment().subtract(Number(freq), 'd').toDate()
            },
            userid:req.body.userid,
            
        })
        res.status(200).json(transactions)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

const editTrans = async(req,res) =>{
    try {
        await transactionModel.findOneAndUpdate(
            { _id:req.body.transactionsWithKeys}, 
            req.body.payload)
        res.status(200).send("Edit successful")
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
        
    }
}

const delTrans = async(req,res) => {
    try {
        await transactionModel.findOneAndDelete({_id:req.body.transactionsWithKeys})
        res.status(200).send("Delete successful")
    } catch (error) {
        console.log(error);
        res.status(500).json(500)
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

module.exports = {getallTrans, addTrans, editTrans, delTrans};