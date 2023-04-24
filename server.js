const express = require('express')
//const morgan = require('morgan')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const userRoute = require("./routes/userRoutes")
const adminRoute = require("./routes/adminRoutes")
const doctorRoute = require("./routes/doctorRoutes")
const cors = require("cors")

dotenv.config()

connectDB()

const app = express()

app.use(express.json())
app.use(cors())

//routes
app.use("/api/v1/user",userRoute)
app.use("/api/v1/admin",adminRoute)
app.use("/api/v1/doctor",doctorRoute)

app.listen(process.env.PORT,()=>{
    console.log(`server running on port ${process.env.PORT}`)
})