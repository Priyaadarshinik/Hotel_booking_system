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
    public enum RoomType {
        SINGLE,
        DOUBLE,
        PREMIUM
    }
    @Id
    @GeneratedValue
    private Long roomId;
    @Enumerated(EnumType.STRING)
    private RoomType roomType;
    private Integer maxGuest;
    private Double price;
    private Integer quantity;
    @ManyToOne
    @JoinColumn(name="hotelId")
    private Hotel hotel;
}
