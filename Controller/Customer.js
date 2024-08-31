const { Customer } = require("../Models/Customer");
const multer = require("multer");
const fs = require("fs");
const path = require("path");



const AddCustomer = async (req, res) => {
  

  const { Name, Contact,Items,TotalAmount,SoldBy,BranchName } = req.body;

  try {

    const customer = await Customer.create({
        Name, Contact,Items,TotalAmount,SoldBy,BranchName
    }).then((result) => {
      res.status(200).json(result);
      return result;
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetAllcustomer = async (req, res) => {
  try {
    const branch = await Customer.findAll().then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetSinglecustomer = async(req,res)=>{
  const BranchId = req.params.id
  
  try {

    const Getone = await Customer.findOne({where: {id:BranchId}}).then(result =>{
      res.status(200).json({result})
    })
  } catch (error) {
    res.status(400).json({error:error.message})
  }

}



const DeleteRecord = async (req, res) => {
  try {
    const { id } = req.params;
    
    const branch = await Customer.destroy({
      where: { id },
      cascade: true,
    }).then((result) => {
      res.status(200).json({ message: "Record deleted successfully" });
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
    AddCustomer,
    GetAllcustomer ,
    GetSinglecustomer,
  DeleteRecord 
};
