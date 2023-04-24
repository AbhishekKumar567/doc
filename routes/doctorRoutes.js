const express = require("express")
const auth = require("../middlewares/auth")
const { getDoctorInfoController, updateProfileController, getDoctorByIdController } = require("../controllers/doctorController")

const router = express.Router()

router.post('/getDoctorInfo',auth,getDoctorInfoController)

router.post('/updateProfile',auth,updateProfileController)

router.post('/getDoctorById',auth,getDoctorByIdController)

module.exports = router