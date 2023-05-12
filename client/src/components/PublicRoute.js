import React from 'react'
import { useNavigate } from 'react-router-dom'

export const PublicRoute = ({children}) => {
 
    const navigate = useNavigate()
    if(localStorage.getItem("token"))
    {
       // return <Navigate to="/" />
       navigate("/")
    }
    else{
       return children
    }
}

