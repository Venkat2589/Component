package com.flight_booking.flight.jpa;

import com.flight_booking.flight.Entities.Flight;
import com.flight_booking.flight.Entities.Seats;

import org.hibernate.type.TrueFalseConverter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SeatRepository extends JpaRepository<Seats, Integer> {
    Optional<Seats> findBySeatClassAndFlight(String seatClass, Flight flight);
   
}
