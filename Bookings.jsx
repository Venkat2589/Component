import React, { useState } from "react";
import "./Bookings.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import QRCode from "qrcode";
import JsBarcode from "jsbarcode";

const Bookings = () => {
    const [bookingId, setBookingId] = useState("");
    const [passengers, setPassengers] = useState([]);
    const [checkinStatus, setCheckinStatus] = useState({});
    const [boardingPassReady, setBoardingPassReady] = useState({});
    const [cancelEligibility, setCancelEligibility] = useState({});
    const [error, setError] = useState("");

    const fetchPassengers = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please log in first.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:1001/book/booking/id/${bookingId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();

            if (data.length > 0 && data[0].passengers) {
                const flightNo = data[0].flightNo;
                const enrichedPassengers = data[0].passengers.map(p => ({
                    ...p,
                    flightNo
                }));

                setPassengers(enrichedPassengers);
                setError("");

                enrichedPassengers.forEach(async (p) => {
                    try {
                        const statusRes = await fetch(`http://localhost:1001/checkin/status/${p.passenger_id}`, {
                            method: "GET",
                            headers: {
                                "Authorization": `Bearer ${token}`
                            }
                        });

                        const status = await statusRes.text();
                        setCancelEligibility(prev => ({
                            ...prev,
                            [p.passenger_id]: status === "0"
                        }));
                    } catch (err) {
                        console.error(`Error checking status for passenger ${p.passenger_id}:`, err);
                    }
                });

            } else {
                setPassengers([]);
                setError("No passengers found for this booking ID.");
            }
        } catch (err) {
            console.error("Error fetching passengers:", err);
            setError("Failed to fetch booking details.");
        }
    };

    const handleCheckin = async (passenger) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Authorization token missing. Please log in again.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:1001/checkin/${passenger.passenger_id}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            const message = await response.text();
            if (!response.ok) throw new Error(message);

            setCheckinStatus(prev => ({
                ...prev,
                [passenger.passenger_id]: message
            }));

            setBoardingPassReady(prev => ({
                ...prev,
                [passenger.passenger_id]: true
            }));

            setCancelEligibility(prev => ({
                ...prev,
                [passenger.passenger_id]: false
            }));
        } catch (err) {
            console.error("Check-in error:", err);
            setCheckinStatus(prev => ({
                ...prev,
                [passenger.passenger_id]: err.message || "Check-in failed. Please try again."
            }));
        }
    };
        const handleCancelBooking = async (passengerId) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Authorization token missing. Please log in again.");
            return;
        }

        if (!cancelEligibility[passengerId]) {
            alert("This passenger has already checked in and cannot be cancelled.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:1001/book/cancel/passenger/${passengerId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            const result = await response.text();

            if (result === "1") {
                alert("Booking cancelled successfully.");
                setPassengers(prev => prev.filter(p => p.passenger_id !== passengerId));
            } else {
                alert("Failed to cancel booking. Please try again.");
            }
        } catch (err) {
            console.error("Cancellation error:", err);
            alert("Error cancelling booking: " + err.message);
        }
    };

    const generateBoardingPass = async (passenger) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Authorization token missing.");
            return;
        }

        try {
            const url = `http://localhost:1001/flight/number/${passenger.flightNo}`;
            const flightRes = await fetch(url, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            const rawText = await flightRes.clone().text();
            if (!rawText) throw new Error("Flight API returned empty response.");

            let flightData;
            try {
                flightData = JSON.parse(rawText);
            } catch {
                throw new Error("Failed to parse flight data JSON.");
            }

            const doc = new jsPDF("landscape", "mm", [100, 200]);
            doc.setFontSize(18);
            doc.setTextColor(30, 30, 120);
            doc.text("AeroVista Airlines", 100, 15, { align: "center" });

            doc.setFontSize(12);
            doc.setTextColor(0);
            doc.text("Boarding Pass", 100, 25, { align: "center" });

            autoTable(doc, {
                startY: 30,
                theme: "grid",
                styles: { fontSize: 10 },
                head: [["Field", "Details"]],
                body: [
                    ["Name", `${passenger.first_name} ${passenger.last_name}`],
                    ["Gender", passenger.gender],
                    ["Passenger ID", passenger.passenger_id],
                    ["Flight No", passenger.flightNo],
                    ["Flight Name", flightData.flightName],
                    ["From", `${flightData.source} - ${flightData.sourceAirport}`],
                    ["To", `${flightData.destination} - ${flightData.destinationAirport}`],
                    ["Departure", `${flightData.date} at ${flightData.depatureTime}`],
                    ["Arrival", `${flightData.date} at ${flightData.arrivalTime}`],
                    ["Gate", passenger.gate || "B12"],
                    ["Seat", passenger.seatNo],
                    ["Status", "Checked-In"]
                ]
            });

            const qrData = `PassengerID: ${passenger.passenger_id}, Flight: ${passenger.flightNo}, Seat: ${passenger.seatNo}`;
            const qrImage = await QRCode.toDataURL(qrData);
            doc.addImage(qrImage, "PNG", 150, 30, 30, 30);

            const canvas = document.createElement("canvas");
            JsBarcode(canvas, `${passenger.passenger_id}`, {
                format: "CODE128",
                width: 2,
                height: 30,
                displayValue: false
            });
            const barcodeData = canvas.toDataURL("image/png");
            doc.addImage(barcodeData, "PNG", 10, 75, 60, 15);

            doc.save(`BoardingPass_${passenger.passenger_id}.pdf`);
        } catch (err) {
            console.error("❌ Error generating boarding pass:", err);
            alert("Failed to generate boarding pass: " + err.message);
        }
    };

    return (
        <div className="bookings-container">
            <h2>🔍 View Your Booking</h2>
            <input
                type="text"
                placeholder="Enter Booking ID"
                value={bookingId}
                onChange={(e) => setBookingId(e.target.value)}
            />
            <button onClick={fetchPassengers}>Fetch Booking</button>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {passengers.length > 0 && (
                <div className="passenger-list">
                    <h3>Passenger Details</h3>
                    {passengers.map((p, index) => (
                        <div key={p.passenger_id} className="passenger-card">
                            <p><strong>Passenger {index + 1}</strong></p>
                            <p><strong>Name:</strong> {p.first_name} {p.last_name}</p>
                            <p><strong>Gender:</strong> {p.gender}</p>
                            <p><strong>Seat No:</strong> {p.seatNo}</p>
                            <p><strong>Passenger ID:</strong> {p.passenger_id}</p>
                            <p><strong>Flight No:</strong> {p.flightNo}</p>

                            {checkinStatus[p.passenger_id] ? (
                                <>
                                    <p style={{ color: "green" }}>{checkinStatus[p.passenger_id]}</p>
                                    {boardingPassReady[p.passenger_id] && (
                                        <button
                                            onClick={() => generateBoardingPass(p)}
                                            style={{ marginTop: "10px", backgroundColor: "#6f42c1", color: "white" }}
                                        >
                                            Generate Boarding Pass
                                        </button>
                                    )}
                                </>
                            ) : (
                                <button onClick={() => handleCheckin(p)}>
                                    Check-In
                                </button>
                            )}

                           
                            {cancelEligibility[p.passenger_id] && checkinStatus[p.passenger_id] !== "1" && (
                                <button
                                    className="cancel-button"
                                    onClick={() => handleCancelBooking(p.passenger_id)}
                                >
                                    Cancel Booking
                                </button>
                            )}

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Bookings;
