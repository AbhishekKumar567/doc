const userModel = require("../models/userModel")
const doctorModel = require("../models/doctorModel")



const getAllUsersController = async (req,res) =>{

    try{
        const users = await userModel.find({})
        res.status(200).json({
            success:true,
            message:'users list',
            data:users
        })
    }
    catch(err)
    {
        res.status(500).json({
            success:false,
            err,
            mesaage:'Error while fetching users'
        })

    }

}

const getAllDoctorsController = async (req,res) =>{

    try{
        const doctors = await doctorModel.find({}) 
        res.status(200).json({
            success:true,
            message:'doctors list',
            data:doctors
        })
    }
    catch(err)
    {
        res.status(500).json({
            success:false,
            err,
            mesaage:'Error while fetching doctors'
        })

    }
    
}


const changeAccountStatus = async (req,res) => {
   
    try{
        
         const {doctorId,status} = req.body

         const doctor = await doctorModel.findByIdAndUpdate(doctorId,{status})

         const user = await userModel.findOne({_id:doctor.userId})

         const notification = user.notification

         notification.push({
            type:"doctor account request updated",
            message:`Your doctor account has been ${status}`,
            onClickPath:'/notification'
         })

         user.isDoctor = status === 'approved' ? true:false
         await user.save()
         
         res.status(201).json({
            success:true,
            message:"Account Status Updated",
            data:doctor
         })
    }
    catch(err)
    {
        res.status(500).json({
            success:false,
            err,
            mesaage:'Error in Account Status'
        })
    }
    
}

module.exports = {getAllUsersController,getAllDoctorsController,changeAccountStatus}