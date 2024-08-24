const {
    AddProducts,
    upload,
    GetAllProducts
} = require("../Controller/Product")
const express = require("express")

const router = express.Router()

router.post('/products',upload.single('image'), AddProducts)

router.get("/products", GetAllProducts)

// router.get("/machine/:id", GetSingleMachine)



// router.put("/machine/:Id",UpdateMachine)



// router.delete("/machine/:id",DeleteRecord)





module.exports = router