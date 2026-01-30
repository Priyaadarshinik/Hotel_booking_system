package com.example.hotel_booking.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

import java.time.LocalDateTime;

@Entity
public class Payment {
    @Id
    private Long paymentId;
    private double totalPrice;
    private String paymentMethod;
    private LocalDateTime paymentDate;
    private String transactionId;
    private String paymentStatus;
    // FK → Booking
    @OneToOne
    @JoinColumn(name = "booking_id")
    private Booking booking;
}
