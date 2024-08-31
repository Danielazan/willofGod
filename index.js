const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const sequelize = require('./database')
const path = require("path")
const user = require("./Routes/User")
const Products = require("./Routes/Products")
const Branch = require("./Routes/Branch")
const Customer = require("./Routes/Customer")

require("dotenv").config()
app = express()

app.use(express.urlencoded({ extended: false }));
app.use(cors())
// app.use(helmet())
app.use(express.json())
app.use(express.static("public"))

app.use("/api",user)
app.use('/api',Products)
app.use('/api',Branch)
app.use('/api',Customer)


sequelize.sync().then(()=>{
    app.listen(process.env.PORT,(req,res)=>{
        console.log(`Listening at port ${process.env.PORT}`)
    })
})
