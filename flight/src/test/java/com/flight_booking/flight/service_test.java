package com.flight_booking.flight;

import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.mockito.MockitoAnnotations.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.options;

import com.flight_booking.flight.Entities.Flight;
import com.flight_booking.flight.Entities.Seats;
import com.flight_booking.flight.exception.flightNotFound;
import com.flight_booking.flight.jpa.Repository;
import com.flight_booking.flight.jpa.SeatRepository;
import com.flight_booking.flight.services.serviceimpl;

public class service_test {
	@Mock
	private Repository repo;
	@Mock
	private SeatRepository srepo;
	@InjectMocks
	private serviceimpl sr;
	
	@BeforeEach
	void setup() {
		MockitoAnnotations.openMocks(this);
	}
	
	@Test
	void testAddFlight() {
		Flight f = new Flight();
		Seats seat = new Seats();
		
		seat.setFlight(f);
		f.setSeat(Arrays.asList(seat));
		
		when(repo.save(f)).thenReturn(f);
		Flight result= sr.add(f);
		assertEquals(f, result);
		
	}
	
	@Test
	void testGetAllFlights() {
		Flight f= new Flight() ;
		
		List<Flight> list=Arrays.asList(f);
		
		when(repo.findAll()).thenReturn(list);
		
		List<Flight> result = sr.getall();
		assertEquals(1, result.size());
	}
	
	@Test
	void testGetByFlightId() {
		int flightId =1;
		Flight f=new Flight();		
		when(repo.findById(flightId)).thenReturn(Optional.of(f));		
		Flight result=sr.getById(flightId);
		assertEquals(f, result);
	}
	
	@Test
	void testFlightNotFound() {
		 int flightId = 1;
		 
	     when(repo.findById(flightId)).thenReturn(Optional.empty());
	     Exception e = assertThrows(flightNotFound.class,()-> sr.getById(flightId));
	     assertEquals("Flight with ID " + flightId + " not found.", e.getMessage());
	}
	
	@Test
	void testGetAvailableFlights() {
		LocalDate date = LocalDate.now();
        String source = "NYC";
        String destination = "LAX";       
        Flight f= new Flight();
        List<Flight> list = Arrays.asList(f);
        
        when(repo.findBySourceAndDestinationAndDate(source, destination, date)).thenReturn(list);
        List<Flight> result = sr.getAvailableFlights(source, destination, date);
        
        assertEquals(1, result.size());
	}
	
	@Test
	void testUpdateSeats() {
		int flightId=1;
		String flightNo="BA601";
		String seatClass="Economy";
		int available= 10;
		Flight f = new Flight();
		Seats seats =new Seats();
		
		when(repo.findByFlightNo(flightNo)).thenReturn(f);
		when(srepo.findBySeatClassAndFlight(seatClass, f)).thenReturn(Optional.of(seats));
		when(srepo.save(seats)).thenReturn(seats);
		
		Seats result=sr.updateSeats(flightNo, seatClass, available);
		assertEquals(available, result.getAvailableSeats());
	}
	
	
}
