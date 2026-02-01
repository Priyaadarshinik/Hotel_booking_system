package com.example.hotel_booking.controller;

import com.example.hotel_booking.model.Review;
import com.example.hotel_booking.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/review")
public class ReviewController {
    private final ReviewService reviewService;
    public ReviewController(ReviewService reviewService){
        this.reviewService= reviewService;
    }
    @PostMapping("/add")
    public Review addReview(@RequestBody Review review) {
        return reviewService.save(review);
    }
    @GetMapping("/get")
    public List<Review> getReview() {
        return reviewService.getAll();
    }
}
