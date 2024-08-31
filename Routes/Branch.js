const {
    AddBranch,
    GetAllBranch ,
  UpdateBranch, 
  DeleteRecord,
  GetSingleBranch
 } = require("../Controller/Branch")
const express = require("express")

const router = express.Router()

router.post('/branch',AddBranch)

router.get("/branch", GetAllBranch)

router.get("/branch/:id",GetSingleBranch)

router.put("/branch/:id",UpdateBranch)


router.delete("/branch/:id",DeleteRecord)





module.exports = router