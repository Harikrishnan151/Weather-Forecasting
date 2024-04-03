import React, { useEffect, useState } from 'react'
import './EditPost.css'
import { MdOutlineTitle } from "react-icons/md";
import { MdOutlineDescription } from "react-icons/md";
import { FaImage } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import { IoLocation } from "react-icons/io5";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../navbar/Navbar';
import { editUserpost, userPost } from '../../services/allApi';
import {  useNavigate, useParams } from 'react-router-dom';
function EditPost() {

  // const navigate=useNavigate()
  // const {id}=useParams()
  // console.log(id);

  // const [formData,setFormData]=useState({
  //   title:"",
  //   description:"",
  //   location:"",
  //   user:""
  // })

  // const [image,setImage]=useState()
  
  
  // const token = localStorage.getItem("token")
  // console.log(token);


  // //function to get user post
  // const fetchUserPost=async()=>{
  //   const header = {
  //     Authorization: `Bearer ${token}`
  //   }
  //   const response=await userPost(id,header)
  //   console.log(response);
  //   setFormData({
  //     title:response.data.title || '',
  //     description:response.data.description || '',
  //     location:response.data.location || '',
  //     user:response.data.user || ''
  //   })
  //   setImage(response.data.image)

  // }

  // //function to edit user post
  // const handleChange=(e)=>{
  //   const {name,value}=e.target;
  //   setFormData({
  //     ...formData,[name]:value
  //   })
  // }

  // const handleSubmit=async()=>{
  //   const tokens = localStorage.getItem("token")
  //   console.log(tokens);
  //   const headers = {
  //     Authorization: `Bearer ${token}`
  //   }
  //   const newFormData=new FormData()
  //   newFormData.append("user",formData.user)
  //   newFormData.append("title",formData.title)
  //   newFormData.append("description",formData.description)
  //   newFormData.append("location",formData.location)
  //   newFormData.append("image",image)

  //   const response=await editUserpost(id,newFormData,headers)
  //   console.log(response)
  
  //   if(response.status===200){
  //     toast.success('Post updated successfully')
  //     setTimeout(() => {
  //       navigate('/')
  //     }, 3000);
  //   }else{
  //     alert('*Upload Image mandatory ')
  //   }
  // }
  // useEffect(()=>{
  //   fetchUserPost()
  // },[])

  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
      title: "",
      description: "",
      location: "",
      user: ""
  });
  const [image, setImage] = useState();
  const token = localStorage.getItem("token");

  const fetchUserPost = async () => {
      const header = {
          Authorization: `Bearer ${token}`
      };
      try {
          const response = await userPost(id, header);
          setFormData({
              title: response.data.title || '',
              description: response.data.description || '',
              location: response.data.location || '',
              user: response.data.user || ''
          });
          setImage(response.data.image);
      } catch (error) {
          console.error("Error fetching user post:", error);
      }
  };

  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
          ...formData,
          [name]: value
      });
  };

  const handleSubmit = async (e) => {
      const tokens = localStorage.getItem("token");
      const newFormData = new FormData();
      newFormData.append("user", formData.user);
      newFormData.append("title", formData.title);
      newFormData.append("description", formData.description);
      newFormData.append("location", formData.location);
      newFormData.append("image", image);
      const headers = {
          Authorization: `Bearer ${token}`
      };

      try {
          e.preventDefault(); // 
          const response = await editUserpost(id, newFormData, headers);
          if (response.status === 200) {
              toast.success('Post updated successfully');
              setTimeout(() => {
                  navigate('/userDashboard');
              }, 2000);
          } else {
              alert('*Upload Image mandatory');
          }
      } catch (error) {
          console.error("Error editing user post:", error);
      }
  };

  useEffect(() => {
      fetchUserPost();
  }, []);
  
  return (
    <div>
         {/* <Navbar/> */}

         
        <div className='editPost'>
        <div className='wrapper'>

          <form onSubmit={handleSubmit} >

            <h1>Edit Post</h1>

            <div className='input-box2'>
              <input onChange={handleChange} value={formData.user} disabled type="text" name='user'  placeholder='Id' required />
              <MdOutlineTitle className='icon' />
            </div>

            <div className='input-box2'>
              <input onChange={handleChange} value={formData.title} type="text" name='title'  placeholder='Title' required />
              <MdOutlineTitle className='icon' />
            </div>
            <div className='input-box2'>
              <input onChange={handleChange} value={formData.description} type="" name='description' placeholder='Description' required />
              <MdOutlineDescription className='icon' />
              
            </div>
            <div className='input-box2'>
              <input  onChange={handleChange}value={formData.location} type="text" placeholder='Location'  name='location' required />
              <IoLocation className='icon' />
            </div>
            <div className='input-box3'>
             
              <input  onChange={(e)=>setImage(e.target.files[0])}  type="file" placeholder='Image Url'  name='image' required />
             
            </div>
            <button type='submit'>Update</button>


          </form>

        </div>

        <ToastContainer position='top-center' />
        </div>

      

    </div>
    
    
  )
}

export default EditPost