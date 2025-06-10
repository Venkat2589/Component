import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import './Confirmation.css';

const ConfirmationPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { bookingId: paramBookingId } = useParams();

    const bookingId = location.state?.bookingId || paramBookingId;

    const [passengers, setPassengers] = useState([]);
    const [redirectMessage, setRedirectMessage] = useState("");

    useEffect(() => {
        if (!bookingId) {
            alert("Missing booking ID.");
            navigate("/main");
            return;
        }

        const fetchPassengers = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    alert("Authorization token missing. Please log in again.");
                    navigate("/login");
                    return;
                }

                const response = await fetch(`http://localhost:1001/book/booking/id/${bookingId}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                const data = await response.json();
                console.log("📦 Booking data:", data);

                if (data.length > 0 && data[0].passengers) {
                    setPassengers(data[0].passengers);
                }

                setRedirectMessage("✅ Payment successful! Redirecting to home page in 5 seconds...");
                setTimeout(() => {
                    navigate("/main");
                }, 7000);
            } catch (error) {
                console.error("Failed to fetch booking details:", error);
            }
        };

        fetchPassengers();
    }, [bookingId, navigate]);

    return (
        <div className="confirmation-container">
            <div className="confirmation-card">
                <div className="icon-circle">✔</div>
                <h2>Booking Confirmed</h2>
                <p className="success-text">Thank you for your payment. Your flight has been successfully booked.</p>

                {bookingId && (
                    <p className="booking-id"><strong>Booking ID:</strong> {bookingId}</p>
                )}

                {redirectMessage && (
                    <p className="redirect-message">{redirectMessage}</p>
                )}

                {passengers.length > 0 ? (
                    <div className="passenger-list">
                        <h3>Passenger Information</h3>
                        {passengers.map((p, index) => (
                            <div key={p.passenger_id} className="passenger-card">
                                <p><strong>Passenger {index + 1}</strong></p>
                                <p><strong>Name:</strong> {p.first_name} {p.last_name}</p>
                                <p><strong>Gender:</strong> {p.gender}</p>
                                <p><strong>Seat No:</strong> {p.seatNo}</p>
                                <p><strong>Passenger ID:</strong> {p.passenger_id}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Loading passenger details...</p>
                )}
            </div>
        </div>
    );
};

export default ConfirmationPage;
