const userModel = require("../models/userModel")
const doctorModel = require("../models/doctorModel")
const appointmentModel = require("../models/appointmentModel");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const moment = require("moment");

const registerController = async (req,res) =>{
    const {email,password} = req.body
    try{

     const exist = await userModel.findOne({email})

    if(exist)
    {
        return res.status(200).json({message:"User already exists",success:false})
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    req.body.password = hashedPassword
    await userModel.create(req.body)
    res.status(201).json({message:"Registered successfully",success:true})

    }
    catch(error){
        console.log(error)
        res.status(500).json({success:false,message:error.message})
    }
}

const loginController = async (req,res) => {

    const {email,password} = req.body
    try{
        const user = await userModel.findOne({email})
        if(!user)
        {
            return res.status(200).json({message:"User not found",success:false})

        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch)
        {
            return res.status(200).json({message:"Invalid email or password",success:false})
        }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"})
        res.status(200).json({message:"Login successful",success:true,token})
        
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:error.message})
    }
}

const authController = async(req,res) =>{

    try{
        const user = await userModel.findById({_id:req.body.userId})
        user.password=undefined
        if(!user){
            return res.status(200).json({
            message:"user not found",
            success:false
            })
        }
        else{
            return res.status(200).json({
                success:true,
                data:user
            })
        }
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            message:"Auth error",
            success:false,
            err
        })
    }
}

   const applyDoctorController = async (req,res) => {
         
        try{
            //const obj = req.body
            const newDoctor = await doctorModel({...req.body,status:'pending'})
            await newDoctor.save()

            const adminUser = await userModel.findOne({isAdmin:true})
            const notification = adminUser.notification
            notification.push({
                type:"apply-doctor-request",
                message:`${newDoctor.firstName} ${newDoctor.lastName} has applied for doctor account`,
                data:{
                    doctorId:newDoctor._id,
                    name: newDoctor.firstName + " " + newDoctor.lastName,
                    onClickPath:"/admin/doctors"
                }
            })
            await userModel.findByIdAndUpdate(adminUser._id,{notification})
            res.status(201).json({
                success:true,
                message:"Doctor Account Applied Successfully"
            })
    
        }
        catch(err)
        {
            res.status(500).json({
                success:false,
                err,
                message:"Error while applying for doctor"
            })
        }
   }


   const getAllNotificationController = async(req,res) =>{

    try{
        const user = await userModel.findOne({_id:req.body.userId})
        const notification = user.notification
        const seennotification = user.seennotification
        seennotification.push(...notification)
        user.notification=[]
        user.seennotification = notification
        const updatedUser = await user.save()

        res.status(200).json({
            success:true,
            message:'all notification marked as read',
            data:updatedUser
        })
    }
    catch(err)
    {
        res.status(500).json({
            success:false,
            err,
            message:"Error in Notification"
        })
    }
}


const deleteAllNotificationController = async (req,res) => {

    try{

        const user = await userModel.findOne({_id:req.body.userId})
        user.notification=[]
        user.seennotification=[]
        const updatedUser = await user.save()
        updatedUser.password = undefined

        res.status(200).json({
            success:true,
            message:"Notification deleted successfully",
            data:updatedUser
        })
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({
            success:false,
            message:"Unable to delete Notification",
            err
        })
    }
}

const getAllDoctorsController = async (req,res) =>{

    try{
       
        const doctor = await doctorModel.find({status:"approved"})

        res.status(200).json({
            success:true,
            data:doctor,
            message:"doctor list fetched successfully"
        })
    }
    catch(err)
    {
        res.status(500).json({
            success:false,
            message:"Unable to fetch doctors",
            err
        })
    }
}


//BOOK APPOINTMENT
const bookAppointmentController = async (req, res) => {
    try {
    req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    req.body.time = moment(req.body.time, "HH:mm").toISOString();
    req.body.status = "pending";
      const newAppointment = new appointmentModel(req.body);
      await newAppointment.save();
      const user = await userModel.findOne({ _id: req.body.doctorInfo.userId });
      user.notification.push({
        type: "New-appointment-request",
        message: `A new Appointment Request from ${req.body.userInfo.name}`,
        onCLickPath: "/user/appointments",
      });
      await user.save();
      res.status(200).json({
        success: true,
        message: "Appointment Book succesfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        error,
        message: "Error While Booking Appointment",
      });
    }
  };

  const bookingAvailabilityController = async (req, res) => {
    try {
      const date = moment(req.body.date, "DD-MM-YYYY").toISOString();
      const fromTime = moment(req.body.time, "HH:mm")
        .subtract(1, "hours")
        .toISOString();
      const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();
      const doctorId = req.body.doctorId;
      const appointments = await appointmentModel.find({
        doctorId,
        date,
        time: {
          $gte: fromTime,
          $lte: toTime,
        },
      });
      if (appointments.length > 0) {
        return res.status(200).send({
          message: "Appointments not Availibale at this time",
          success: true,
        });
      } else {
        return res.status(200).send({
          success: true,
          message: "Appointments available",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error In Booking",
      });
    }
  };

const userAppointmentsController = async(req,res) =>{

    try{
      const appointments = await appointmentModel.find({userId:req.body.userId})
      res.status(200).json({
        success:true,
        message:"User appointments fetched successfully",
        data:appointments
      })
    }
    catch(err)
    {
      console.log(err);
      res.status(500).send({
        success: false,
        err,
        message: "Error In Appointment",
      });
    }
}

module.exports = {loginController,registerController,authController,applyDoctorController,
getAllNotificationController,
deleteAllNotificationController,getAllDoctorsController,
bookAppointmentController,bookingAvailabilityController,userAppointmentsController}