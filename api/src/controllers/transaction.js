const Transaction = require('../models/transaction');

async function get(req, res, next) {
    const { travellerAddress } = req.params;
    try {
        const transactions = await Transaction.find({ travellerAddress }).populate('imageId');
        res.status(200).send(transactions);
    } catch (e) {
        console.error(e);
        res.status(400).send(e);
    }
}

async function post(req, res, next) {
    const transaction = new Transaction(req.body);

    try {
        await transaction.save();
        res.status(201).send(transaction);
    } catch (e) {
        console.error(e);
        res.status(400).send(e);
    }
}

async function patch(req, res, next) {
    const { id } = req.params;
    try {
        const transaction = await Transaction.findByIdAndUpdate(id, {$set: {approval: req.body.approval}});
        res.send(transaction);
    } catch(e) {
        console.error(e);
        res.status(400).send(e);
    }
}

module.exports = {
    get,
    post,
    patch
}