package com.flight_booking.flight.services;

import java.time.LocalDate;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.flight_booking.flight.Entities.Flight;
import com.flight_booking.flight.Entities.Seats;
import com.flight_booking.flight.exception.InvalidAvailableSeats;
import com.flight_booking.flight.exception.flightNotFound;
import com.flight_booking.flight.jpa.Repository;
import com.flight_booking.flight.jpa.SeatRepository;

@Service
public class serviceimpl implements service {

    private static final Logger logger = LoggerFactory.getLogger(serviceimpl.class);

    private final Repository r;
    private final SeatRepository sr;

    public serviceimpl(Repository r, SeatRepository sr) {
        this.r = r;
        this.sr = sr;
    }

    @Override
    public Flight add(Flight f) {
        logger.info("Adding new flight: {}", f);
        List<Seats> seats = f.getSeat();
        if (!seats.isEmpty()) {
            for (Seats seat : seats) {
                seat.setFlight(f);
            }
        }
        Flight savedFlight = r.save(f);
        return savedFlight;
    }

    @Override
    public List<Flight> getall() {
        logger.info("Fetching all flights");
        return r.findAll();
    }

    @Override
    public Flight getById(Integer id) {
        logger.info("Fetching flight by ID: {}", id);
        return r.findById(id)
                .orElseThrow(() -> {
                    logger.warn("Flight with ID {} not found", id);
                    return new flightNotFound("Flight with ID " + id + " not found.");
                });
    }

    @Override
    public void deleteById(Integer id) {
        logger.info("Deleting flight with ID: {}", id);
        r.deleteById(id);
        logger.info("Flight deleted successfully");
    }

    @Override
    public List<Flight> getAvailableFlights(String source, String destination, LocalDate date) {
        logger.info("Fetching available flights from {} to {} on {}", source, destination, date);
        return r.findBySourceAndDestinationAndDate(source, destination, date);
    }

    @Override
    public Seats updateSeats(String flightNo, String seatClass, int availableSeats) {
        logger.info("Updating seats for flight ID: {}, class: {}, new seat count: {}", flightNo, seatClass, availableSeats);

        if (availableSeats < 0) {
            logger.error("Invalid seat count: {}", availableSeats);
            throw new InvalidAvailableSeats("Available seats are negative..Please enter a positive number");
        }

        Flight f = r.findByFlightNo(flightNo);
                

        Seats seat = sr.findBySeatClassAndFlight(seatClass, f)
                .orElseThrow(() -> {
                    logger.warn("Seats not found for flight ID {} and class {}", flightNo, seatClass);
                    return new flightNotFound("Seats not found for the given flight and class");
                });

        seat.setAvailableSeats(availableSeats);
        Seats updatedSeat = sr.save(seat);
        logger.info("Seats updated successfully for flight ID: {}", flightNo);
        return updatedSeat;
    }

	@Override
	public Flight getByFlightNo(String no) {
		 logger.info("Fetching flight by ID: {}", no);
	        return r.findByFlightNo(no);
	}
}
