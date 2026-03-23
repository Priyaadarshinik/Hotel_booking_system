package com.example.hotel_booking.Config;

import com.example.hotel_booking.security.Role;
import com.example.hotel_booking.model.Hotel;
import com.example.hotel_booking.model.Review;
import com.example.hotel_booking.model.User;
import com.example.hotel_booking.repository.HotelRepository;
import com.example.hotel_booking.repository.ReviewRepository;
import com.example.hotel_booking.repository.UserRepository;
import com.example.hotel_booking.service.ReviewService;
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
    private final ReviewRepository reviewRepo;
    private final PasswordEncoder encoder;
    private final ReviewService reviewService;

    @Autowired
    public DataLoader(UserRepository userRepo,
                      HotelRepository hotelRepo,
                      ReviewRepository reviewRepo,
                      PasswordEncoder encoder,
                      ReviewService reviewService) {

        this.userRepo = userRepo;
        this.hotelRepo = hotelRepo;
        this.reviewRepo = reviewRepo;
        this.encoder = encoder;
        this.reviewService = reviewService;
    }

    @PostConstruct
    public void init() {

        User admin = seedUsers();

        List<Hotel> hotels = seedHotels(admin);

        seedReviews(hotels);

    }

    private User seedUsers(){

        User admin = userRepo.findByEmail("admin@example.com")
                .orElseGet(() -> {

                    User a = new User();
                    a.setUsername("admin");
                    a.setEmail("admin@example.com");
                    a.setPassword(encoder.encode("admin123"));
                    a.setRole(Role.ADMIN);
                    return userRepo.save(a);
                });

        if(userRepo.count() < 5){

            List<User> users = new ArrayList<>();

            for(int i = 1; i <= 40; i++){

                User u = new User();
                u.setUsername("user" + i);
                u.setEmail("user" + i + "@mail.com");
                u.setPassword(encoder.encode("pass123"));
                u.setRole(Role.USER);

                users.add(u);
            }

            userRepo.saveAll(users);
        }

        return admin;
    }

    private List<Hotel> seedHotels(User admin){

        if(hotelRepo.count() > 0) return hotelRepo.findAll();

        List<String> cities = List.of(
                "Chennai","Bangalore","Hyderabad","Mumbai","Delhi",
                "Kolkata","Pune","Jaipur","Ahmedabad","Goa",
                "Kochi","Coimbatore","Madurai","Ooty","Mysore",
                "Vizag","Trivandrum","Nagpur","Indore","Surat"
        );

        List<Hotel> hotels = new ArrayList<>();

        Random random = new Random();

        for(int i = 0; i < 150; i++){

            Hotel h = new Hotel();
            h.setName("Hotel " + (i+1));
            h.setDescription("Comfort stay");
            h.setAddress("Street " + (random.nextInt(200)+1));
            h.setCity(cities.get(random.nextInt(cities.size())));
            h.setHotelRating(0.0);
            h.setUser(admin);

            hotels.add(h);
        }

        return hotelRepo.saveAll(hotels);
    }

    private void seedReviews(List<Hotel> hotels){
//            for(Long val =(long)1 ;val < (long)150;val++) {
//               reviewService.updateHotelRating(val);
//              }
        if(reviewRepo.count() > 0) return;

        List<User> users = userRepo.findAll();

        Random random = new Random();

        List<Review> reviews = new ArrayList<>();

        for(Hotel hotel : hotels){

            int reviewCount = 10 + random.nextInt(21);

            for(int i = 0; i < reviewCount; i++) {

                Review r = new Review();

                r.setHotel(hotel);
                r.setUser(users.get(random.nextInt(users.size())));
                r.setRatings(1 + random.nextInt(5));
                r.setReview("Nice stay at " + hotel.getName());
                reviews.add(r);
            }
            reviewService.updateHotelRating(hotel.getHotelId());
        }

        reviewRepo.saveAll(reviews);
    }
}