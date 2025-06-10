import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './profile.css';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const username = localStorage.getItem("username");

            if (!username) {
                setError("Username not found. Please log in again.");
                return;
            }

            try {
                const response = await fetch(`http://localhost:9006/auth/user/${username}`);
                if (!response.ok) throw new Error("Failed to fetch user data");

                const data = await response.json();
                setUser(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchUser();
    }, []);

    if (error) {
        return (
            <div className="profile-wrapper">
                <p className="error-message">{error}</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="profile-wrapper">
                <div className="spinner" />
                <p className="loading-message">Fetching your profile...</p>
            </div>
        );
    }

    return (
        <div className="profile-wrapper">
            <div className="profile-card">
                <h2 className="profile-header">👤 My Profile</h2>
                <div className="profile-details">
                    <div className="profile-field"><label>ID</label><p>{user.id}</p></div>
                    <div className="profile-field"><label>Username</label><p>{user.name}</p></div>
                    <div className="profile-field"><label>First Name</label><p>{user.firstName}</p></div>
                    <div className="profile-field"><label>Last Name</label><p>{user.lastName}</p></div>
                    <div className="profile-field"><label>Email</label><p>{user.email}</p></div>
                    <div className="profile-field"><label>Date of Birth</label><p>{user.dateOfBirth}</p></div>
                    <div className="profile-field"><label>Phone Number</label><p>{user.phoneNumber}</p></div>
                </div>
                <button className="home-button" onClick={() => navigate("/main")}>
                    ⬅ Back to Home
                </button>
            </div>
        </div>
    );
};

export default Profile;
