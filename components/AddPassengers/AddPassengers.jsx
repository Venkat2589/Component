import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './AddPassengers.css';

const AddPassengers = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { flightNo, seatClass, noOfSeats, fare } = location.state || {};

    const [userId, setUserId] = useState("");
    const [passengers, setPassengers] = useState(
        Array.from({ length: noOfSeats }, () => ({
            first_name: "",
            last_name: "",
            gender: ""
        }))
    );
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (index, field, value) => {
        const updated = [...passengers];
        updated[index][field] = value;
        setPassengers(updated);
    };

    const handleSubmit = async () => {
        if (!userId) {
            alert("Please enter your User ID.");
            return;
        }

        const bookingData = {
            userId: parseInt(userId),
            flightNo,
            noOfSeats,
            passengers
        };

        const token = localStorage.getItem("token");
        if (!token) {
            alert("Authorization token missing. Please log in again.");
            return;
        }

        const url = `http://localhost:1001/book/booking/${noOfSeats}/${seatClass}/${flightNo}`;

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(bookingData)
            });

            const resultText = await response.text();
            console.log("📦 Booking response text:", resultText);

            if (!response.ok) throw new Error(resultText);

            // Extract bookingId and passengerId from response text
            const bookingIdMatch = resultText.match(/BOOKING-ID[:\s]*(\d+)/i);
            const passengerIdMatch = resultText.match(/id[=: ]+(\d+)/i);

            const bookingId = bookingIdMatch ? parseInt(bookingIdMatch[1]) : null;
            const passengerId = passengerIdMatch ? parseInt(passengerIdMatch[1]) : null;

            if (!bookingId || !passengerId) {
                throw new Error("Booking or Passenger ID not found in response.");
            }

            setSuccessMessage("✅ Passengers added successfully. Redirecting to payment page...");

            setTimeout(() => {
                navigate("/payment", {
                    state: {
                        bookingId,
                        fare,
                        noOfSeats,
                        passengerId
                    }
                });
            }, 3000);
        } catch (error) {
            console.error("Booking error:", error);
            alert("Booking failed: " + error.message);
        }
    };

    if (!flightNo || !seatClass || !noOfSeats) {
        return <p style={{ textAlign: "center", color: "red" }}>Missing booking details. Please go back and select a flight.</p>;
    }

    return (
        <div className="add-passengers-page">
            <h2>Add Passenger Details</h2>
            <p><strong>Flight No:</strong> {flightNo}</p>
            <p><strong>Seat Class:</strong> {seatClass}</p>
            <p><strong>No. of Passengers:</strong> {noOfSeats}</p>

            <div className="user-id-input">
                <label>User ID:
                    <input
                        type="number"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="Enter your User ID"
                        required
                    />
                </label>
            </div>

            {passengers.map((p, index) => (
                <div key={index} className="passenger-form">
                    <h4>Passenger {index + 1}</h4>
                    <input
                        type="text"
                        placeholder="First Name"
                        value={p.first_name}
                        onChange={(e) => handleChange(index, "first_name", e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={p.last_name}
                        onChange={(e) => handleChange(index, "last_name", e.target.value)}
                        required
                    />
                    <select
                        value={p.gender}
                        onChange={(e) => handleChange(index, "gender", e.target.value)}
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
            ))}

            <button onClick={handleSubmit}>Submit Booking</button>

            {successMessage && (
                <p style={{ color: "green", textAlign: "center", marginTop: "20px" }}>
                    {successMessage}
                </p>
            )}
        </div>
    );
};

export default AddPassengers;
