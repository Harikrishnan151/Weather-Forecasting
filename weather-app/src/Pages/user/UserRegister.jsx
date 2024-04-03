import React, { useState } from 'react'
import { IoIosLock } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import './UserRegister.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userReg } from '../../services/allApi';
import { MdEmail } from "react-icons/md";
import { IoPersonCircle } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

function UserRegister() {

  
  const [username,setUsername]=useState()
  const [email,setEmail]=useState()
  const [first_name,setFirstname]=useState()
  const [last_name,setLastname]=useState()
  const [password,setpassword]=useState()

  const [confirmPwd, setConfirmpsw] = useState()
  const navigate=useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { first_name, last_name, username, email, password };
    console.log(username, password, email, first_name, last_name);
    try {
      const response = await userReg(body);
      console.log(response.status);
  
      if (response.status === 201) {
        // toast.success("Registration Successful");
        Swal.fire(" Account Registeration","You have Registerated successfully ","success")

        setTimeout(() => {
          navigate('/userLogin');
        }, 3000);
      } else if (response.response.status === 400) {
        // toast.error("Account already exists");
        Swal.fire("Error","Account already exists","error")

      } else {
        toast.error("Internal error");
      }
    } catch (error) {
      toast.error("Registration Failed");
      console.error("Error:", error);
    }
  }
  return (
    // user register form
    <>
      
      <div className='userRegisteration'>
        <div className='wrapperReg'>

          <form onSubmit={handleSubmit}>

            <h1>User Register</h1>

            <div className='input-box5'>
              <input type="text" name='firstname' onChange={(e)=>setFirstname(e.target.value)} placeholder='FirstName' required />
              <FaUser className='icon' />
            </div>
            <div className='input-box5'>
              <input type="text" name='lastname' onChange={(e) => setLastname(e.target.value)} placeholder='Last Name' required />
              <FaUser className='icon' />
            </div>
            <div className='input-box5'>
              <input type="text" placeholder='username' onChange={(e) => setUsername(e.target.value)} name='username' required />
              <IoPersonCircle className='icon' />
            </div>
            <div className='input-box5'>
              <input type="email" placeholder='email'onChange={(e) => setEmail(e.target.value)} name='email' required />
              <MdEmail  className='icon'/>
            </div>
            <div className='input-box5'>
              <input type="password" placeholder='password'onChange={(e) => setpassword(e.target.value)} name='psw' required />
              <IoIosLock className='icon' />
            </div>
            {/* <div className='input-box5'>
              <input type="password" placeholder='confirm password' onChange={(e) => setConfirmpsw(e.target.value)} name='Cpsw' required />
              <IoIosLock className='icon' />
            </div> */}
            {/* <div className='remember-forgot'> */}
            {/* <label><input type="checkbox" />Remember Me?</label> */}
            {/* <a href="">Forgot Password ?</a> */}



            <button type='submit' >Register</button>


          </form>

        </div>

        <ToastContainer position='top-center' />
      </div>
    </>



  )
}

export default UserRegister