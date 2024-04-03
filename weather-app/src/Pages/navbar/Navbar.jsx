import React, { useState } from 'react'
import './Navbar.css'
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBCollapse,
    MDBIcon
  } from 'mdb-react-ui-kit';
import { IoMdPhotos } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { MdEmergencyShare } from "react-icons/md";
import { Link } from 'react-router-dom';
  


function Navbar() {

    const [openNav, setOpenNav] = useState(false);


    return (
  <>
    <MDBNavbar expand='lg' style={{border:"none"}} className='navbar'>
      <MDBContainer fluid>
        <Link to={'/home'}>
        <MDBNavbarBrand  className='weather text-light mx-4' href='#'><img height={'30px'} src='https://i.postimg.cc/hPXvxcnQ/cloudy.png'/> Weather-App</MDBNavbarBrand>
        </Link>
        <MDBNavbarToggler style={{color:'white'}}
          type='button'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setOpenNav(!openNav)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>
        <MDBCollapse  navbar open={openNav}>
          <MDBNavbarNav className="justify-content-end me-5">
            <MDBNavbarItem className='me-4'>
              <MDBNavbarLink className='navlink ' active aria-current='page' href='#'>
              <Link style={{ color: 'white',fontSize:'22px' }} to={"/home"}><FaHome /></Link> 
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem className='me-4'>
              <MDBNavbarLink href='#'> 
              <Link to={"/allPost"} style={{ color: 'white',fontSize:'23px' }}>
              <IoMdPhotos />
              </Link> </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem className='me-4'>
              <MDBNavbarLink href='#'>
              <Link style={{ color: 'white',fontSize:'22px' }} to={"/userEmergency"}><MdEmergencyShare  /></Link>
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem className='me-4'>
              <MDBNavbarLink href='#'> 
              <Link to={'/userDashboard'} style={{ color: 'white',fontSize:'22px' }}>
              <FaUserCircle />
              </Link> </MDBNavbarLink>
            </MDBNavbarItem>

          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
 
  




  </>
    )
}

export default Navbar