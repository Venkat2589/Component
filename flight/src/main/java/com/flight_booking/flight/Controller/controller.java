package com.flight_booking.flight.Controller;

import java.time.LocalDate;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import com.flight_booking.flight.Entities.Flight;
import com.flight_booking.flight.Entities.Seats;
import com.flight_booking.flight.exception.flightNotFound;
import com.flight_booking.flight.services.service;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/flight")
public class controller {

    private static final Logger logger = LoggerFactory.getLogger(controller.class);
    private final service sr;

    public controller(service sr) {
        this.sr = sr;
    }

    @PostMapping
    public Flight create(@Valid @RequestBody Flight f) {
        logger.info("Creating new flight: {}", f);
        return sr.add(f);
    }

    @GetMapping("/list")
    public List<Flight> get() {
        logger.info("Fetching all flights");
        return sr.getall();
    }

    @GetMapping("/{id}")
    public Flight getById(@PathVariable Integer id) {
        logger.info("Fetching flight with ID: {}", id);
        return sr.getById(id);
    }
    @GetMapping("/number/{no}")
    public Flight getByFlightNo(@PathVariable String no) {
        logger.info("Fetching flight with ID: {}", no);
        return sr.getByFlightNo(no);
    }

    @DeleteMapping("/{flightId}")
    public void delete(@PathVariable Integer flightId) {
        logger.info("Deleting flight with ID: {}", flightId);
        Flight f = sr.getById(flightId);
        sr.deleteById(flightId);
        logger.info("Flight deleted successfully");
    }

    @GetMapping("/{source}/{destination}/{date}")
    public List<Flight> getAvailableFlights(@PathVariable String source,
                                            @PathVariable String destination,
                                            @PathVariable LocalDate date) throws flightNotFound {
        logger.info("Searching flights from {} to {} on {}", source, destination, date);
        List<Flight> flights = sr.getAvailableFlights(source, destination, date);
        if (flights.isEmpty()) {
            logger.warn("No flights found from {} to {} on {}", source, destination, date);
            throw new flightNotFound("Flights are not available on this route...");
        }
        return flights;
    }

    @PutMapping("/seats")
    public Seats updateSeats(@RequestParam String flightNo,
                             @RequestParam String seatClass,
                             @RequestParam Integer availableSeats) {
        logger.info("Updating seats for flight ID: {}, class: {}, new seat count: {}", flightNo, seatClass, availableSeats);
        return sr.updateSeats(flightNo, seatClass, availableSeats);
    }
}
