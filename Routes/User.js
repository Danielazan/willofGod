const {
    CreateUser,
    GetAllUser,
    GetSingleUser ,
    UpdateUser,
    DeleteRecord,
  
} = require("../Controller/User")
const express = require("express")

const router = express.Router()

router.post('/users', CreateUser,)

router.get("/users",  GetAllUser)

router.get("/users/:Name", GetSingleUser)



router.put("/users/:Id",UpdateUser)



router.delete("/users/:id",DeleteRecord)





module.exports = router