import React from 'react'
import {Form,Input,message} from 'antd'
import '../styles/Login.css'
import { Link,useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { hideLoader, showLoader } from '../redux/slices/alertSlice'

const URL = "http://localhost:4000"
const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const submitHandler = async(values) =>{
        //console.log(values)
        try{
          dispatch(showLoader())
          const res = await axios.post(`${URL}/api/v1/user/login`,values)
          dispatch(hideLoader())
          console.log(res)
          if(res.data.success)
          {
            localStorage.setItem('token',res.data.token)//storing token in localstorage
            message.success(res.data.message)
            navigate("/")
          }
          else{
            message.error(res.data.message)
          }

        }
        catch(e)
        {
          dispatch(hideLoader())
            console.log(e)
            message.error("Something went wrong")
        }
    }
  
  return (
    <>
    <div className='form-contain mt-4'>
        <Form layout="vertical" onFinish={submitHandler} className="login-form">
            <h1 className='text-center'>Login Form</h1>
           
            <Form.Item label="Email" name="email">
                <Input type="email" required/>
            </Form.Item>
            <Form.Item label="Password" name="password">
                <Input type="password" required/>
            </Form.Item>
            <Link to="/register" className="m-2">Not logged in Register here</Link>
            <button className='btn btn-primary' type="submit">Login</button>
        </Form>
    </div>
    </>
  )
}

export default Login