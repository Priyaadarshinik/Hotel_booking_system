package com.example.hotel_booking.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Payment {
    @Id
    @GeneratedValue
    private Long payment_Id;
    private double totalPrice;
    private String paymentMethod;
    private LocalDateTime paymentDate;
    private String transactionId;
    private String paymentStatus;
    // FK → Booking
    @OneToOne
    @JoinColumn(name = "bookingId")
    private Booking booking;
}
