import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from './Forms-pana.svg'
import Swal from 'sweetalert2'
import axios from 'axios'

import { Student_BASE_URL } from '../../App'
import Header from '../header/Header'

function Adduser() {

    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        firstName: "",
        lastName: "",
        email: "",
        contact: "",
    })

    const userID = JSON.parse(localStorage.getItem('auth'))

    const handleChange = (event) => {
        event.persist();
        setInputs({ ...inputs, [event.target.name]: event.target.value })
    }

    const handleFormsubmit = (event) => {
        event.preventDefault();

        let data = {
            FirstName: inputs.firstName,
            LastName: inputs.lastName,
            Email: inputs.email,
            PhoneNumber: inputs.contact,
            UserID: userID
        }

        axios.post(Student_BASE_URL + '/InsertStudent', data).then(res => {
            if (res.data.Status === "200") {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: "Record Inserted Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });

                navigate('/dashboard');
            }
        }).catch((e) => {
            Swal.fire({
                title: "Warning !",
                icon: 'warning',
                text: e,
                button: "Ok!"
            });
        })
    }

    return (
        <div>
            <Header />
            <div className='container py-3'>

                <div className="container pt-1">
                    <div className="row">
                        <div className="col pt-2">
                            <p className="h5 fw-bold">Add User</p>
                        </div>
                        <div className="col text-end"><Link to="/dashboard" className="btn btn-success"><i className="fa fa-chevron-circle-left" aria-hidden="true"></i> Back</Link></div>
                    </div>
                    <hr />
                </div>

                <div className='row'>
                    <div className="col-xs-12 col-sm-8 col-md-6 mt-3">
                        <form action='' onSubmit={handleFormsubmit} autoComplete="off">
                            <div className="row mb-3">
                                <div className="col-xs-12 col-sm-12 col-md-6">
                                    <label htmlFor="" className="form-label">First Name</label>
                                    <input type="text" name="firstName" id="" value={inputs.firstName} onChange={handleChange} className="form-control" required/>
                                </div>

                                <div className="col-xs-12 col-sm-12 col-md-6">
                                    <label htmlFor="" className="form-label">Last Name</label>
                                    <input type="text" name="lastName" id="" value={inputs.lastName} onChange={handleChange} className="form-control" required/>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-xs-12 col-sm-12 col-md-6">
                                    <label htmlFor="" className="form-label">Email</label>
                                    <input type="text" name="email" id="" value={inputs.email} onChange={handleChange} className="form-control" required/>
                                </div>

                                <div className="col-xs-12 col-sm-12 col-md-6">
                                    <label htmlFor="" className="form-label">Phone Number </label>
                                    <input type="text" name="contact" id="" value={inputs.contact} onChange={handleChange} className="form-control" required/>
                                </div>
                            </div>

                            <button className='btn btn-success'><i className="fa fa-check-circle" aria-hidden="true"></i> Submit</button>

                        </form>
                    </div>


                    <div className="col-sm-12 col-md-6 text-center p-3 d-none d-md-block">
                        <img src={Logo} alt="" className="img-fluid rounded" width="400px" />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Adduser