import React, { useEffect, useState } from 'react'
import './AllPost.css'
import Navbar from '../navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";
import { FaCommentAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { addComments, deleteComments, getAllWeatherpost, searchPost } from '../../services/allApi';
import BASE_URL from '../../services/baseurl';
import { MDBInput } from 'mdb-react-ui-kit';
import { MDBBtn } from 'mdb-react-ui-kit';
import { FaSearch } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';



function AllPost() {

  const [addvalue, setComment] = useState(false)
  const [search, setSearch] = useState('')
  const [cmtText, setText] = useState()

  //Add comment toggle comment box display using comment link clicks

  const addComment = () => {

    console.log("add comment");
    // setComment(true)
    setComment(prevState => !prevState);
  }
  const [weatherPost, setWeatherpost] = useState([])

  const fetchWeatherPost = async () => {
    const response = await getAllWeatherpost()
    setWeatherpost(response.data)

  }
  console.log(weatherPost)

  //Function to search user post based on location
  const filterData = weatherPost.filter(items => items.location.toLowerCase().includes(search.toLowerCase()))

  useEffect(() => {
    fetchWeatherPost()
  }, [])

  //function to add like
  const [clickedPosts, setClickedPosts] = useState([]);

  const handleClick = (postId) => {
    setClickedPosts(prevClickedPosts => {
      if (!prevClickedPosts.includes(postId)) {
        return [...prevClickedPosts, postId];
      } else {
        return prevClickedPosts.filter(id => id !== postId);
      }
    });
  };



  //function to add comment
  const handleAdd = async (id) => {
    // e.preventDefault();
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`
    };

    const updatedBody = {
      user: localStorage.getItem('userId'),
      post: id,
      text: cmtText
    };

    const response = await addComments(id, updatedBody, headers);
    console.log(response);
    if (response.status === 201) {
      toast.success('Comment added')
      fetchWeatherPost()
    } else {
      alert('error in adding comment')
    }
  };

  // const id=localStorage.getItem('userId')

  //function to delete comment
  const handleDelete = async (cmtId, postId) => {
    console.log(cmtId);
    console.log(postId);
    const token = localStorage.getItem("token")
    const headers = {
      Authorization: `Bearer ${token}`
    }
    try {
      const response = await deleteComments(cmtId, postId, headers)
      console.log(response);
      if (response.status === 204) {
        alert('comment deleted')
        fetchWeatherPost()
      } else {
        alert('Comment not deleted')
      }


    } catch (error) {
      alert('error')
    }
  }


  return (
    <div className='mainBody'>
      <Navbar />
      <div className="container">
        <div className='searchBar my-4'>

          <MDBInput onChange={(e) => setSearch(e.target.value)} label='Search by location' id='form1' type='text' />
          <MDBBtn type='submit' color='info'>
            <FaSearch />
          </MDBBtn>

        </div>
        <div className="row">
          <div className="col-2"></div>
          <div className="col-8">
            {
              filterData.length > 0 ? filterData.map((data) => (
                <MDBCard className='card my-5'>
                  <MDBCardTitle className='text-dark mt-1 mx-2'><img style={{ width: '1.5rem', height: '1.3rem;', overflow: 'hidden' }} src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png" alt="" /> {data.username}</MDBCardTitle>
                  <MDBCardText className='mx-2' >

                    <FaLocationDot /> {data.location}

                  </MDBCardText>
                  <MDBCardImage height={'450px'} className='postImg' src={`${BASE_URL}${data.image}`} position='top' alt='...' />
                  <MDBCardBody>
                    <MDBCardTitle className='text-dark '>{data.title}</MDBCardTitle>
                    <MDBCardText >
                      {data.description}
                    </MDBCardText>
                    <MDBCardText >
                      {data.created_at.slice(8, 10)}-{data.created_at.slice(5, 8)}{data.created_at.slice(0, 4)}


                    </MDBCardText>
                    <div className='bottom-content d-flex justify-content-between '>
                      <div className="action-item">
                        <span>
                          <FaHeart 
                            onClick={() => handleClick(data.id)}
                            style={{ color: clickedPosts.includes(data.id) ? 'red' : 'inherit', fontSize:"20px", cursor: 'pointer' }}
                          />
                        </span>
                      </div>
                      <div className="action-item">
                        <span style={{ cursor: 'pointer' }} onClick={addComment}><FaCommentAlt /> {data.comments.length} comments</span>
                      </div>
                    </div>
                    <div>
                      {
                        addvalue ?

                          //  comments display

                          <Card className='mt-5'>
                            <Card.Body>
                              <Card.Title>Comments</Card.Title>
                              <form  >
                                <Card.Text>
                                  {/* comment enter field */}
                                  <input onChange={(e) => setText(e.target.value)} type="text" className='input-box' placeholder='Enter your comments here..' />

                                </Card.Text>
                                {/* button for comments add  */}

                                <Button onClick={(e) => handleAdd(data.id)} variant="Success">Add comment</Button>
                              </form>
                              {/* button for comments delete */}
                              {/* <Button variant="Success" className='ms-3'>Delete comment</Button> */}

                              {/* display comments loaded from server */}
                              <div className='input-box mt-5 '>
                                {/* User comment */}
                                {data.comment && (
                                  <div className="user-comment">
                                    <p>{data.comment.user}: {data.comment.text}</p>
                                  </div>
                                )}
                                {/* Other comments */}
                                {data.comments && data.comments.map((comment, index) => (
                                  <div key={index} className="other-comments">
                                    <p className='p-3'><img style={{ width: '3rem', height: '3rem;', overflow: 'hidden' }} src="https://i.postimg.cc/GtpR2Y5z/istockphoto-1495088043-612x612-removebg-preview.png" alt="" /> {comment.user_username} : {comment.text}
                                      <div className='trash'>
                                        {/* <span style={{cursor:'pointer'}}> <FaTrashCan onClick={(e)=>handleDelete(comment.id,data.id)}   className='text-danger' /></span> */}
                                      </div>
                                        {/* <p className='px-3'> {comment.created_at.slice(8, 10)}-{comment.created_at.slice(5, 8)}{comment.created_at.slice(0,4)}</p> */}
                                    </p>
                                    

                                  </div>
                                ))}

                              </div>
                            </Card.Body>
                          </Card>

                          : ""
                      }
                    </div>

                  </MDBCardBody>
                </MDBCard>
              )) : <div className='postContainer '>
                <h4>No Post available</h4>
              </div>
            }

          </div>

          <div className="col-2"></div>
        </div>
        <ToastContainer position='top-center' />

      </div>
      <Footer />
    </div>
  )
}

export default AllPost