package com.example.hotel_booking.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Review {
    @Id
    @GeneratedValue
    private Long reviewId;
    private String review;
    private Integer ratings;
    private LocalDate reviewDate;

    // FK → Hotel
    @ManyToOne
    @JoinColumn(name = "hotelId")
    private Hotel hotel;

    // FK → User
    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;
}
