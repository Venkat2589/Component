package com.flight_booking.flight;

import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.flight_booking.flight.Controller.controller;
import com.flight_booking.flight.Entities.Flight;
import com.flight_booking.flight.Entities.Seats;
import com.flight_booking.flight.services.service;

public class controller_test {
	@Mock
	private service sr;
	
	@InjectMocks
	private controller cr;
	
	@BeforeEach
	void setup() {
		MockitoAnnotations.openMocks(this);
	}
	
	@Test
	void testCreateFlight() {
		Flight f=new Flight();
		
		when(sr.add(f)).thenReturn(f);
		Flight result=cr.create(f);
		
		assertEquals(f, result);
	}
	
	@Test
	void testGetAllFlights() {
        Flight f = new Flight();
        List<Flight> list = Arrays.asList(f);

        when(sr.getall()).thenReturn(list);

        List<Flight> result = cr.get();

        assertEquals(1, result.size());
    }
	
	@Test
	void testGetFlightById() {
		int flightId=1;
		Flight f = new Flight();
		
		when(sr.getById(flightId)).thenReturn(f);
		
		Flight result= cr.getById(flightId);
		assertEquals(f, result);
	}
	
	@Test
	void testGetAvailableFlights() {
		LocalDate date = LocalDate.now();
        String source = "NYC";
        String destination = "LAX";
        Flight f = new Flight();
        
        List<Flight> list=Arrays.asList(f);
        
        when(sr.getAvailableFlights(source, destination, date)).thenReturn(list);
        
        List<Flight> result= cr.getAvailableFlights(source, destination, date);
        assertEquals(1, result.size());
	}
	
	@Test
	void testUpdateSeats() {
		int flightId =1;
		String seatClass="Economy";
		String flightNo="BA601";
		int available=10;
		Seats seat= new Seats();
		seat.setAvailableSeats(available);
		when(sr.updateSeats(flightNo, seatClass, available)).thenReturn(seat);
		
		Seats result=cr.updateSeats(flightNo, seatClass, available);
		assertEquals(available, result.getAvailableSeats());
	}
}

