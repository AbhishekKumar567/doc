import{ React }from 'react'
import { Form,Input,message} from 'antd'
import '../styles/Register.css'
import { Link,useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { hideLoader, showLoader } from '../redux/slices/alertSlice'

const URL = "http://localhost:4000"
const Register = () => {

     const navigate = useNavigate()
     const dispatch=useDispatch()
     const submitHandler = async (values) =>{
       try{
        dispatch(showLoader())
        const res = await axios.post(`${URL}/api/v1/user/register`,values)
        dispatch(hideLoader())
        console.log(res)
        if(res.data.success)
        {
          message.success(res.data.message)
          navigate("/login")
        }
        else{
            message.error(res.data.message)
        }
       }
       catch(error){
          dispatch(hideLoader())
          console.log(error)
          message.error("something went wrong")
       }
       
    }
  
  return (
    <>
    <div className='form-contain mt-4'>
        <Form layout="vertical" onFinish={submitHandler} className="reg-form">
            <h1 className='text-center'>Register Form</h1>
            <Form.Item label="Name" name="name">
                <Input type="text" required/>
            </Form.Item>
            <Form.Item label="Email" name="email">
                <Input type="email" required/>
            </Form.Item>
            <Form.Item label="Password" name="password">
                <Input type="password" required/>
            </Form.Item>
            <Link to="/login" className="m-2">Already user login here</Link>
            <button className='btn btn-primary' type="submit">Register</button>
        </Form>
    </div>
    </>
  )
}

export default Register