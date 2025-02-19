const transactionModel = require('../models/transactionModel');
const moment = require('moment');


const getallTrans = async (req, res) => {
    try {
        const { userid, freq } = req.query; 

        let filter = { userid };

        if (freq && freq !== "all") {
            filter.date = {
                $gt: moment().subtract(Number(freq), 'd').toDate(),
            };
        }

        const transactions = await transactionModel.find(filter);

        res.status(200).json(transactions);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


const editTrans = async (req, res) => {
    try {
        const { transactionId } = req.params; 
        const updatedData = req.body;

        if (!transactionId) {
            return res.status(400).json({ error: "Transaction ID is required" });
        }

        const updatedTransaction = await transactionModel.findByIdAndUpdate(
            transactionId,
            updatedData,
            { new: true }
        );

        if (!updatedTransaction) {
            return res.status(404).json({ error: "Transaction not found" });
        }

        res.status(200).json({ message: "Transaction updated successfully", transaction: updatedTransaction });
    } catch (error) {
        console.error("Error updating transaction:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};



const delTrans = async (req, res) => {
    try {
        const { transactionId } = req.params;

        if (!transactionId) {
            return res.status(400).json({ error: "Transaction ID is required" });
        }

        const deletedTransaction = await transactionModel.findByIdAndDelete(transactionId);

        if (!deletedTransaction) {
            return res.status(404).json({ error: "Transaction not found" });
        }

        res.status(200).json({ message: "Transaction deleted successfully" });
    } catch (error) {
        console.error("Error deleting transaction:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


const addTrans = async (req, res) => {
    try {
        const newTrans = new transactionModel(req.body);
        await newTrans.save();
        res.status(201).send("Transaction created");
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

module.exports = { getallTrans, addTrans, editTrans, delTrans };
