package com.example.hotel_booking.handler;

public class ConflictException extends RuntimeException {
    public ConflictException(String message) {
        super(message);
    }
}
