package com.example.hotel_booking.service;

import com.example.hotel_booking.handler.ResourceNotFoundException;
import com.example.hotel_booking.model.Review;
import com.example.hotel_booking.repository.ReviewRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepo;

    public ReviewService(ReviewRepository reviewRepo){
        this.reviewRepo = reviewRepo;
    }


    public Review save(Review review) {
        return reviewRepo.save(review);
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

        return reviewRepo.save(existing);
    }

    public void deleteReview(Long id) {

        Review review = getReview(id);  // throws 404 if not found
        reviewRepo.delete(review);
    }
}
