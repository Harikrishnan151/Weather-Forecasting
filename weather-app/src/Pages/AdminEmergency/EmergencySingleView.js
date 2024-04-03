import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import './Emergency.css'
import Button from 'react-bootstrap/Button';
import { Col, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { getSingleEmergency, updateEmergencyData } from '../../services/allApi';
import { ToastContainer, toast } from 'react-toastify';
import BASE_URL from '../../services/baseurl';

function EmergencySingleView() {

    const { id } = useParams()
    const [preview, setpreview] = useState()
    const navigate = useNavigate()
    const [formData, setformData] = useState({
        title: "",
        address: "",
        location: "",
        description: "",
        phone_number: "",
        admin_user: '',

    })

    const [image, setimage] = useState(null)
    console.log(id);
    // const handleChange = () => {

    // }

    const handleSubmit = async() => {
        const token = localStorage.getItem('token')
        console.log(token);

        const formdata= new FormData()
        formdata.append("title",formData.title)
        formdata.append("address",formData.address)
        formdata.append("location",formData.location)
        formdata.append("description",formData.description)
        formdata.append("phone_number",formData.phone_number)
        formdata.append("admin_user",formData.admin_user)
        formdata.append("image",image)
        
        const header = {
            Authorization: `api-key ${token}`,
             'Content-Type': 'multipart/form-data' 
        }

        
        //api to update
const response = await updateEmergencyData(id,formdata,header)
       console.log(response);
       if(response.status==200){
        toast.success('Successfully Updated')
        setTimeout(() => {
            navigate('/adminDashboard')
        }, 2000);
       }
       else{
        alert('Please Uplaod image ')
       }
    }

    const getEmergency = async () => {
        const token = localStorage.getItem('token')
        console.log(token);

        const header = {
            Authorization: `api-key ${token}`,
            //  'Content-Type': 'multipart/form-data' 
        }
        const response = await getSingleEmergency(id, header)
        console.log(response.data);
        if (response.data) {
            setformData({
                admin_user: response.data.admin_user || "",
                title: response.data.title || " ",
                address: response.data.address || " ",
                location: response.data.location || " ",
                description: response.data.description || " ",
                phone_number: response.data.phone_number || " ",
                // image:response.data.image || ""

            })
            setimage(response.data.image)
        }
    }
    const imagedisplay = (data) => {
        const file = URL.createObjectURL(data)
        setpreview(file)
        console.log(file);
        setimage(data)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setformData({
            ...formData,
            [name]: value
        });
    };

    useEffect(() => {
        getEmergency()

    }, [])



    return (
        <div>
            <div className='container text-center  mt-5 wrapper' >
                <div>
                    <h3 className='text-primary mb-5 text-center'>Edit Emergency</h3>
                </div>

                <div>
                    <img
                        style={{ height: '250px', width: '250px' }} // Inline styles for height and width
                        className='p-5' // Classname for padding
                        src={preview ? preview : `${BASE_URL}${image}`} // Ternary operator to conditionally set image source
                    />

                </div>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={4}>
                        Admin User
                    </Form.Label>
                    <Col sm={7}>
                        <Form.Control type="text"
                            name='admin_user'
                            disabled
                            value={formData.admin_user}
                            onChange={handleChange} placeholder="" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={4}>
                        Titile
                    </Form.Label>
                    <Col sm={7}>
                        <Form.Control type="text"
                            name='title'
                            value={formData.title}
                            onChange={handleChange} placeholder="" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={4}>
                        Location
                    </Form.Label>
                    <Col sm={7}>
                        <Form.Control type="text"
                            name='location'
                            value={formData.location}
                            onChange={handleChange} placeholder="" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={4}>
                        Address
                    </Form.Label>
                    <Col sm={7}>
                        <Form.Control type="text"
                            name='address'
                            value={formData.address}

                            onChange={handleChange} placeholder="" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={4}>
                        PhoneNumber
                    </Form.Label>
                    <Col sm={7}>
                        <Form.Control type="text"
                            name='phone_number'
                            value={formData.phone_number}

                            onChange={handleChange} placeholder="" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={4}>
                        Description
                    </Form.Label>
                    <Col sm={7}>
                        <Form.Control type="text"
                            name='description'
                            value={formData.description}

                            onChange={handleChange} placeholder="" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3 ms-2" controlId="formHorizontalEmail">
<p className='text-danger ' style={{justifyContent:'left'}}>* Upload image mandatory</p>
                    <Form.Label column sm={4}>
                        Image
                    </Form.Label>
                    <Col sm={7}>
                        <Form.Control type="file"
                        // value={image}
                            name='image'
                            onChange={(e) => imagedisplay(e.target.files[0])} placeholder="" />
                    </Col>
                </Form.Group>

                <div>     <Button type='submit' onClick={handleSubmit} className='w-25 mt-5' variant="success">UPDATE</Button>{' '}

                </div>
            </div>
            <ToastContainer position='top-center' />

        </div>
    )
}

export default EmergencySingleView
