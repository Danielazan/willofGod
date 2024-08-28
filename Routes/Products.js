const {
    AddProducts,
    upload,
    GetAllProducts,
    UpdateproductImage,
    UpdateQuantity,
    DeleteRecord 
} = require("../Controller/Product")
const express = require("express")

const router = express.Router()

router.post('/products',upload.single('image'), AddProducts)

router.get("/products", GetAllProducts)

router.put("/productsimg",upload.single('image'), UpdateproductImage)

router.put("/productsQty", UpdateQuantity)




// router.put("/machine/:Id",UpdateMachine)



router.delete("/products/:id",DeleteRecord)





module.exports = router