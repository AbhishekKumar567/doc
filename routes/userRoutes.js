const express = require("express")
const { loginController, registerController,authController, applyDoctorController, getAllNotificationController,deleteAllNotificationController, getAllDoctorsController, bookAppointmentController, bookingAvailabilityController } = require("../controllers/userController")
const auth = require("../middlewares/auth")

const router = express.Router()

//routes
router.post("/login",loginController)

router.post("/register",registerController)

//Auth || POST
router.post('/getuser',auth,authController)

//Apply-Doctor || POST
router.post('/apply-doctor',auth,applyDoctorController)

//Doctor Notification || POST
router.post('/getallnotification',auth,getAllNotificationController)

router.post('/deleteallnotification',auth,deleteAllNotificationController)

router.get('/getAllDoctors',auth,getAllDoctorsController)

router.post('/book-appointment',auth,bookAppointmentController)

router.post("/booking-availability",auth, bookingAvailabilityController)

module.exports = router

