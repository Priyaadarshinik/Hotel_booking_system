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
        return reviewRepo.findById(id).orElseThrow(()-> new ResourceNotFoundException("Review not found with id "+id));
    }
    public void deleteReview(Long id) {
        reviewRepo.deleteById(id);
    }
}
