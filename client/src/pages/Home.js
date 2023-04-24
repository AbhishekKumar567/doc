import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { Layout } from '../components/Layout'
import DoctorList from '../components/DoctorList'

//token:localStorage.getItem("token")

const URL = "http://localhost:4000"

const Home = () => {

  const[doctors,setDoctors] = useState([])

  const getUser = async () =>{
   
    try{
    const res = await axios.get(`${URL}/api/v1/user/getAllDoctors`,
    {
      headers:{
      Authorization : "Bearer" + localStorage.getItem('token')
    }
    })

    if(res.data.success)
    {
      setDoctors(res.data.data)
    }
    }
    catch(e){
    console.log(e)
    }
  }
  
useEffect(()=>{
getUser()
},[])

  return (
    <Layout>
     <h1 className='text-center'>Home</h1>
     <Row>
      {
        doctors && doctors.map(doctor => (
          <DoctorList doctor={doctor}/>
        ))
      }
     </Row>
    </Layout>
  )
}

export default Home;