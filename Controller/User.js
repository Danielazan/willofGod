const UserModel = require("../Models/User.js")
const multer = require('multer');
const fs = require('fs');
const path = require('path');


const CreateUser=async(req, res) => {
  
    const {username,password,Branch}= req.body
  
    try {
      
        const user = await UserModel.create({
            username,
            password,
            Branch,
            access:"view",
            status:"deactived"
        
        }).then(result =>{
          
          res.status(200).json(result)
          return result
        })
  
        
        // res.send(file)
    } catch (error) {
      res.status(400).json({error:error.message})
    }
    ;
  }



const GetAllUser = async (req,res)=>{
    try {
      const user = await UserModel.findAll()
      
      .then(result =>{
        
        res.status(200).json(result)
      })
    } catch (error) {
      res.status(400).json({error:error.message})
    }
  }


  const GetSingleUser = async(req,res)=>{
    const UserName = req.params.Name
    
    try {
  
      const Getone = await UserModel.findOne({where: {username:UserName}}).then(result =>{
        res.status(200).json({result})
      })
    } catch (error) {
      res.status(400).json({error:error.message})
    }

  }


  const UpdateUser = async (req, res) => {
    try {
      const {Id} =req.params
    const {username,access,status}= req.body
  
  
      const UserModel = await UserModel.update(
        { username,access,status },
        { where: { id: Id } }
      ).then(result =>{
        res.status(200).json({message:"Record updated Successfully"})
      })
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };


  const DeleteRecord = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await UserModel.destroy({
        where: { id },
        cascade: true,
      }).then(result =>{
        res.status(200).json({ message: 'Record deleted successfully' });
      })
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  module.exports={
    CreateUser,
    GetAllUser,
    GetSingleUser ,
    UpdateUser,
    DeleteRecord,
  
}

  
  