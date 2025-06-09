import React from 'react';
import './Main.css';
import { Link } from 'react-router-dom';

const Main = () => {
    return (
        <div className="main-page">
            <nav className="navbar">
                <div className="logo-container">
                    <div className="logo-img" />
                    <div className="logo-text">AeroVista</div>
                </div>

                <div className="nav-links">
                    <Link to="/home" className="nav-btn">Search</Link>
                    <Link to="/profile" className="nav-btn">Profile</Link>
                    <Link to="/bookings" className="nav-btn">MyBookings</Link>
                </div>
            </nav>
        </div>
    );
};

export default Main;
