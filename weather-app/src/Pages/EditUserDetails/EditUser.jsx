import React, { useEffect, useState } from 'react'
import './EditUser.css'
import Navbar from '../navbar/Navbar'
import { editUserDetails, getUserdetails } from '../../services/allApi'
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
} from 'mdb-react-ui-kit';
import { MDBInput } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


function EditUser() {

    const navigate = useNavigate();

    const id = localStorage.getItem("userId")
    console.log(id);

    const [formData, setFormData] = useState({
        username: "",
        first_name: "",
        last_name: "",
        email: ""
        
    });

    //function to fetch user details
    const fetchDetails = async () => {
        try {
            const response = await getUserdetails(id)
            console.log(response.data);
            setFormData({
                username:response.data.username|| '',
                first_name:response.data.first_name || '',
                last_name:response.data.last_name || '',
                email:response.data.email || ''
            });
        } catch (error) {
            alert('Faild to fetch userDetails')
        }
        console.log(formData);
    }
    console.log(formData)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
  //function to edit user details
  const handleSubmit=async(e)=>{
    e.preventDefault(); 
    const body=formData
    console.log(body);
   const response=await editUserDetails(id,body)
   console.log(response);
   if (response.status === 200) {
    toast.success('Post updated successfully');
    setTimeout(() => {
        navigate('/userDashboard');
    }, 2000);
} else {
    alert('*Upload Image mandatory');
}
  }

    useEffect(() => {
        fetchDetails()
    }, [])
    return (
        <div>
            <Navbar />
            <div className="container my-5">
                <div>
                    <MDBCard>
                        <MDBCardBody>
                            <MDBCardTitle className='text-center'>Edit User Details</MDBCardTitle>
                            <MDBCardText>
                                <form onSubmit={handleSubmit}>
                                <div class="form-outline my-3" data-mdb-input-init>
                                    <MDBInput onChange={handleChange} value={formData.username} name='username' label='Username' id='formControlLg' type='text' size='lg' />
                                </div>
                                <div class="form-outline my-3" data-mdb-input-init >
                                    <MDBInput onChange={handleChange} value={formData.first_name} name='first_name' label='First Name' id='formControlLg' type='text' size='lg' />
                                </div>
                     
                                <div class="form-outline my-3" data-mdb-input-init>
                                    <MDBInput onChange={handleChange} value={formData.last_name} name='last_name' label='Last Name' id='formControlLg' type='text' size='lg' />
                                </div>
                                <div class="form-outline my-3" data-mdb-input-init>
                                    <MDBInput onChange={handleChange} value={formData.email} name='email' label='Email' id='formControlLg' type='text' size='lg' />
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

export default EditUser