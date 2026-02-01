package com.example.hotel_booking.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Cancellation {
    @Id
    @GeneratedValue
    private Long cancellationId;
    private String reason;
    private double cancellationFee;
    private String cancellationDate;
    private String refundStatus;

    @OneToOne
    @JoinColumn(name = "booking_id")
    private Booking booking;
}
