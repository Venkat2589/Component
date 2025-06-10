package com.flight_booking.flight.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.flight_booking.flight.Entities.FlightException;
import com.flight_booking.flight.exception.InvalidAvailableSeats;
import com.flight_booking.flight.exception.flightNotFound;

@RestControllerAdvice
public class exceptionController {
	
	@ExceptionHandler(flightNotFound.class)
	public ResponseEntity<Object> flightNotFound(Exception e) {
		FlightException fe = new FlightException(1,e.getMessage(),"Enter a Valid Details");
		return new ResponseEntity(fe,HttpStatus.BAD_REQUEST);
		
	}
	
	@ExceptionHandler(InvalidAvailableSeats.class)
	public ResponseEntity<Object> InvalidAvailableSeats(Exception e) {
		FlightException fe= new FlightException(1,e.getMessage(),"Enter a positive number for available seats");
		return new ResponseEntity(fe,HttpStatus.BAD_REQUEST);
	}
}
