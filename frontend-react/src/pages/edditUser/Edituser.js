import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2';
import Logo from './Forms-pana.svg'

import { Student_BASE_URL } from '../../App';
import Header from '../header/Header';

function Edituser() {
    const navigate = useNavigate();

    const { id } = useParams();

    const [inputs, setInputs] = useState({
        firstName: "",
        lastName: "",
        email: "",
        contact: "",
        userID: "3"
    })

    const [btnBack, setBtnBack] = useState(true);
    

    const handleChange = (event) => {
        event.persist();
        setInputs({ ...inputs, [event.target.name]: event.target.value })
    }

    useEffect(() => {
        axios.get(Student_BASE_URL+'/FindUser/' + id).then(res => {
            if (res.data.Status === "200") {
                const studentData = res.data.Data;

                const student = JSON.parse(studentData);

                setInputs({
                    firstName: student[0].FirstName,
                    lastName: student[0].LastName,
                    email: student[0].Email,
                    contact: student[0].PhoneNumber
                })
            }

            else if (res.data.Status === "404") {
                Swal.fire({
                    title: "Warning !",
                    icon: 'warning',
                    text: "No Student ID Found",
                    button: "Ok!"
                });

                navigate('/dashboard');
            }
        });
    }, []);


    const handleFormsubmit = (event) => {
        event.preventDefault();

        document.getElementById('update').innerHTML = "Updating....";
        document.getElementById('update').disabled = true;

        let data = {
            FirstName: inputs.firstName,
            LastName: inputs.lastName,
            Email: inputs.email,
            PhoneNumber: inputs.contact,
            UserID: inputs.userID
        }

        axios.put(Student_BASE_URL+'/UpdateStudent/' + id, data).then(res => {
            if (res.data.Status === "200") {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: "Record Updated Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                setBtnBack(false);
            }

        }).catch((e) => {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Oops...',
                text: e
            })
        })
    }

    return (
        <div>
            <Header />
            <div className='container py-3'>
            <div className="container pt-1">
                <div className="row">
                    <div className="col pt-2">
                        <p className="h5 fw-bold">Edit User</p>
                    </div>
                    <div className="col text-end"><Link to="/dashboard" className="btn btn-success"><i className="fa fa-chevron-circle-left" aria-hidden="true"></i> Back</Link></div>
                </div>
                <hr />
            </div>

            <form action='' onSubmit={handleFormsubmit} autoComplete="off">
                <div className='row'>
                    <div className="col-xs-12 col-sm-8 col-md-6 mt-3">
                        <div className="row mb-3">
                            <div className="col-xs-12 col-sm-12 col-md-6">
                                <label htmlFor="" className="form-label">First Name</label>
                                <input type="text" name="firstName" value={inputs.firstName} id="" className="form-control" onChange={handleChange} required/>
                            </div>

                            <div className="col-xs-12 col-sm-12 col-md-6">
                                <label htmlFor="" className="form-label">Last Name</label>
                                <input type="text" name="lastName" id="" value={inputs.lastName} className="form-control" onChange={handleChange} required/>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-xs-12 col-sm-12 col-md-6">
                                <label htmlFor="" className="form-label">Email</label>
                                <input type="text" name="email" id="" value={inputs.email} className="form-control" onChange={handleChange} disabled />
                            </div>

                            <div className="col-xs-12 col-sm-12 col-md-6">
                                <label htmlFor="" className="form-label">Phone Number </label>
                                <input type="text" name="contact" id="" value={inputs.contact} className="form-control" onChange={handleChange} required/>
                            </div>
                        </div>

                        {btnBack
                            ? (<button className='btn btn-success mt-5' id='update'><i className="fa fa-check-circle" aria-hidden="true"></i> Update user</button>)
                            : (<div id='back'><Link to="/dashboard" className="btn btn-primary mt-5"><i className="fa fa-chevron-circle-left" aria-hidden="true"></i> Go Back</Link></div>)
                        }
                    </div>

                    <div className="col-sm-12 col-md-6 text-center p-3 d-none d-md-block">
                        <img src={Logo} alt="" className="img-fluid rounded" width="400px" />
                    </div>
                </div>
            </form>
        </div>
        </div>
    )

}

export default Edituser