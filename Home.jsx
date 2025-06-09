import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">AeroVista</div>
        <div className="nav-links">
          <Link to="/login" className="login-btn">Login</Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <section className="hero-section">
          <h1 className="hero-title">Explore the World with <span className="highlight">AeroVista</span></h1>
          <p className="hero-subtitle">Book flights easily, travel safely, and enjoy exclusive offers.</p>
          <Link to="/search" className="cta-btn">Start Your Journey</Link>
        </section>

        <section className="features">
          <div className="feature-card">
            <div className="icon">✈️</div>
            <h3>Easy Booking</h3>
            <p>Search and book flights in just a few clicks.</p>
          </div>
          <div className="feature-card">
            <div className="icon">🛡️</div>
            <h3>Safety First</h3>
            <p>All flights follow strict COVID-19 and safety protocols.</p>
          </div>
          <div className="feature-card">
            <div className="icon">💸</div>
            <h3>Special Offers</h3>
            <p>Get up to 30% off on early bookings and group travel.</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>📞 Helpdesk: +91-9876543210</p>
        <p>📧 Email: support@skyfly.com</p>
        <p className="footer-copy">© 2025 AeroVista. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
