import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Flightresult.css";

const FlightResults = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const flights = location.state?.flights || [];

    const [selectedClasses, setSelectedClasses] = useState({});
    const [noOfSeats, setNoOfSeats] = useState({});

    const handleSeatClassChange = (flightNo, seatClass) => {
        setSelectedClasses((prev) => ({
            ...prev,
            [flightNo]: seatClass
        }));
    };

    const handleSeatCountChange = (flightNo, value) => {
        setNoOfSeats((prev) => ({
            ...prev,
            [flightNo]: value
        }));
    };

    const handleBook = (flightNo, fare) => {
        const selectedClass = selectedClasses[flightNo];
        const seats = noOfSeats[flightNo];

        if (!selectedClass || !seats) {
            alert("Please select seat class and number of passengers.");
            return;
        }

        navigate("/addpassengers", {
            state: {
                flightNo,
                seatClass: selectedClass,
                noOfSeats: parseInt(seats),
                fare
            }
        });
    };

    return (
        <div className="flight-results-page">
            <h2 className="page-title">Available Flights</h2>

            {flights.length === 0 ? (
                <p className="no-flights">No flights found.</p>
            ) : (
                <div className="flight-grid">
                    {flights.map((flight) => (
                        <div key={flight.flightNo} className="flight-card">
                            <div className="flight-header">
                                <img src="fltlogo.jpg" alt="Flight Logo" className="flight-logo" />
                                <h4>{flight.flightNo} | {flight.source} → {flight.destination}</h4>
                            </div>
                            <p><strong>Date:</strong> {flight.date}</p>
                            <p><strong>Fare:</strong> ₹{flight.fare}</p>

                            <div className="seat-info">
                                {flight.seat.map((s) => (
                                    <label key={s.id} className="seat-class">
                                        <input
                                            type="radio"
                                            name={`seatClass-${flight.flightNo}`}
                                            value={s.seatClass}
                                            checked={selectedClasses[flight.flightNo] === s.seatClass}
                                            onChange={() => handleSeatClassChange(flight.flightNo, s.seatClass)}
                                        />
                                        <strong>{s.seatClass}</strong>: {s.availableSeats} / {s.noOfSeats}
                                    </label>
                                ))}
                            </div>

                            <div className="seat-count">
                                <label>
                                    No. of Passengers:
                                    <input
                                        type="number"
                                        min="1"
                                        value={noOfSeats[flight.flightNo] || ""}
                                        onChange={(e) => handleSeatCountChange(flight.flightNo, e.target.value)}
                                    />
                                </label>
                            </div>

                            <button
                                className="book-btn"
                                onClick={() => handleBook(flight.flightNo, flight.fare)}
                            >
                                Book
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FlightResults;
