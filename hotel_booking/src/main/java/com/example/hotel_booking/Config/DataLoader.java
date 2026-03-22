package com.example.hotel_booking.Config;

import com.example.hotel_booking.Security.Role;
import com.example.hotel_booking.model.Hotel;
import com.example.hotel_booking.model.User;
import com.example.hotel_booking.repository.HotelRepository;
import com.example.hotel_booking.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Component
public class DataLoader {

    private final UserRepository userRepo;
    private final HotelRepository hotelRepo;
    private final PasswordEncoder encoder;

    @Autowired
    public DataLoader(UserRepository userRepo,
                      HotelRepository hotelRepo,
                      PasswordEncoder encoder) {

        this.userRepo = userRepo;
        this.hotelRepo = hotelRepo;
        this.encoder = encoder;
    }

    @PostConstruct
    public void loadData() {

        User admin;

        if (userRepo.findByEmail("admin@example.com").isEmpty()) {

            admin = new User();
            admin.setUsername("admin");
            admin.setEmail("admin@example.com");
            admin.setPassword(encoder.encode("admin123"));
            admin.setRole(Role.ADMIN);

            admin = userRepo.save(admin);

        } else {
            admin = userRepo.findByEmail("admin@example.com").get();
        }
    }
    @PostConstruct
    public void loadHotels() {

        User admin = userRepo.findByEmail("admin@example.com")
                .orElseThrow();

        if (hotelRepo.count() > 0) return;

        List<String> cities = List.of(
                "Chennai","Bangalore","Hyderabad","Mumbai","Delhi",
                "Kolkata","Pune","Jaipur","Ahmedabad","Goa",
                "Kochi","Coimbatore","Madurai","Ooty","Mysore",
                "Vizag","Trivandrum","Nagpur","Indore","Surat"
        );

        List<String> prefixes = List.of(
                "Grand","Royal","Sea","Lake","Hill","City","Palm",
                "Golden","Silver","Emerald","Sunrise","Sunset"
        );

        List<String> suffixes = List.of(
                "Palace","Inn","Residency","Suites","Heights",
                "Resort","Stay","Villa","Lodge","Retreat"
        );

        List<Hotel> hotels = new ArrayList<>();

        Random random = new Random();

        for(int i = 0; i < 150; i++){

            String city = cities.get(random.nextInt(cities.size()));

            String name = prefixes.get(random.nextInt(prefixes.size()))
                    + " "
                    + suffixes.get(random.nextInt(suffixes.size()));

            Hotel h = new Hotel();
            h.setName(name + " " + (i+1));
            h.setDescription("Comfortable stay in " + city);
            h.setAddress("Street " + (random.nextInt(200)+1));
            h.setCity(city);
            h.setHotelRating(0.0);
            h.setUser(admin);

            hotels.add(h);
        }

        hotelRepo.saveAll(hotels);
    }
}