package com.example.hotel_booking.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Booking {
    @Id
    @GeneratedValue
    private Long bookingId;
    private String checkIn;
    private String checkOut;
    private String bookingStatus;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name="hotel_id")
    private Hotel hotel;

    @ManyToOne
    @JoinColumn(name="room_id")
    private Room room;
}
