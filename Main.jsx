import React from 'react';
import './Main.css';
import { Link } from 'react-router-dom';

const Main = () => {
    return (
        <div className="main-page">
            <nav className="navbar glass-effect">
                <div className="logo-container">
                    <div className="logo-img" />
                    <div className="logo-text">AeroVista</div>
                </div>

                <div className="nav-links">
                    <Link to="/home" className="nav-btn">Search Flights</Link>
                    <Link to="/profile" className="nav-btn">Profile</Link>
                    <Link to="/bookings" className="nav-btn">My Bookings</Link>
                </div>
            </nav>

            <section className="hero-section">
                <div className="overlay">
                    <h1>Explore the Skies with AeroVista</h1>
                    <p>Your seamless travel journey starts here. Search, book, and fly effortlessly.</p>
                    <Link to="/home" className="cta-button">Get Started</Link>
                </div>
            </section>

            <section className="carousel-section">
                <h2>🌍 Popular Holiday Spots</h2>
                <div className="carousel">
                    <img src="/assets/holiday1.jpg" alt="Maldives" />
                    <img src="/assets/holiday2.jpg" alt="Switzerland" />
                    <img src="/assets/holiday3.jpg" alt="Bali" />
                </div>
            </section>

            <section className="packages-section">
                <h2>🔥 Featured Travel Packages</h2>
                <div className="package-cards">
                    <div className="package-card">
                        <img src="/assets/package1.jpg" alt="Goa" />
                        <h3>Goa Getaway</h3>
                        <p>3 Nights | ₹7,999 per person</p>
                    </div>
                    <div className="package-card">
                        <img src="/assets/package2.jpg" alt="Manali" />
                        <h3>Snowy Manali</h3>
                        <p>4 Nights | ₹9,499 per person</p>
                    </div>
                    <div className="package-card">
                        <img src="/assets/package3.jpg" alt="Dubai" />
                        <h3>Dubai Delight</h3>
                        <p>5 Nights | ₹29,999 per person</p>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <p>📞 Helpdesk: +91-9876543210 | 📧 Email: support@aerovista.com</p>
            </footer>
        </div>
    );
};

export default Main;
