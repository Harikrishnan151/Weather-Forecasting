import React, { useState } from 'react'
import Navbar from '../navbar/Navbar'
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
} from 'mdb-react-ui-kit';
import { MDBInput } from 'mdb-react-ui-kit';
import { resetPassword } from '../../services/allApi';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

function ResetPassword() {

    const [username,setUsername]=useState('')
    const [new_password,setNewpassword]=useState('')
    const navigate=useNavigate()

      //function to reset user password
  const resetuserPassword=async(e)=>{
    e.preventDefault();
    const body={username,new_password}
    console.log(body);
    try {
      const response=await resetPassword(body)
      console.log(response);
     if(response.status==200){
        toast.success('password changed succusfully')
        setTimeout(()=>{
            navigate('/userDashboard')
        },3000)

     }else if(response.response.status===404){
        toast.error('User not found')
     }
    } catch (error) {
      toast.error('failed to reset password')
    }
   
  }
    return (
        <div>
            <Navbar />
            <div  className="container my-5">
                <div  className="box my-5">
                    <MDBCard>
                        <MDBCardBody>
                            <MDBCardTitle className='text-center'>Reset Password</MDBCardTitle>
                            <MDBCardText>
                            <form  onSubmit={resetuserPassword}>
                <div class="form-outline" data-mdb-input-init>
                <MDBInput label='Username' onChange={(e)=>setUsername(e.target.value)} id='formControlLg' type='text' size='lg' />
                 
                </div>

                <div  class="form-outline my-3" data-mdb-input-init>
                <MDBInput label='New Password'  onChange={(e)=>setNewpassword(e.target.value)} id='formControlLg' type='text' size='lg' />

                  
                </div>
               
              
                <div className='my-2 text-center'>
                <Link to={'/UserDashboard'}> <button  className='btn  mx-5'>Back</button></Link> 

                  <button type='submit' className='btn btn-primary'>Submit</button>
                </div>
                </form>
                            </MDBCardText>
                        
                        </MDBCardBody>
                    </MDBCard>
                </div>
            </div>
            <ToastContainer position='top-center' />
        </div>
    )
}

export default ResetPassword