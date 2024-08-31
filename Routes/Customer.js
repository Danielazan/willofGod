const {
    AddCustomer,
    GetAllcustomer ,
    GetSinglecustomer,
  DeleteRecord,

 } = require("../Controller/Customer")
const express = require("express")

const router = express.Router()

router.post('/customer', AddCustomer)

router.get("/customer", GetAllcustomer)

router.get("/customer/:id",GetSinglecustomer)

router.delete("/customer/:id",DeleteRecord)





module.exports = router