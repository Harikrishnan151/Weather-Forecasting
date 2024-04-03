import React, { useEffect, useState } from 'react'
import './DashboardUser.css'
import Navbar from '../navbar/Navbar'
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
} from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";
import { FaCommentAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import Footer from '../../components/Footer/Footer';
import { deleteUserpost, getUserbadge, getUserdetails, getUserpost } from '../../services/allApi';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { ToastContainer, toast } from 'react-toastify';
import BASE_URL from '../../services/baseurl';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function DashboardUser() {

  const [basicModal, setBasicModal] = useState(false);

  const toggleOpen = () => setBasicModal(!basicModal);

  //modal
  const [open, setOpen] = React.useState(false);


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [user, setUser] = useState([])
  const [userPost, setUserpost] = useState([])
  const [userBadges, setUserBadge] = useState([])
  const [userComments, setUserComments] = useState([])
  // function to block invalid user login
  const invalidLogin = () => {
    const token = localStorage.getItem("token")
    if (!token) {
      alert('please login')
      navigate('/')
    }
  }


  const id = localStorage.getItem("userId")
  console.log(id);




  const navigate = useNavigate()

  // api to fetch user details
  const fetchDetails = async () => {

    try {
      const response = await getUserdetails(id)
      console.log(response.data);
      setUser(response.data)
    } catch (error) {
      alert('Faild to fetch userDetails')
    }

  }
  console.log(user);

  //function to logout user
  const logoutUser = () => {
    localStorage.clear();
    toast.success('Succesfully Logged out')
    setTimeout(() => {
      navigate('/')
    }, 3000)
  }

  const token = localStorage.getItem("token")
  const header = {
    Authorization: `Bearer ${token}`
  }

  //function to get all user post
  const fetchPost = async () => {
    try {
      const postDetails = await getUserpost(header)
      console.log(postDetails.data)
      // console.log(postDetails.data.comments)

      setUserpost(postDetails.data)
      setUserComments(postDetails.data)
    } catch (error) {
      alert('error in fetching post')
    }
  }
  console.log(userPost)

  const tokens = localStorage.getItem("token")
  const headers = {
    Authorization: `Bearer ${tokens}`
  }
  //function to delete user post
  const deletePost = async (id) => {
    try {
      const result = await deleteUserpost(id, headers)
      console.log(result)
      if (result.status === 204) {
        toast.success('user post deleted')
        fetchPost()
      } else if (result.status === 404) {
        toast.error('user not autherized to delete')
      }
    } catch (error) {
      alert('faild to delete user post')
    }
  }

  //function to get user badge
  const user_id = (localStorage.getItem("userId"))
  console.log(user_id);
  const userBadge = async () => {
    try {
      console.log(user_id);
      const response = await getUserbadge(user_id)
      console.log(response);
      setUserBadge(response.data)

    } catch (error) {
      alert('error to fetch user badge ')
    }
    console.log(userBadges)

  }


  useEffect(() => {
    fetchDetails()
    fetchPost()
    invalidLogin()
    userBadge()
  }, [])


  return (
    <div className='body1'>

      <div >
        <Navbar />
        <Button className='mx-3 mt-2' style={{ backgroundColor: '#3b82f6' }} onClick={handleShow}>
          <i class="fa-solid fa-bars"></i>
        </Button>

        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title ><h2 style={{ fontWeight: "bolder" }}>{user.first_name}</h2> </Offcanvas.Title>

          </Offcanvas.Header>
          <Offcanvas.Body>
            <MDBCardImage className='userProfile my-3' style={{ width: '8rem', height: '8rem;', overflow: 'hidden' }} src='https://cdn-icons-png.flaticon.com/512/9131/9131529.png' position='top' alt='...' />
            <div className='userBadge my-3'>
              <h6>{userBadges.badge}</h6>
              <img height={'30px'} src={`${BASE_URL}${userBadges.badge_image}`} alt="" />
            </div>
            <ListGroup>
              <Link to={'/userDashboard'}>
                <ListGroup.Item className='listgrp text-black '>Dashboard</ListGroup.Item>
              </Link>
              <Link to={'/addPost'}><ListGroup.Item className='listgrp text-black '>Add Posts</ListGroup.Item></Link>
              <Link to={`/Edit-user/:id`}><ListGroup.Item className='listgrp text-black'>Edit User Details</ListGroup.Item> </Link>
              <Link to={'/Reset-Password'}><ListGroup.Item className='listgrp text-black'>Reset Password</ListGroup.Item> </Link>
              <ListGroup.Item onClick={() => logoutUser()} className='listgrp text-black '>Log Out</ListGroup.Item>

            </ListGroup>
          </Offcanvas.Body>
        </Offcanvas>
      </div>

      <div className='container'>
        <Row >
          {
            userPost.length > 0 ? userPost.map((postData) => (
              <Col sm={12} md={6} lg={4} xl={3} className='py-4 '>

                <Link to={`/userPost/${postData.id}`} style={{ textDecoration: 'none' }}>
                  <MDBCard className='userPosts my-5'>
                    <MDBCardImage className='postImg' height={'200px'} src={`${BASE_URL}${postData.image}`} position='top' alt='...' />
                    <MDBCardBody>
                      <MDBCardTitle className='text-dark'>{postData.title}</MDBCardTitle>
                      <MDBCardText >
                        {postData.description} <br />
                        <FaLocationDot /> {postData.location}
                      </MDBCardText>
                      <div className='bottom-content d-flex justify-content-between '>
                        <div className="action-item">
                          <span><FaHeart className='text-danger' /> </span>
                        </div>
                        <div className="action-item">
                          <span><FaCommentAlt /> {postData.comments.length} comments</span>
                          <div>
                          {/* {postData.comments && postData.comments.map((comment, index) => (
                             <p key={index}>{comment.text}</p>
                             
                         ))} */}
                          </div>
                        </div>
                      </div>
                      <div className="userActions d-flex justify-content-between mt-2 ">
                        <div className="edit">
                          <Link to={`/editPost/${postData.id}`}>
                            <span> <FaEdit /></span>
                          </Link>

                        </div>
                        <div className="edit">
                          <Link>
                            <span> <FaTrashCan onClick={() => deletePost(postData.id)} className='text-danger' /></span>
                          </Link>

                        </div>
                      </div>

                    </MDBCardBody>
                  </MDBCard>
                </Link>


              </Col>
            )) : <div className='new-box'>
              <h4>Welcome {user.first_name}</h4>

            </div>

          }
        </Row>

        <div>




        </div>
        <ToastContainer position='top-center' />
      </div>
      <Footer />
    </div>
  )
}

export default DashboardUser