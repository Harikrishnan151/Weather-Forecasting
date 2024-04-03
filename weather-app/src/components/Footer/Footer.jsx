import React from 'react'
import './Footer.css'
import {
    MDBFooter,
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBIcon,
    MDBBtn
  } from 'mdb-react-ui-kit';

function Footer() {
  return (
    <div>
 <MDBFooter className='text-center text-white' style={{ backgroundColor: '#0597f2' }}>
      <MDBContainer className='pt-4'>
        <section className='mb-4'>
          <MDBBtn
            rippleColor="dark"
            color='#0597f2'
            floating
            size="lg"
            className='text-white m-1'
            href='https://www.facebook.com/'
            role='button'
            target='_blank'
          >
            <MDBIcon fab className='fab fa-facebook-f' />
          </MDBBtn>

          <MDBBtn
            rippleColor="dark"
            color='#0597f2'
            floating
            size="lg"
            className='text-white m-1'
            href='https://twitter.com/?lang=en-in'
            role='button'
            target='_blank'
          >
            <MDBIcon fab className='fa-twitter' />
          </MDBBtn>

          <MDBBtn
            rippleColor="dark"
            color='#0597f2'
            floating
            size="lg"
            className='text-white m-1'
            href='https://www.google.co.in/'
            role='button'
            target='_blank'
          >
            <MDBIcon fab className='fa-google' />
          </MDBBtn>

          <MDBBtn
            rippleColor="dark"
            color='#0597f2'
            floating
            size="lg"
            className='text-white m-1'
            href='https://www.instagram.com/'
            role='button'
            target='_blank'
          >
            <MDBIcon fab className='fa-instagram' />
          </MDBBtn>

          <MDBBtn
            rippleColor="white"
            color='#0597f2'
            floating
            size="lg"
            className='text-white m-1'
            href='https://www.linkedin.com'
            role='button'
            target='_blank'
          > 

            <MDBIcon fab className='fa-linkedin' />
          </MDBBtn>

          {/* <MDBBtn
            rippleColor="dark"
            color='link'
            floating
            size="lg"
            className='text-dark m-1'
            href='#!'
            role='button'
          >
            <MDBIcon fab className='fa-github' />
          </MDBBtn> */}
        </section>
      </MDBContainer>

      <div className='text-center text-light p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2024 Copyright:
        <a className='text-light' href='https://mdbootstrap.com/'>
          weatherapp.com
        </a>
      </div>
    </MDBFooter>
    </div>
  )
}

export default Footer