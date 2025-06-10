package com.flight_booking.flight.jpa;

import java.nio.channels.SelectableChannel;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PathVariable;

import com.flight_booking.flight.Entities.Flight;

import jakarta.persistence.criteria.From;

@org.springframework.stereotype.Repository
public interface Repository extends JpaRepository<Flight,Integer>{
	
	@Query(value="Select * From flight where date LIKE :date and source LIKE :source and destination LIKE :destination", nativeQuery=true)
	List<Flight> findBySourceAndDestinationAndDate(String source, String destination, LocalDate date);
	
	Flight findByFlightNo(String flightNo);
}
