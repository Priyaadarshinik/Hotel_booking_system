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
public class Room {
    @Id
    @GeneratedValue
    private Long roomId;

    private Long roomNumber;
    private String roomType;
    private String availabilityStatus;
    private int maxGuest;
    private double price;

    @ManyToOne
    @JoinColumn(name="hotel_id")
    private Hotel hotel;
}
