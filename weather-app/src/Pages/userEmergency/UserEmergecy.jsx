import React, { useEffect, useState } from 'react'
import './UserEmergency.css'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
  
  } from 'mdb-react-ui-kit';
  import { Link } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { getEmergency } from '../../services/allApi';
import BASE_URL from '../../services/baseurl';


function UserEmergecy() {

  const [emergency,setEmergency]=useState([])

  const fetchEmergency=async()=>{
    const response=await getEmergency()
    console.log(response.data);
    setEmergency(response.data)
  }
console.log(emergency)
  useEffect(()=>{
    fetchEmergency()
  },[])
  return (
    <div>
        <Navbar/>
    <div className='maindiv '>
      <h1 className='title py-3' >Emergency</h1>
      
    <Row className='p-5'>
      {
         emergency.map((item)=>(
          <Col sm={12} md={6} lg={4} xl={3} className='py-4'>

        
          <MDBCard style={{height:'370px'}} className='card '>
            <MDBCardImage height={'200px'} src={`${BASE_URL}${item.image}`} position='top' alt='...' />
            <MDBCardBody>
              <MDBCardTitle className='text-dark'>{item.title}</MDBCardTitle>
              <MDBCardText >
                Location : <span style={{color:'black'}}>{item.location}</span>  <br />
                Address : <span style={{color:'black'}}>{item.address}</span>   <br />
                Number: <span style={{color:'black'}}>{item.phone_number}</span> 
              </MDBCardText>

            </MDBCardBody>
          </MDBCard>
       
      </Col>
         ))
      }

    </Row>
   
    

  </div>
  <Footer />
  </div>
  )
}

export default UserEmergecy