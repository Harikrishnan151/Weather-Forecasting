import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import './Emergency.css'
import Button from 'react-bootstrap/Button';
import { Col, Row } from 'react-bootstrap';
import { addEmergency } from '../../services/allApi';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import EmergencyView from './EmergencyView';

function EmergencyAdd() {

  const [view,setview]=useState(false)
  const navigate = useNavigate()
  const [data,setdata]=useState(
    {
      
      title: " ",
      address: " ",
      location: " ",
      description: " ",
     
      phone_number: " ",
      admin_user:''
  }
  )
  const admin_user= localStorage.getItem('adminUser')
  console.log(admin_user);
 
  const [image,setimage]=useState()
  
  const  handleChange=(e)=>{

    const {name,value}= e.target
    setdata({...data,[name]:value})
   
  }

  const handleSubmit = async(e)=>

  {e.preventDefault()
    console.log(data);

  console.log(image);
  const token = localStorage.getItem('token')
  console.log(token);

  const formData = new FormData()
  formData.append("title",data.title)
  formData.append("address",data.address)
  formData.append("location",data.location)
  formData.append("description",data.description)
  formData.append("phone_number",data.phone_number)
  formData.append("admin_user",admin_user)
  formData.append("image",image)
  // console.log(formData);

  const header={
   Authorization :`api-key ${token}`,
    'Content-Type': 'multipart/form-data' 
}
 const response = await  addEmergency(formData,header)
 console.log(response);
 if(response.status==201){
toast.success("Post added successfully")
setview(true)
 }

 else{
  alert("error please add again")
  setview(true)
 }

}



  return (
    <div className='container text-center  mt-5wrapper' >
<div>
  <h3 className='text-primary mb-5 text-center'>Register Emergency</h3>
</div>
     <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={4}>
          Admin User
        </Form.Label>
        <Col sm={7}>
          <Form.Control type="text"
          name='admin_user'
          value={admin_user}
          disabled
          onChange={handleChange} placeholder="" />
        </Col>
      </Form.Group>
      
     <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={4}>
          Titile
        </Form.Label>
        <Col sm={7}>
          <Form.Control type="text"
          name='title'
          onChange={handleChange} placeholder="" />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={4}>
        Location
        </Form.Label>
        <Col sm={7}>
          <Form.Control type="text"
          name='location'
          onChange={handleChange} placeholder="" />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={4}>
        Address
        </Form.Label>
        <Col sm={7}>
          <Form.Control type="text"
          name='address'
          onChange={handleChange} placeholder="" />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={4}>
       PhoneNumber
        </Form.Label>
        <Col sm={7}>
          <Form.Control type="text"
          name='phone_number'
          onChange={handleChange} placeholder="" />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={4}>
       Description
        </Form.Label>
        <Col sm={7}>
          <Form.Control type="text"
          name='description'
          onChange={handleChange} placeholder="" />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3 ms-2" controlId="formHorizontalEmail">
        <Form.Label column sm={4}>
       Image
        </Form.Label>
        <Col sm={7}>
          <Form.Control type="file"
          name='image'
          onChange={(e)=>setimage(e.target.files[0])} placeholder="" />
        </Col>
      </Form.Group>
      
     <div>
     <Button type='submit'  className='w-25 mt-5'  onClick={handleSubmit} variant="success">Submit</Button>{' '}
     </div>
     <ToastContainer position='top-center' />
<div>
{view?<EmergencyView/>:""}
</div>
    </div>
  )
}

export default EmergencyAdd
