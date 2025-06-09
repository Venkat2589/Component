import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Homepage.css';

const Homepage = () => {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [departure, setDeparture] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSearch = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("You must be logged in to search flights.");
            return;
        }

        if (!from || !to || !departure) {
            alert("Please fill in all fields.");
            return;
        }

        const url = `http://localhost:1001/flight/${from}/${to}/${departure}`;

        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error("Failed to fetch flights");

            const data = await response.json();
            setError("");
            navigate("/results", { state: { flights: data } });
        } catch (err) {
            console.error("Error fetching flights:", err);
            setError("Error fetching flights. Please try again.");
        }
    };

    return (
        <div className="homepage-background">
            <div className="homepage-wrapper glass">
                <h1 className="main-heading">Find Your Perfect Flight</h1>

                <div className="input-group">
                    <label>From</label>
                    <input
                        type="text"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        placeholder="Enter departure airport (e.g. DEL)"
                    />
                </div>

                <div className="input-group">
                    <label>To</label>
                    <input
                        type="text"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        placeholder="Enter destination airport (e.g. BOM)"
                    />
                </div>

                <div className="input-group">
                    <label>Departure Date</label>
                    <input
                        type="date"
                        value={departure}
                        onChange={(e) => setDeparture(e.target.value)}
                    />
                </div>

                <button className="search-btn" onClick={handleSearch}>Search Flights</button>

                {error && <p className="error-text">{error}</p>}
            </div>
        </div>
    );
};

export default Homepage;
