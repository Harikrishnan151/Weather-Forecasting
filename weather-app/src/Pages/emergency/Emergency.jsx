import React, { useEffect, useState } from 'react'
import './Emergency.css'
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
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { getEmergency } from '../../services/allApi';
import BASE_URL from '../../services/baseurl';


function Emergency() {

  const [emergencys,setEmergencys]=useState([])

  const fetchEmergency=async()=>{
    const response=await getEmergency()
    console.log(response.data);
    setEmergencys(response.data)
  }
console.log(emergencys)
  useEffect(()=>{
    fetchEmergency()
  },[])
  

  return (
    <div className='main-div '>
      <Header />
      <div>
      <h1 className='titles py-2' >Emergency</h1>
      
      <Row className='p-4'>
        {
          emergencys.map((data)=>(
            <Col sm={12} md={6} lg={4} xl={3} className='py-2 '>

            
              <MDBCard style={{height:'370px'}} className='card mt-5'>
                <MDBCardImage height={'200px'}  src={`${BASE_URL}${data.image}`} position='top' alt='...' />
                <MDBCardBody>
                  <MDBCardTitle className='text-dark'>{data.title}</MDBCardTitle>
                  <MDBCardText >
                    Location : <span style={{color:'black'}}>{data.location}</span>  <br />
                    Address : <span style={{color:'black'}}>{data.address}</span>   <br />
                    Number: <span style={{color:'black'}}>{data.phone_number}</span> 
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

export default Emergency