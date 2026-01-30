package com.example.hotel_booking.model;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
    private Long roomId;

    private String roomType;
    private String availabilityStatus;
    private int maxGuest;
    private double price;

    @ManyToOne
    @JoinColumn(name="hotel_id")
    private Hotel hotel;
}
