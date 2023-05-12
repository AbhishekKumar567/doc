const express = require("express")
const auth = require("../middlewares/auth")
const { getDoctorInfoController, updateProfileController, getDoctorByIdController, doctorAppointmentsController, updateStatusController } = require("../controllers/doctorController")

const router = express.Router()

router.post('/getDoctorInfo',auth,getDoctorInfoController)

router.post('/updateProfile',auth,updateProfileController)

router.post('/getDoctorById',auth,getDoctorByIdController)

router.get('/doctor-appointments',auth,doctorAppointmentsController)

router.post("/update-status", auth, updateStatusController)

module.exports = router