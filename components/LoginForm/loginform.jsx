import React, { useState } from "react";
import './loginForm.css';
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:9006/auth/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                throw new Error("Invalid credentials");
            }

            const token = await response.text();

            if (!token || token.length < 10) {
                throw new Error("Token not found in response");
            }

            localStorage.setItem("token", token);
            alert("Login successful!");
            navigate("/main");
    
        } catch (err) {
            console.error("Login error:", err);
            setError(err.message || "Login failed");
        }
    };

    return (
    <div className="login-wrapper">
        <div className="wrapper">
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
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
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <FaLock className="icon" />
                </div>

                <div className="remember-forget">
                    <label><input type="checkbox" /> Remember me</label>
                    <a href="#">Forget Password?</a>
                </div>

                <button type="submit">Login</button>

                {error && <p style={{ color: "red" }}>{error}</p>}

                <div className="register">
                    <p>Don't have an account? <a href="/register">Register</a></p>
                </div>
            </form>
        </div>
    </div>
);

};

export default LoginForm;
