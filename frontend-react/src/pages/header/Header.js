import React, { useEffect, useState } from 'react'
import Logo from './m-logo.png'

function Header() {

    const [token, setToken] = useState(false);
    var userName = JSON.parse(localStorage.getItem('userName'))

    let role = JSON.parse(localStorage.getItem('role'));
    let userRole = "";

    if(role == "1")
    {
        userRole = "Admin"
    }

    if(role == "2")
    {
        userRole = "Staff"
    }

    if(role == "3")
    {
        userRole = "User"
    }


    useEffect(() => {
        var isAuth = localStorage.getItem('auth');
    
        if (isAuth !== null) {
            setToken(true);
        }
    },  []);

    return (
        <nav className="navbar pt-2 shadow pb-2 bg-primary bg-gradient">
            <div className="container">
                <a className="navbar-brand">
                    <img src={Logo} alt="Logo" width="45" height="35"
                        className="d-inline-block align-text-top" />
                    <span className="text-light fw-bold font-monospace">E-education</span>
                </a>
                {
                    token ? (
                        <span className="text-light fw-bold font-monospace text-end"><i className="fa fa-user-circle-o" aria-hidden="true"></i> {userName} (Role : {userRole})</span>
                    )
                    : null
                }
            </div>
        </nav>
    )
}

export default Header