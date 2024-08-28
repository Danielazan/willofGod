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

  const { Name, Quantity, Previous_Qty, NewQtyAdded } = req.body;

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
      Previous_Qty: 0,
      NewQtyAdded: Quantity,
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
    const products = await Product.findAll().then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const UpdateQuantity = async (req, res) => {
  const { productid,Quantity } = req.body;

  try {
    // Fetch the existing product to get the current image path
    const preproduct = await Product.findOne({ where: { id: productid } });

    if (!preproduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    Previous_ProductQty = await preproduct.Quantity;

    // Update the database with the new image path
    Product.update(
      {
        Quantity: preproduct.Quantity + Quantity,
        Previous_Qty: Previous_ProductQty,
        NewQtyAdded: Quantity,
      },
      { where: { id: productid } }
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

const UpdateproductImage = async (req, res) => {
  const image = req.file;
  const { productid } = req.body;

  try {
    if (!image) {
      const error = new Error("Please upload a file");
      error.status = 400;
      throw error;
    }

    // Fetch the existing product to get the current image path
    const product = await Product.findOne({ where: { id: productid } });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Construct the full path to the existing image
    const oldImagePath = path.join(
      __dirname,
      "..",
      "public",
      "images",
      product.ImagePath
    );

    // Remove the old image file
    fs.unlink(oldImagePath, (err) => {
      if (err) {
        console.error("Error deleting the old image:", err);
        return res
          .status(500)
          .json({ error: "Failed to delete the old image" });
      }

      // Update the database with the new image path
      Product.update(
        { ImagePath: image.filename },
        { where: { id: productid } }
      )
        .then(() => {
          res.status(200).json({ message: "Record updated successfully" });
        })
        .catch((dbError) => {
          res.status(500).json({ error: dbError.message });
        });
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

const DeleteRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.destroy({
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
  AddProducts,
  upload,
  GetAllProducts,
  UpdateproductImage,
  UpdateQuantity,
  DeleteRecord 
};
