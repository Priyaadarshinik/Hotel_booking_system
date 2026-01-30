package com.example.hotel_booking.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
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
public class Hotel {
    @Id
    private Long hotelId;
    private String name;
    private String description;
    private String address;
    private String city;
    private String country;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User host;
}
