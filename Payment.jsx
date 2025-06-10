import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './Payment.css';

const PaymentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { bookingId, fare, noOfSeats } = location.state || {};

    const [orderDetails, setOrderDetails] = useState(null);
    const totalAmount = fare * noOfSeats;

    useEffect(() => {
        if (!bookingId || !fare || !noOfSeats) {
            alert("Missing payment details.");
            navigate("/");
            return;
        }

        const createOrder = async () => {
            try {
                const response = await fetch("http://localhost:1007/create-order", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        amount: totalAmount,
                        bookingId: bookingId
                    })
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error("❌ Backend responded with error:", errorText);
                    throw new Error("Failed to create order");
                }

                const data = await response.json();
                console.log("✅ Order created:", data);
                setOrderDetails(data);
            } catch (error) {
                console.error("❌ Error creating order:", error);
                alert("Failed to initiate payment.");
            }
        };

        createOrder();
    }, [bookingId, fare, noOfSeats, totalAmount, navigate]);

    const loadRazorpay = () => {
        const options = {
            key: "rzp_test_uPDEW7aB0sIjip", // Replace with your Razorpay key
            amount: orderDetails.amount,
            currency: "INR",
            name: "AeroVista Payments",
            description: "Secure payment for flight booking",
            order_id: orderDetails.order_id,
            handler: async function (response) {
                try {
                    const captureRes = await fetch("http://localhost:1007/capture-payment", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            paymentId: response.razorpay_payment_id,
                            orderId: response.razorpay_order_id,
                            amount: totalAmount
                        })
                    });

                    const result = await captureRes.text();
                    alert("✅ Payment Successful!\n" + result);
                    navigate("/confirmation", {
                        state: {
                            bookingId,
                            passengerId: location.state.passengerId
                        }
                    });
                } catch (err) {
                    console.error("Payment capture failed:", err);
                    alert("Payment failed. Please try again.");
                }
            },
            prefill: {
                name: "Your Name",
                email: "email@example.com",
                contact: "9876543210"
            },
            theme: {
                color: "#007bff"
            }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <div className="payment-container">
            <div className="payment-card">
                <h2>Confirm Your Payment</h2>
                <p className="subtitle">Please review your booking details before proceeding.</p>
                <div className="details">
                    <p><strong>Booking ID:</strong> {bookingId}</p>
                    <p><strong>Fare per Passenger:</strong> ₹{fare}</p>
                    <p><strong>No. of Passengers:</strong> {noOfSeats}</p>
                    <p><strong>Total Amount:</strong> ₹{totalAmount}</p>
                </div>
                {orderDetails ? (
                    <button onClick={loadRazorpay} className="payment-button">
                        Proceed to Pay ₹{totalAmount}
                    </button>
                ) : (
                    <p className="loading-text">Generating secure payment link...</p>
                )}
                <p className="note">All payments are secured by Razorpay.</p>
            </div>
        </div>
    );
};

export default PaymentPage;
