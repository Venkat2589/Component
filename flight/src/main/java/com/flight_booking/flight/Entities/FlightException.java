package com.flight_booking.flight.Entities;

public class FlightException {

	public FlightException(int id, String msg, String suggestion) {
		super();
		this.id = id;
		this.msg = msg;
		this.suggestion = suggestion;
	}
	public FlightException() {
		super();
		// TODO Auto-generated constructor stub
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	public String getSuggestion() {
		return suggestion;
	}
	public void setSuggestion(String suggestion) {
		this.suggestion = suggestion;
	}
	private int id;
	private String msg;
	private String suggestion;
}
