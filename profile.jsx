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
                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }
                const data = await response.json();
                setUser(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchUser();
    }, []);

    if (error) {
        return <div className="profile-page"><p className="error">{error}</p></div>;
    }

    if (!user) {
        return <div className="profile-page"><p className="loading">Loading...</p></div>;
    }

    return (
        <div className="profile-page">
            <div className="profile-container">
                <h2 className="profile-title">User Profile</h2>
                <div className="profile-box"><span>ID:</span> {user.id}</div>
                <div className="profile-box"><span>Username:</span> {user.name}</div>
                <div className="profile-box"><span>First Name:</span> {user.firstName}</div>
                <div className="profile-box"><span>Last Name:</span> {user.lastName}</div>
                <div className="profile-box"><span>Email:</span> {user.email}</div>
                <div className="profile-box"><span>Date of Birth:</span> {user.dateOfBirth}</div>
                <div className="profile-box"><span>Phone Number:</span> {user.phoneNumber}</div>

                <button className="back-button" onClick={() => navigate("/main")}>
                    ⬅ Back to Home
                </button>
            </div>
        </div>
    );
};

export default Profile;
