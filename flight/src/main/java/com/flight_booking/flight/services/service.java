package com.flight_booking.flight.services;

import java.time.LocalDate;
import java.util.List;

import com.flight_booking.flight.Entities.Flight;
import com.flight_booking.flight.Entities.Seats;

public interface service {
	
	Flight add(Flight f);
	List<Flight> getall();
	Flight getById(Integer id);
	Flight getByFlightNo(String no);
	void  deleteById(Integer id);
	public List<Flight> getAvailableFlights(String source,String destination,LocalDate date);
    Seats updateSeats(String flightNo, String seatClass, int availableSeats);
	
   
}
