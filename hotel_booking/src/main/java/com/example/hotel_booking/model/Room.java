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
    public enum RoomStatus {
        AVAILABLE,
        BOOKED,
        MAINTENANCE
    }
    @Id
    @GeneratedValue
    private Long roomId;

    private Long roomNumber;
    private String roomType;
    @Enumerated(EnumType.STRING)
    private RoomStatus availabilityStatus;
    private Integer maxGuest;
    private Double price;

    @ManyToOne
    @JoinColumn(name="hotelId")
    private Hotel hotel;
}
