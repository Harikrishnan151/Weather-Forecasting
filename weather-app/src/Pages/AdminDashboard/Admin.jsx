import React, { useContext, useEffect, useState } from 'react'
import { RiAdminLine } from "react-icons/ri";
import { BiHome } from "react-icons/bi";
import './Sidebar.css'
import './AdminMain.css'
import EmergencyView from '../AdminEmergency/EmergencyView';
import EmergencyAdd from '../AdminEmergency/EmergencyAdd';
import { Navigate, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { IoMdLogOut } from "react-icons/io";
import { IoMdAddCircleOutline } from "react-icons/io";

import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBIcon,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from 'mdb-react-ui-kit';
import { IoMdPhotos } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { MdEmergencyShare } from "react-icons/md";
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';

function Admin({children}) {

  const [view,setview]=useState(false)
  const [addEmergency,setEmergency]=useState(false)

  const pageload =()=>{
    setview(true);
    setEmergency(false)
  }
  const navigate = useNavigate()

  const viewEmergency=(e)=>{
    e.preventDefault()
    setEmergency(false)
    setview(prevState => !prevState)

  }
  const Emergencyadd=(e)=>{
    e.preventDefault()
    setview(false)
    setEmergency(prevState => !prevState)
  


  }

  //logout
  const logout =()=>{
    localStorage.clear()
    alert(" logged out successfully")
   navigate('/')
  }

  // function to block invalid login
  const invalidLogin=()=>{
    const token=localStorage.getItem('token')
    if(!token){
      alert("Please Login first")
      navigate('/')
    }
    
  }

  useEffect(()=>{
 invalidLogin()
 pageload()

  },[])

  return (
<div>
{/* header */}
<div>
       <MDBNavbar expand='lg' className='navbar'>
      <MDBContainer fluid>
        <MDBNavbarBrand  className='weather text-light mx-4' href='#'><img height={'30px'} src='https://i.postimg.cc/hPXvxcnQ/cloudy.png'/>Weather-App</MDBNavbarBrand>
        <MDBNavbarToggler style={{color:'white'}}
          type='button'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>
        <MDBCollapse  navbar >
          <MDBNavbarNav className="justify-content-end me-5">
            
            

           
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
 
    </div>

    <div className='dashboard'>

    <div className='menu'>
      <div className='logo'>
      <RiAdminLine className='icon' />
      <h2>Admin</h2>
      </div>
   

    <div className='menu-list'>
     
        <a href="" onClick={(e)=>viewEmergency(e)}  className='item'>
        <BiHome className='icon' />
             Emergency View
        </a>
      
      <a href="" onClick={(e)=>Emergencyadd(e)} className='item'>
      <IoMdAddCircleOutline className='icon' />
      Emergency Add
      </a>
      <a href="" onClick={()=>logout()}  className='item'>
      <IoMdLogOut  className='icon' />
      Logout
      </a>
     
     
      

    </div>
    </div>
    
    <div className='dashboard' >
      <div className='dashboard-content'>
       {view?<EmergencyView/>:""}
       {addEmergency?<EmergencyAdd></EmergencyAdd>:""}
      </div>
    </div>
  </div>
  <Footer></Footer>
  </div>
)
  
}

export default Admin