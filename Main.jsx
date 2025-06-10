import React, { useEffect } from 'react';
import './Main.css';
import { Link } from 'react-router-dom';

const Main = () => {
    useEffect(() => {
        let index = 0;
        const slides = document.getElementsByClassName('slide');

        const showSlides = () => {
            for (let i = 0; i < slides.length; i++) {
                slides[i].style.display = 'none';
            }
            index++;
            if (index > slides.length) index = 1;
            if (slides[index - 1]) {
                slides[index - 1].style.display = 'block';
            }
            setTimeout(showSlides, 4000);
        };

        showSlides();
    }, []);

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

            <section className="discounts-section">
                <h2>💸 Flight Discounts & Exclusive Offers</h2>
                <div className="slideshow-container">
                    <div className="slide fade">
                        <img src="/assets/discount1.jpg" alt="Offer 1" />
                        <div className="caption">Save up to 30% on International Flights!</div>
                    </div>
                    <div className="slide fade">
                        <img src="/assets/discount2.jpg" alt="Offer 2" />
                        <div className="caption">₹500 OFF on your first booking with AeroVista</div>
                    </div>
                    <div className="slide fade">
                        <img src="/assets/discount3.jpg" alt="Offer 3" />
                        <div className="caption">Weekend Getaway Deals – Starting at ₹2,999</div>
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
