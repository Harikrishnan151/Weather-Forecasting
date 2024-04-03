import React, { useEffect, useState } from 'react'
import Navbar from '../navbar/Navbar'
import './UserPost.css'
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
} from 'mdb-react-ui-kit';
import Card from 'react-bootstrap/Card';
import { FaHeart } from "react-icons/fa";
import { FaCommentAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import BASE_URL from '../../services/baseurl';
import { Button } from 'react-bootstrap';
import { addComments, deleteComments, getComments, viewUserPost } from '../../services/allApi';
import { useParams } from 'react-router-dom';
import { FaTrashCan } from "react-icons/fa6";


function UserPost() {

    const { id } = useParams()
    console.log(id);

    const [data, setData] = useState([])
    const [comments, setComments] = useState([])
    const [addvalue, setComment] = useState(false)

    const [body, setBody] = useState({
        user: '',
        post: '',
        text: ''
    })

    const [cmtText, setText] = useState()
    //Add comment toggle comment box display using comment link clicks
    const addComment = () => {
        console.log("add comment");
        // setComment(true)
        setComment(prevState => !prevState);
    }

    const token = localStorage.getItem("token")
    const header = {
        Authorization: `Bearer ${token}`
    }

    //function to fetch user post
    const fetchUserPost = async () => {
        try {
            const response = await viewUserPost(id, header)
            console.log(response.data);
            setData(response.data)

        } catch (error) {
            alert(error)
        }

    }



    useEffect(() => {
        fetchUserPost()
        comment()
    }, [])

    //function to get comment
    const comment = async () => {
        try {
            const result = await getComments(id)
            console.log(result)
            setComments(result.data)
        } catch (error) {
            alert(error)
        }
    }

    //function to delete comment
    const handleDelete = async (cmtId) => {
        console.log(cmtId);
        console.log(id);
        const token = localStorage.getItem("token")
        const headers = {
            Authorization: `Bearer ${token}`
        }
        try {
            const response = await deleteComments(cmtId, id, headers)
            console.log(response);
            alert('comment deleted')
            fetchUserPost()
        } catch (error) {
            alert('error')
        }
    }

    //function to add comment
    const handleAdd = async (e) => {
        e.preventDefault();
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
            alert('Comment added')
            fetchUserPost()
        } else {
            alert('error in adding comment')
        }
    };

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

    return (
        <>
            <Navbar />
            <div className='mainBodys'>
                <div className="container">

                    <div className="row">
                        <div className="col-2"></div>
                        <div className="col-8">

                            <MDBCard className='card my-5'>
                                {/* <MDBCardTitle className='text-dark mt-1 mx-2'><img style={{ width: '1.5rem', height: '1.3rem;', overflow: 'hidden' }} src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png" alt="" /> {}</MDBCardTitle> */}
                                <MDBCardText className='mx-2 mt-2' >

                                    <FaLocationDot /> {data.location}

                                </MDBCardText>
                                <MDBCardImage height={'450px'} className='postImg' src={`${BASE_URL}${data.image}`} position='top' alt='...' />
                                <MDBCardBody>
                                    <MDBCardTitle className='text-dark '>{data.title}</MDBCardTitle>
                                    <MDBCardText >
                                        {data.description}
                                    </MDBCardText>
                                    <MDBCardText >
                                        {/* {data.created_at.slice(8,10)}-{data.created_at.slice(5,8)}{data.created_at.slice(0,4)} */}



                                    </MDBCardText>
                                    <div className='bottom-content d-flex justify-content-between '>
                                        <div className="action-item">
                                            <span>
                                                <FaHeart
                                                    onClick={() => handleClick(data.id)}
                                                    style={{ color: clickedPosts.includes(data.id) ? 'red' : 'inherit', fontSize: "20px", cursor: 'pointer' }}
                                                />
                                            </span>
                                        </div>
                                        <div className="action-item">
                                            <span style={{ cursor: 'pointer' }} onClick={addComment}><FaCommentAlt /> {comments.length}  comments</span>
                                        </div>
                                    </div>
                                    <div>
                                        {
                                            addvalue ?

                                                //  comments display

                                                <Card className='mt-5'>
                                                    <Card.Body>
                                                        <Card.Title>Comments</Card.Title>
                                                        <form onSubmit={(e) => handleAdd(e)} >
                                                            <Card.Text>

                                                                {/* comment enter field */}
                                                                <input type="text" onChange={(e) => setText(e.target.value)} className='input-box' placeholder='Enter your comments here..' />

                                                            </Card.Text>
                                                            {/* button for comments add  */}

                                                            <Button type='submit' variant="Success">Add comment</Button>
                                                        </form>
                                                        {/* button for comments delete */}
                                                        {/* <Button variant="Success" className='ms-3'>Delete comment</Button> */}

                                                        {/* display comments loaded from server */}
                                                        <div className='input-box mt-5 '>
                                                            {data.comment && (
                                                                <div className="user-comment">
                                                                    {/* <p>{data.comment.user}: {data.comment.text}</p> */}
                                                                    {/* <div className='trash'>
                                                                 <span> <FaTrashCan onClick={()=>handleDelete(data.comment.id)}  className='text-danger' /></span>
                                                                 </div> */}
                                                                </div>

                                                            )}
                                                            {/* Other comments */}
                                                            {data.comments && data.comments.map((comment, index) => (
                                                                <div key={index} className="other-comments">
                                                                    <div>
                                                                    </div>
                                                                    <p className='items p-3'><span><img style={{ width: '3rem', height: '3rem;', overflow: 'hidden' }} src="https://i.postimg.cc/GtpR2Y5z/istockphoto-1495088043-612x612-removebg-preview.png" alt="" /> {comment.user_username} : {comment.text} </span>
                                                                    <span className='trash pt-2' style={{ cursor: 'pointer' }}> <FaTrashCan onClick={(e) => handleDelete(comment.id)} className='text-danger' /></span>

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



                        </div>

                        <div className="col-2"></div>
                    </div>

                </div>


            </div>
        </>
    )
}

export default UserPost