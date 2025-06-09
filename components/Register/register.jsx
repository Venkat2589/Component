import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { FaMobileRetro } from "react-icons/fa6";
import { Link } from "react-router-dom";
import './register.css';

const Register = () => {
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [dob, setDob] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [title, setTitle] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    
    const formattedDob = dob.replace(/-/g, "/");


    try {
        const payload = {
            name: username,
            firstName,
            lastName,
            email,
            dateOfBirth: formattedDob, // or DateOfBirth if backend expects that
            phoneNumber,
            title,
            password
        };

        console.log("Payload being sent:", JSON.stringify(payload, null, 2));

        const response = await fetch("http://localhost:9006/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const text = await response.text();
        console.log("Status code:", response.status);
        console.log("Raw response text:", JSON.stringify(text));

        if (response.ok && text.trim().toLowerCase().includes("user added successfully")) {
            setSuccess("Registered successfully. Redirecting to login page...");
            setTimeout(() => {
                window.location.href = "/login";
            }, 5000);
        } else {
            throw new Error(text.trim() || "Registration failed");
        }
    } catch (err) {
        console.error("Registration error:", err);
        setError(err.message || "Something went wrong");
    }
};


    return (
        <div className="register-page">
            <div className="wrapper">
                <form onSubmit={handleSubmit}>
                    <h1>Register</h1>

                    <div className="input-box title-options">
                        <label>
                            <input
                                type="radio"
                                name="title"
                                value="Mr"
                                onChange={(e) => setTitle(e.target.value)}
                            /> Mr.
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="title"
                                value="Mrs"
                                onChange={(e) => setTitle(e.target.value)}
                            /> Mrs.
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="title"
                                value="Ms"
                                onChange={(e) => setTitle(e.target.value)}
                            /> Ms.
                        </label>
                    </div>

                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <FaUser className="icon" />
                    </div>

                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-box">
                        <input
                            type="tel"
                            placeholder="Mobile Number"
                            pattern="[0-9]{10}"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                        <FaMobileRetro className="icon" />
                    </div>

                    <div className="input-box">
                        <input
                            type="date"
                            placeholder="Date of Birth"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-box">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <FaEnvelope className="icon" />
                    </div>

                    <div className="input-box">
                        <input
                            type="password"
                            placeholder="Create Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <FaLock className="icon" />
                    </div>

                    <button type="submit">Register</button>

                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {success && <p style={{ color: "lightgreen" }}>{success}</p>}

                    <div className="register-link">
                        <p>Already have an account? <Link to="/login">Login</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
