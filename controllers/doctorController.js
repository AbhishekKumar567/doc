const userModel = require("../models/userModel")
const doctorModel = require("../models/doctorModel")
const appointmentModel = require("../models/appointmentModel");

const getDoctorInfoController = async (req, res) => {

    try {

        const doctor = await doctorModel.findOne({ userId: req.body.userId })

        res.status(200).json({
            success: true,
            message: 'doctor data fetched',
            data: doctor
        })

    }
    catch (err) {
        res.status(500).json({
            success: false,
            err,
            message: "Error while getting doctor info"
        })
    }

}

const updateProfileController = async (req, res) => {

    try {

        const doctor = await doctorModel.findOneAndUpdate({ userId: req.body.userId }, req.body)

        res.status(201).json({
            success: true,
            message: 'doctor profile updated',
            data: doctor
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            err,
            message: "Error while updating doctor info"
        })

    }
}


const getDoctorByIdController = async (req, res) => {

    try {
        const doctor = await doctorModel.findOne({ _id: req.body.doctorId })
        res.status(200).json({
            success: true,
            message: "Single Doc info fetched",
            data: doctor
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            err,
            message: "Error in single doc info"
        })
    }

}

const doctorAppointmentsController = async (req, res) => {

    try {
        const doctor = await doctorModel.findOne({ userId: req.body.userId });
        const appointments = await appointmentModel.find({
            doctorId: doctor._id,
        });
        res.status(200).json({
            success: true,
            message: "Doctor Appointments fetch Successfully",
            data: appointments,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            err,
            message: "Error in doctor"
        })
    }
}

const updateStatusController = async (req, res) => {
    try {
      const { appointmentsId, status } = req.body;
      const appointments = await appointmentModel.findByIdAndUpdate(
        appointmentsId,
        { status }
      );
      const user = await userModel.findOne({ _id: appointments.userId });
      const notification = user.notification;
      notification.push({
        type: "status-updated",
        message: `your appointment has been updated ${status}`,
        onCLickPath: "/doctor-appointments",
      });
      await user.save();
      res.status(200).json({
        success: true,
        message: "Appointment Status Updated",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        error,
        message: "Error In Update Status",
      });
    }
  };


module.exports = { getDoctorInfoController, updateProfileController, getDoctorByIdController, doctorAppointmentsController,updateStatusController }

