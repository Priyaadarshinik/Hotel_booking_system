package com.example.hotel_booking.service;

import com.example.hotel_booking.handler.BadRequestException;
import com.example.hotel_booking.handler.ResourceNotFoundException;
import com.example.hotel_booking.model.Booking;
import com.example.hotel_booking.repository.BookingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {
    private final BookingRepository bookingRepo;
    public BookingService(BookingRepository bookingRepo) {
        this.bookingRepo = bookingRepo;
    }
    public Booking createBooking(Booking booking) {
        return bookingRepo.save(booking);
    }
    public List<Booking> getBookings() {
        return bookingRepo.findAll();
    }
    public Booking getOne(Long id) {
        return bookingRepo.findById(id).orElseThrow(()-> new ResourceNotFoundException("Booking not found with id "+id));
    }
    public void deleteBooking(Long id) {
        bookingRepo.deleteById(id);
    }
}
