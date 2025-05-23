const billsModel = require('../models/billsModel');


//add bills
const  addBillsController = async(req,res) => {
    try {
        const newBill = new billsModel(req.body);
        console.log(newBill);
        
        await newBill.save();
        res.json({ success: true, message: 'Bill added' });

    } catch (error) {
        res.send('Something Went Wrong when add data');
        console.log(error);
    }
};

//get bills data
const getBillsController = async (req,res) => {
    try {
        const bills = await billsModel.find();
        res.send(bills);
    } catch (error) {
        console.log(error);
    }
};


module.exports = {
    addBillsController,
    getBillsController
};