import React, {useEffect, useState } from 'react'
import './Admin.css'
import { FaUser } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../../services/allApi';

function AdminLogin({children}) {
    

    const [username,setUserName]=useState()
    const [password,setPassword]=useState()
    const navigate=useNavigate()


    //function for admin login
    const handleSubmit=async(e)=>{
      e.preventDefault();
      const body={username,password}
      console.log(body);
      try {
        if(!username || !password){
        toast.error('Please fill the feilds')
      }else{
        //api call for admin login
        const response=await adminLogin(body)
        localStorage.setItem("adminUser",response.data.superuser.id)
        console.log(response.data.superuser);
        if(response.status==200){
          localStorage.setItem("token",response.data.token)
         
         
          toast.success('Login Success') 
          setTimeout(()=>{
            navigate('/adminDashboard')
          },3000)
        }else if(response.status==401){
          toast.error('Invalid username or password')
        }else{
          toast.error('Account does not exist')
        }
      }
        
      } catch (error) {
        console.error(error);
        toast.error('Internal server error')
      }
    }

    

  return (
    
    <div className='adminlogin'>


    <div className='wrapper'>
      <form onSubmit={handleSubmit}>
        <h1>Admin Login</h1>
        <div className='input-box3'>
          <input type="text" placeholder='username'  required  onChange={(e)=>setUserName(e.target.value)}/>
          <FaUser  className='icon'/>
        </div>
        <div className='input-box3'>
          <input type="password" placeholder='password' required onChange={(e)=>setPassword(e.target.value)} />
          <IoIosLock  className='icon'/>
        </div>
        <button type='submit'>Login</button>
        {/* <div className='register-link'>
          <p>Don't have any account ? <a href="/userRegister">Register</a></p>
        </div> */}


      </form>

    </div>

 <ToastContainer position='top-center'/>
  </div>
  )
}

export default AdminLogin