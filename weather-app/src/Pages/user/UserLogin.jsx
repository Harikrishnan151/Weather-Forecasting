import React, { useContext, useEffect, useState } from 'react'
import { FaUser } from "react-icons/fa";
import './UserLogin.css'
import { IoIosLock } from "react-icons/io";
import Header from '../../components/Header/Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { resetPasswordUser, userLogin } from '../../services/allApi';
import { useNavigate } from 'react-router-dom';
import Landingpage from '../UserLandingpage/Landingpage';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import Swal from 'sweetalert2'
const style = {
  position: 'absolute'  ,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
// import { AuthContextStatus } from '../AuthContext';

function UserLogin() {

const [username,setuserName]= useState()
const[password,setpassword]=useState()
 const navigate=useNavigate()
 const [loggedIn, setLoggedIn] = useState(false);
//  const {authorizsed, setAuthorised} = useContext(AuthContextStatus)
const [open, setOpen] = React.useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);


// forget pass word api
const resetPassword=async()=>{
const body ={username}
console.log(username);
// 

// try {

  const response = await resetPasswordUser(body)
if(response.status===200){
  alert('New password send to registered mail')
  handleClose()
  setTimeout(()=>{
    navigate('/userLogin')
  },3000)

}


// } catch (error) {
  else{
  alert('username not found')
  handleClose()
  setTimeout(() => {
    navigate('/userLogin');
  }, 3000);

// }
  }
}



const handleSubmit=async(e)=>{

  e.preventDefault()
  const body={username,password}
  console.log(username,password);
  try{
    if(!username || !password){
      toast.error('Please fill the feilds')
     }else{
      //api call for admin login
      const response=await userLogin(body)
      console.log(response);
       if(response.status===200){
        localStorage.setItem("token",response.data.access) 
        localStorage.setItem("userId",response.data.user.id)
        setLoggedIn(true);
        Swal.fire("Logged in","You have successfully logged in","success")

        // toast.success('Login Successful')
      //  setAuthorised(true)
      setTimeout(()=>{
        
        navigate('/home');
      },3000)
 
       }else if(response.response.status===401){
        // toast.error('invalid usernane or password')
        Swal.fire("Error","Invalid Username or Password","error")
       }else{

        toast.error('Account does not exist')
       }
      
     }
  }catch(error){
    console.error(error);
    toast.error('Internal server error')
  }
}


  return (
  <>

          {/* // design login page */}
    <div className='userlogin'>
     
    
    <div className='wrapper'>
      <form onSubmit={handleSubmit}>
        <h1>User Login</h1>
        <div className='input-box4'>
          <input type="text" placeholder='username' onChange={(e)=>setuserName(e.target.value)} required />
          <FaUser  className='icon'/>
        </div>
        <div className='input-box4'>
          <input type="password" placeholder='password' onChange={(e)=>setpassword(e.target.value)} required />
          <IoIosLock  className='icon'/>
        </div>
        <div className='remember-forgot'>
          <label><input type="checkbox" />Remember Me?</label>
          <a href='#' onClick={handleOpen}>Forgot Password ?</a>
          {/* <Button className='btn-btn-secondary'  color="secondary" onClick={handleOpen}>forgot password</Button> */}

          
        </div>
        <button type='submit'>Login</button>
        <div className='register-link'>
          <p>Don't have any account ? <a href="/userRegister">Register</a></p>
        </div>


      </form>
      <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
           Forgot password
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <TextField className='w-100' id="outlined-basic" onChange={(e)=>setuserName(e.target.value)}  placeholder='Enter your Registered Username' variant="outlined" />
          <div className='text-center p-5' >
          <Button variant="info" onClick={resetPassword} >Submit</Button>{' '}
          </div>
          </Typography>
        </Box>
      </Modal>
      </div>

    </div>


    <ToastContainer position='top-center' />
  </div>
   
  </>


  )
}

export default UserLogin