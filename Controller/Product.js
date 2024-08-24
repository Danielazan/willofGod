const { Product } = require("../Models/Products");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

const AddProducts = async (req, res) => {
  const image = req.file;

  const { Name,Quantity, Previous_Qty, NewQtyAdded } = req.body;

  try {
   
    if (!image) {
      const error = new Error("Please upload a file");
      error.status = 400;
      throw error;
    }
    console.log(image);

    const products = await Product.create({
        Name,
        Quantity, 
        Previous_Qty:0, 
        NewQtyAdded:Quantity,
      ImagePath: image.filename,
    }).then((result) => {
      res.status(200).json(result);
      return result;
    });

    
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll()
    .then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// const GetSingleMachine = async (req, res) => {
//   const Machineid = req.params.id;
//   let Modles;
//   try {
//     const GetModels = await MachineModel.findAll({
//       where: { MachineId: Machineid },
//     }).then((result) => {
//       // res.status(200).json(result)
//       Modles = result;
//     });
//     const Getone = await Machine.findOne({ where: { id: Machineid } }).then(
//       (result) => {
//         res.status(200).json({ result, Modles });
//       }
//     );
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// const UpdateMachine = async (req, res) => {
//   try {
//     const image = req.file;
//     const { Id } = req.params;
//     const { Name, Description } = req.body;

//     // if (!image) {
//     //   const error = new Error('Please upload a file');
//     //   error.status = 400;
//     //   throw error;
//     // }

//     const machine = await Machine.update(
//       { Name, Description },
//       { where: { id: Id } }
//     ).then((result) => {
//       res.status(200).json({ message: "Record updated Successfully" });
//     });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// const DeleteRecord = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await Machine.destroy({
//       where: { id },
//       cascade: true,
//     }).then((result) => {
//       res.status(200).json({ message: "Record deleted successfully" });
//     });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

module.exports = {
    AddProducts,
    upload,
    GetAllProducts
};
