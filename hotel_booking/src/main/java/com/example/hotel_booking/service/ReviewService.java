package com.example.hotel_booking.service;

import com.example.hotel_booking.handler.ResourceNotFoundException;
import com.example.hotel_booking.model.Hotel;
import com.example.hotel_booking.model.Review;
import com.example.hotel_booking.repository.HotelRepository;
import com.example.hotel_booking.repository.ReviewRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepo;
    private final HotelRepository hotelRepo;


    public ReviewService(ReviewRepository reviewRepo,HotelRepository hotelRepo){
        this.reviewRepo = reviewRepo;
        this.hotelRepo= hotelRepo;
    }


    public Review save(Review review) {
        Review saved = reviewRepo.save(review);

        Long hotelId = review.getHotel().getHotelId();

        updateHotelRating(hotelId);

        return saved;
    }
    public void updateHotelRating(Long hotelId){

        List<Review> reviews = reviewRepo.findAll();
        List<Review> reviewOfHotel = new ArrayList<>();
        for(Review review : reviews){
            if (Objects.equals(review.getHotel().getHotelId(), hotelId)) reviewOfHotel.add(review);
        }
        System.out.println("review size : " + reviewOfHotel.size());
        double avg = reviewOfHotel.stream()
                .mapToInt(Review::getRatings)
                .average()
                .orElse(0);

        Hotel hotel = hotelRepo.findById(hotelId)
                .orElseThrow();

        hotel.setHotelRating(avg);

        hotelRepo.save(hotel);
    }
    public List<Review> getAll() {
        return reviewRepo.findAll();
    }


    public Review getReview(Long id) {
        return reviewRepo.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Review not found with id " + id));
    }

    public Review updateReview(Long id, Review updatedReview) {

        Review existing = getReview(id);

        existing.setReview(updatedReview.getReview());
        existing.setRatings(updatedReview.getRatings());
        existing.setReviewDate(updatedReview.getReviewDate());
        existing.setHotel(updatedReview.getHotel());
        existing.setUser(updatedReview.getUser());

        return reviewRepo.save(existing);
    }


    public Review updatePartial(Long id, Review updatedReview) {

        Review existing = getReview(id);

        if (updatedReview.getReview() != null) {
            existing.setReview(updatedReview.getReview());
        }

        if (updatedReview.getRatings() != null) {
            existing.setRatings(updatedReview.getRatings());
        }

        if (updatedReview.getReviewDate() != null) {
            existing.setReviewDate(updatedReview.getReviewDate());
        }

        if (updatedReview.getHotel() != null) {
            existing.setHotel(updatedReview.getHotel());
        }

        if (updatedReview.getUser() != null) {
            existing.setUser(updatedReview.getUser());
        }
        updateHotelRating(existing.getHotel().getHotelId());
        return reviewRepo.save(existing);
    }

    public void deleteReview(Long id) {

        Review review = getReview(id);
        reviewRepo.delete(review);
        updateHotelRating(review.getHotel().getHotelId());
    }
}
