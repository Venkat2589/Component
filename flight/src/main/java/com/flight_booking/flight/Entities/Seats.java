package com.flight_booking.flight.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
public class Seats {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank(message = "Seat class is required")
    @Size(max = 20, message = "Seat class must not exceed 20 characters")
    private String seatClass;

    @Min(value = 1, message = "Number of seats must be at least 1")
    private int noOfSeats;

    @Min(value = 0, message = "Available seats cannot be negative")
    private int availableSeats;
    
    @Min(value = 0, message = "Fare must be non-negative")
    private int fare;

    @ManyToOne
    @JoinColumn(name = "flight_Id", nullable = true)
    @JsonBackReference
    private Flight flight;

    

    public int getFare() {
		return fare;
	}

	public void setFare(int fare) {
		this.fare = fare;
	}

	public int getId() {
        return id;
    }

    public String getSeatClass() {
        return seatClass;
    }

    public void setSeatClass(String seatClass) {
        this.seatClass = seatClass;
    }

    public int getNoOfSeats() {
        return noOfSeats;
    }

    public void setNoOfSeats(int noOfSeats) {
        this.noOfSeats = noOfSeats;
    }

    public int getAvailableSeats() {
        return availableSeats;
    }

    public void setAvailableSeats(int availableSeats) {
        this.availableSeats = availableSeats;
    }

    public Flight getFlight() {
        return flight;
    }

    public void setFlight(Flight flight) {
        this.flight = flight;
    }


    public Seats() {
    }



	public Seats(int id,
			@NotBlank(message = "Seat class is required") @Size(max = 20, message = "Seat class must not exceed 20 characters") String seatClass,
			@Min(value = 1, message = "Number of seats must be at least 1") int noOfSeats,
			@Min(value = 0, message = "Available seats cannot be negative") int availableSeats,
			@Min(value = 0, message = "Fare must be non-negative") int fare, Flight flight) {
		this.id = id;
		this.seatClass = seatClass;
		this.noOfSeats = noOfSeats;
		this.availableSeats = availableSeats;
		this.fare = fare;
		this.flight = flight;
	}
}
