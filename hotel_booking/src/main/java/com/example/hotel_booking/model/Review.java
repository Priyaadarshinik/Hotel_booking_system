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
    private int ratings;
    private LocalDate reviewDate;

    // FK → Hotel
    @ManyToOne
    @JoinColumn(name = "hotel_id")
    private Hotel hotel;

    // FK → User
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
