package com.example.hotel_booking.model;

import com.example.hotel_booking.security.Role;
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
public class User {
    @Id
    @GeneratedValue
    private Long userId;
    private String username;
    private String email;
    private String password;
    private String phone_no;
    @Enumerated(EnumType.STRING)
    private Role role;

}

