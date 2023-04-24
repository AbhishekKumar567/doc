import React, { useEffect } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import axios from 'axios'
import {useDispatch,useSelector} from 'react-redux'
import { hideLoader, showLoader } from '../redux/slices/alertSlice'
import { setUser } from '../redux/slices/userSlice'


const URL = "http://localhost:4000"

export const ProtectedRoute = ({children}) => {
   
    const navigate=useNavigate()
   const dispatch = useDispatch()
   const {user} = useSelector(state=>state.user)

   //getting user
   const getUser = async() =>{

    try
    {
       dispatch(showLoader())
       const res = await axios.post(`${URL}/api/v1/user/getuser`,
       {token:localStorage.getItem("token")},
       {
        headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
       }
       )
       dispatch(hideLoader())

       if(res.data.success)
       {
         dispatch(setUser(res.data.data))

       }
       else{
       navigate("/login")
       localStorage.clear()
       }
    }
    catch(e)
    {
        dispatch(hideLoader())
        localStorage.clear()
        console.log(e)
    }
   }

   useEffect(()=>{

    if(!user){
        getUser()
    }
   },[user,getUser])
    
 
    if(localStorage.getItem("token"))
    {
        return children
    }
    else{
         navigate("/login")
    }
    
}



