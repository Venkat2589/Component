package com.flight_booking.flight.exception;

public class InvalidAvailableSeats extends RuntimeException{
	
	public InvalidAvailableSeats(String s) {
		super(s);
	}

}
