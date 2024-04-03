import React, { useState } from 'react'
import './AddPosts.css'
import { MdOutlineTitle } from "react-icons/md";
import { MdOutlineDescription } from "react-icons/md";
import { FaImage } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import { IoLocation } from "react-icons/io5";
import 'react-toastify/dist/ReactToastify.css';
// import Navbar from '../navbar/Navbar'
import { FaRegUser } from "react-icons/fa";
import { addUserpost } from '../../services/allApi';
import { useNavigate } from 'react-router-dom';

function AddPosts() {

  const userID=localStorage.getItem('userId')
  console.log(userID);

  const navigate=useNavigate()
  const [postDetails,setPostdetails]=useState({
    user:"",
    title:"",
    description:"",
    location:"",
    likes:"",
    report_count:""
  })
  const [image,setImage]=useState(null)

  const handleChange=(e)=>{
    const {name,value}=e.target
    setPostdetails({...postDetails,[name]:value})
  }
  console.log(postDetails)
console.log(image);



const AddPosts=async(e)=>{
  console.log(postDetails)
  e.preventDefault()
  const token=localStorage.getItem("token")
  
  const headers = {
    Authorization: `Bearer ${token}`
  }
  const formData = new FormData()
  formData.append("user",userID)
  formData.append("title",postDetails.title)
  formData.append("description",postDetails.description)
  formData.append("location",postDetails.location)
  formData.append("likes",postDetails.likes)
  formData.append("report_count",postDetails.report_count)
  formData.append("image",image)
  console.log(formData);

  try {
  const response=await addUserpost(formData,headers)
  console.log(response);
 if(response.status===201){
  toast.success('Post Added')
  setTimeout(()=>{
    navigate('/userDashboard')
  },3000)
 }else if(response.status===400){
   alert('Invalid user id')
 }

    
  } catch (error) {
    alert('error to add post')
  }
}

  return (
    <div>
        {/* <Navbar/> */}

        <div className='Addpost'>
        <div className='wrappers1'>

          <form  >

            <h1>Add Post</h1>
            <div className='input-box1'>
              <input onChange={handleChange} value={userID} disabled type="text" placeholder='user id'  name='user' required />
              <FaRegUser  className='icon' />
            </div>

            <div className='input-box1'>
              <input onChange={handleChange} type="text" name='title'  placeholder='Title' required />
              <MdOutlineTitle className='icon' />
            </div>
            <div className='input-box1'>
              <input onChange={handleChange} type="" name='description' placeholder='Description' required />
              <MdOutlineDescription className='icon' />
              
            </div>
            <div className='input-box1'>
              <input onChange={handleChange} type="text" placeholder='Location'  name='location' required />
              <IoLocation className='icon' />
            </div>
            <div className='input-box2'>
              <input onChange={(e)=>setImage(e.target.files[0])} type="file"  placeholder='Image Url'  name='image' required />
              {/* <FaImage className='icons'/> */}
              
            </div>
            <button onClick={AddPosts} className='my-4' type='submit' >Upload</button>{''}
 

          </form>

        </div>

        <ToastContainer position='top-center' />
        </div>

        
    </div>
  )
}

export default AddPosts