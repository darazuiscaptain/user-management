import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';

import { Student_BASE_URL } from '../../App';
import Header from '../header/Header';


const Dashboard = () => {

    const navigate = useNavigate()

    const [getValue, setValue] = useState([]);
    const [loding, setLoding] = useState([true]);

    const role = JSON.parse(localStorage.getItem('role'));
    const token = JSON.parse(localStorage.getItem('auth'));

    console.log(role);
    console.log(token)

    useEffect(() => {
        load();
    }, []);

    const load = () => {
        if(role == 3)
        {
            loadStudent();
        }

        if(role == 1 || role == 2){
            loadAllStudent();
        }
    }

    const loadAllStudent = () => {
        axios.get(Student_BASE_URL + '/GetStudent').then(res => {
            if (res.data.Status == "200") {
                console.log(res.data.Data);
                const studentData = res.data.Data;
                const student = JSON.parse(studentData);
                setValue(student);
                setLoding(false);
            }

            else{
                setValue(null);
                setLoding(false);
            }
        }).catch((e) => {
            setLoding(true);
            Swal.fire({
                title: "Warning !",
                icon: 'warning',
                text: e,
                button: "Ok!"
            });
        })
    }

    const loadStudent = () => {
        axios.get(Student_BASE_URL + '/GetOneStudent/' + token).then(res => {
            if (res.data.Status == "200") {
                console.log(res.data.Data);
                const studentData = res.data.Data;
                const student = JSON.parse(studentData);
                setValue(student);
                setLoding(false);
            }

            else {
                setValue(null)
                setLoding(false);
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

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    }

    const deleteStudent = (e, id) => {
        const clickBtn = e.currentTarget;
        clickBtn.innerText = "Deleting";

        axios.delete(Student_BASE_URL + '/DeleteStudent/' + id).then(res => {
            clickBtn.closest("tr").remove();
            console.log(res)
            if (res.data.Status === "200") {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: "User Deleted Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
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
        })
    }


    var table = "";

    {
        getValue ? (
            table = getValue.map((item, index) => {
                return (
                    <tr key={index}>
                        <td id='fName'>{item.FirstName}</td>
                        <td>{item.LastName}</td>
                        <td>{item.PhoneNumber}</td>
                        <td>{item.Email}</td>
                        <td colSpan={3} className="" id='btn'>
                            <Link to={"view-user/" + item.StudentID} className="btn btn-primary btn-sm" style={{ marginRight: '6px' }}><i className="fa fa-search-plus" aria-hidden="true"></i> View</Link>
                            <Link to={"edit-user/" + item.StudentID} className="btn btn-warning btn-sm" style={{ marginRight: '6px' }}><i className="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</Link>
                            {
                                role == "1" ? (
                                    <Link onClick={(e) => deleteStudent(e, item.StudentID)} className="btn btn-danger btn-sm"><i className="fa fa-trash-o" aria-hidden="true"></i> Delete</Link>
                                ) : (
                                    <span></span>
                                )
                            }
                        </td>
                    </tr>
                );
            })
        ) : (
            table = <tr><td colSpan={5} className='text-center text-danger'>No Data Found</td></tr>
        )
    }

    return (
        <div>
            <Header />
            <div className='container py-3'>
                <div className="container pt-1">
                    <div className="row">
                        <div className="col-12 col-md-3 pb-3">
                            <form className="d-flex" role="search">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            </form>
                        </div>
                        <div className="col-12 col-md-9 text-end"><Link to="/new-user" className="btn btn-success"><i className="fa fa-user" aria-hidden="true"></i> Add New Contact</Link></div>
                    </div>
                    <hr />
                </div>

                <div className='table-responsive'>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Contact Number</th>
                                <th scope="col">Email</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loding
                                ? <tr className='text-center'>
                                    <td colSpan={7}>
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </td>
                                </tr>
                                : table
                            }
                        </tbody>
                    </table>
                </div>
                <button className='btn btn-danger' onClick={logout}>Log Out</button>
            </div>
        </div>
    )
}

export default Dashboard