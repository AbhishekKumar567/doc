import React, { useState, useEffect } from 'react'
import { Layout } from '../components/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { DatePicker, TimePicker } from 'antd'
import moment from 'moment'
import { hideLoader, showLoader } from '../redux/slices/alertSlice'
import { useSelector, useDispatch } from "react-redux";

const URL = "http://localhost:4000"

const BookingPage = () => {

    const params = useParams()

    const [doctors, setDoctors] = useState([])
    const [date,setDate] = useState("")
    const [time,setTime] = useState("")
    const [isAvailable,setIsAvailable] = useState(false)

    const getUser = async () => {

        try {
            const res = await axios.post(`${URL}/api/v1/doctor/getDoctorById`,
                {
                    doctorId: params.doctorId
                },
                {
                    headers: {
                        Authorization: "Bearer" + localStorage.getItem('token')
                    }
                })

            if (res.data.success) {
                setDoctors(res.data.data)
            }
        }
        catch (e) {
            console.log(e)
        }
    }


    const handleAvailability = async () => {
        try {
          dispatch(showLoader());
          const res = await axios.post(
            `${URL}/api/v1/user/booking-availability`,
            { doctorId: params.doctorId, date, time },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          dispatch(hideLoader());
          if (res.data.success) {
            setIsAvailable(true);
            console.log(isAvailable);
            message.success(res.data.message);
          } else {
            message.error(res.data.message);
          }
        } catch (error) {
          dispatch(hideLoading());
          console.log(error);
        }
      };
     
 // booking function
    const handleBooking = async () => {
        try {
            setIsAvailable(true);
            if (!date && !time) {
              return alert("Date & Time Required");
            }
          dispatch(showLoader());
          const res = await axios.post(
            `${URL}/api/v1/user/book-appointment`,
            {
              doctorId: params.doctorId,
              userId: user._id,
              doctorInfo: doctors,
              userInfo: user,
              date: date,
              time: time,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          dispatch(hideLoader());
          if (res.data.success) {
            message.success(res.data.message);
          }
        } catch (error) {
          dispatch(hideLoader());
          console.log(error);
        }
      };


    useEffect(() => {
        getUser()
    }, [])

    return (
        <Layout>
            <h1>booking</h1>
            <div className='container m-3'>
                {
                doctors && (
                <div>
                <h4>
                 {doctors.firstName} {doctors.lastName}
                </h4>
                <h4>Fees : {doctors.fees} </h4>
                <h4>Timings: {doctors.timings[0]} {doctors.timings[1]}</h4>
                <div class='d=flex flex-column w-50'>
                 <DatePicker format="DD-MM-YYYY" onChange={(value) => setDate(moment(value).format("DD-MM-YYYY"))}/>

                 <TimePicker format="HH:mm" onChange={(value) => {
                  setTime(moment(value).format("HH:mm"));
                }}/>

                 <button className='btn btn-primary m-2' onClick={handleAvailability}>Check Availability</button>
                 <button className="btn btn-dark mt-2" onClick={handleBooking}>Book Now</button>
                </div>
                </div>
                )}
            </div>
        </Layout>
    )
}

export default BookingPage