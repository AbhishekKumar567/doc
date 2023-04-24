import axios from 'axios'
import React from 'react'
import { Layout } from "../../components/Layout";
import { Table } from "antd"
import {useState,useEffect} from 'react'

const URL = "http://localhost:4000"

const Users = () => {

  const [users,setUsers] = useState([])

  const getUsers = async () => {

    try{
      const res = await axios.get(`${URL}/api/v1/admin/getAllUsers`,
      {
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })

      if(res.data.success)
      {
        setUsers(res.data.data)
      }
    }
    catch(err)
    {
      console.log(err)
    }
  }

  useEffect(()=>{
   getUsers()
  },[])

  // antD table col
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Doctor",
      dataIndex: "isDoctor",
      render: (text, record) => <span>{record.isDoctor ? "Yes" : "No"}</span>,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <button className="btn btn-danger">Block</button>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="text-center m-2">Users list</h1>
      <Table columns={columns} dataSource={users} />
    </Layout>
  )
}

export default Users
