package com.flight_booking.flight.Entities;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
public class Flight {

    @Id
    @Positive(message = "Flight ID must be a positive number")
    private int flightId;

    @NotBlank(message = "Flight number is required")
    @Size(max = 10, message = "Flight number must not exceed 10 characters")
    private String flightNo;
    
    @NotBlank(message = "flightName is required")
    @Size(max = 50, message = "flightName must not exceed 50 characters")
    private String flightName;
    
    @NotBlank(message = "sourceAirport is required")
    @Size(max = 50, message = "sourceAirport must not exceed 50 characters")
    private String sourceAirport;
    
    @NotBlank(message = "destinationAirport is required")
    @Size(max = 50, message = "destinationAirport must not exceed 50 characters")
    private String destinationAirport;

    @NotBlank(message = "Source is required")
    @Size(max = 50, message = "Source must not exceed 50 characters")
    private String source;

    @NotBlank(message = "Destination is required")
    @Size(max = 50, message = "Destination must not exceed 50 characters")
    private String destination;

    @NotNull(message = "Date is required")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy", locale = "en")
    @Column(name = "date")
    private LocalDate date;
    
    @NotNull(message = "Date is required")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy", locale = "en")
    private LocalDate endDate;
    
    @NotNull(message = "Time is required")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm", timezone = "IST")
    private LocalTime depatureTime;
    
    @NotNull(message = "Time is required")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm", timezone = "IST")
    private LocalTime arrivalTime;


    @OneToMany(mappedBy = "flight", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<Seats> seat;

    public List<Seats> getSeat() {
        return seat;
    }

    public void setSeat(List<Seats> seat) {
        this.seat = seat;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public int getFlightId() {
        return flightId;
    }
    
    
    public String getFlightName() {
		return flightName;
	}

	public void setFlightName(String flightName) {
		this.flightName = flightName;
	}

	public String getSourceAirport() {
		return sourceAirport;
	}

	public void setSourceAirport(String sourceAirport) {
		this.sourceAirport = sourceAirport;
	}

	public String getDestinationAirport() {
		return destinationAirport;
	}

	public void setDestinationAirport(String destinationAirport) {
		this.destinationAirport = destinationAirport;
	}

	public LocalDate getEndDate() {
		return endDate;
	}

	public void setEndDate(LocalDate endDate) {
		this.endDate = endDate;
	}

	public LocalTime getDepatureTime() {
		return depatureTime;
	}

	public void setDepatureTime(LocalTime depatureTime) {
		this.depatureTime = depatureTime;
	}

	public LocalTime getArrivalTime() {
		return arrivalTime;
	}

	public void setArrivalTime(LocalTime arrivalTime) {
		this.arrivalTime = arrivalTime;
	}

	public void setFlightId(int flightId) {
        this.flightId = flightId;
    }

    public String getFlightNo() {
        return flightNo;
    }

    public void setFlightNo(String flightNo) {
        this.flightNo = flightNo;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }




    
    public Flight(@Positive(message = "Flight ID must be a positive number") int flightId,
			@NotBlank(message = "Flight number is required") @Size(max = 10, message = "Flight number must not exceed 10 characters") String flightNo,
			@NotBlank(message = "flightName is required") @Size(max = 50, message = "flightName must not exceed 50 characters") String flightName,
			@NotBlank(message = "sourceAirport is required") @Size(max = 50, message = "sourceAirport must not exceed 50 characters") String sourceAirport,
			@NotBlank(message = "destinationAirport is required") @Size(max = 50, message = "destinationAirport must not exceed 50 characters") String destinationAirport,
			@NotBlank(message = "Source is required") @Size(max = 50, message = "Source must not exceed 50 characters") String source,
			@NotBlank(message = "Destination is required") @Size(max = 50, message = "Destination must not exceed 50 characters") String destination,
			@NotNull(message = "Date is required") LocalDate date,
			@NotNull(message = "Date is required") LocalDate endDate,
			@NotNull(message = "Time is required") LocalTime depatureTime,
			@NotNull(message = "Time is required") LocalTime arrivalTime, List<Seats> seat) {
		this.flightId = flightId;
		this.flightNo = flightNo;
		this.flightName = flightName;
		this.sourceAirport = sourceAirport;
		this.destinationAirport = destinationAirport;
		this.source = source;
		this.destination = destination;
		this.date = date;
		this.endDate = endDate;
		this.depatureTime = depatureTime;
		this.arrivalTime = arrivalTime;
		this.seat = seat;
	}

	public Flight() {
    }


}
