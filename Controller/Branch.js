const { Branch } = require("../Models/Branche");
const multer = require("multer");
const fs = require("fs");
const path = require("path");



const AddBranch = async (req, res) => {
  

  const { BranchName, Location } = req.body;

  try {

    const branch = await Branch.create({
        BranchName, Location
    }).then((result) => {
      res.status(200).json(result);
      return result;
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetAllBranch = async (req, res) => {
  try {
    const branch = await Branch.findAll().then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetSingleBranch = async(req,res)=>{
  const BranchId = req.params.id
  
  try {

    const Getone = await Branch.findOne({where: {id:BranchId}}).then(result =>{
      res.status(200).json({result})
    })
  } catch (error) {
    res.status(400).json({error:error.message})
  }

}
  
const UpdateBranch = async (req, res) => {
    const Branchid = req.params.id;
    const { BranchName, Location } = req.body;

  try {
    // Update the database with the new image path
    Branch.update(
      {
        BranchName, Location
      },
      { where: { id: Branchid } }
    )
      .then(() => {
        res.status(200).json({ message: "Record updated successfully" });
      })
      .catch((dbError) => {
        res.status(500).json({ error: dbError.message });
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const DeleteRecord = async (req, res) => {
  try {
    const { id } = req.params;
    
    const branch = await Branch.destroy({
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
    AddBranch,
    GetAllBranch ,
    GetSingleBranch,
  UpdateBranch, 
  DeleteRecord 
};
