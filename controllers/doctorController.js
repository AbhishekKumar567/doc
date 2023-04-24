const doctorModel = require("../models/doctorModel")

const getDoctorInfoController = async (req,res) =>{

   try{

    const doctor = await doctorModel.findOne({userId:req.body.userId})

    res.status(200).json({
        success:true,
        message:'doctor data fetched',
        data:doctor
    })

   }
   catch(err)
   {
    res.status(500).json({
        success:false,
        err,
        message:"Error while getting doctor info"
    })
   }

}

const updateProfileController = async (req,res) =>{

    try{

       const doctor = await doctorModel.findOneAndUpdate({userId:req.body.userId},req.body)

       res.status(201).json({
        success:true,
        message:'doctor profile updated',
        data:doctor
       })
    }
    catch(err)
    {
        res.status(500).json({
            success:false,
            err,
            message:"Error while updating doctor info"
        })

    }
}


const getDoctorByIdController = async(req,res) =>{

    try{
        const doctor = await doctorModel.findOne({_id:req.body.doctorId})
        res.status(200).json({
            success:true,
            message:"Single Doc info fetched",
            data:doctor
        })
    }
    catch(err)
    {
        res.status(500).json({
            success:false,
            err,
            message:"Error in single doc info"
        })
    }

}


module.exports = {getDoctorInfoController,updateProfileController,getDoctorByIdController}

