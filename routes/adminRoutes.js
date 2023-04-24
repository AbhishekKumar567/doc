const express = require("express")
const auth = require("../middlewares/auth")
const { getAllUsersController, getAllDoctorsController,changeAccountStatus } = require("../controllers/adminController")

const router = express.Router()

router.get('/getAllUsers',auth,getAllUsersController)

router.get('/getAllDoctors',auth,getAllDoctorsController)

router.post('/changeAccountStatus',auth,changeAccountStatus)

module.exports = router
