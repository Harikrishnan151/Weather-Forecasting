import React, { useState } from 'react'
import './Header.css'
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

function Header() {

  const [openNav, setOpenNav] = useState(false);
  return (
    <div>
       <MDBNavbar expand='lg' className='navbar'>
      <MDBContainer fluid>
        <Link to={'/'}>
        <MDBNavbarBrand  className='weather text-light mx-4' href='#'><img height={'30px'} src='https://i.postimg.cc/hPXvxcnQ/cloudy.png'/> Weather-App</MDBNavbarBrand> </Link>
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
              <Link style={{ color: 'white',fontSize:'22px' }} to={"/"}><FaHome /></Link> 
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem className='me-4'>
              <MDBNavbarLink href='#'>
              <Link style={{ color: 'white',fontSize:'22px' }} to={"/emergency"}><MdEmergencyShare  /></Link>
              </MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle tag='a' className='nav-link' role='button' style={{ color: 'white',fontSize:'22px' }}>
                <Link style={{ color: 'white',fontSize:'22px' }}>
              <FaUserCircle />
              </Link>
                </MDBDropdownToggle  >
                <MDBDropdownMenu>
                <Link to={'/userLogin'}>
                  <MDBDropdownItem link>
                  User
                 </MDBDropdownItem></Link>
                 <Link to={'/adminLogin'}> <MDBDropdownItem link>
                  Admin
                  </MDBDropdownItem>
                  </Link>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
 
    </div>
  )
}

export default Header