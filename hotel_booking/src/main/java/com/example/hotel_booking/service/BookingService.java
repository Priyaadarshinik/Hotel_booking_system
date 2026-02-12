package com.example.hotel_booking.service;

import com.example.hotel_booking.handler.BadRequestException;
import com.example.hotel_booking.handler.ResourceNotFoundException;
import com.example.hotel_booking.model.Booking;
import com.example.hotel_booking.repository.BookingRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepo;

    public BookingService(BookingRepository bookingRepo) {
        this.bookingRepo = bookingRepo;
    }

    public Booking createBooking(Booking booking) {

        validateDates(booking.getCheckIn(), booking.getCheckOut());

        booking.setBookingStatus(Booking.BookingStatus.PENDING);

        return bookingRepo.save(booking);
    }

    public List<Booking> getBookings() {
        return bookingRepo.findAll();
    }

    public Booking getOne(Long id) {
        return bookingRepo.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Booking not found with id " + id));
    }

    public Booking updateBooking(Long id, Booking updatedBooking) {

        Booking existing = getOne(id);

        validateDates(updatedBooking.getCheckIn(), updatedBooking.getCheckOut());

        existing.setCheckIn(updatedBooking.getCheckIn());
        existing.setCheckOut(updatedBooking.getCheckOut());
        existing.setBookingStatus(updatedBooking.getBookingStatus());
        existing.setUser(updatedBooking.getUser());
        existing.setHotel(updatedBooking.getHotel());
        existing.setRoom(updatedBooking.getRoom());
        existing.setPayment(updatedBooking.getPayment());

        return bookingRepo.save(existing);
    }

    public Booking updatePartial(Long id, Booking updatedBooking) {

        Booking existing = getOne(id);

        if (updatedBooking.getCheckIn() != null) {
            existing.setCheckIn(updatedBooking.getCheckIn());
        }

        if (updatedBooking.getCheckOut() != null) {
            existing.setCheckOut(updatedBooking.getCheckOut());
        }

        if (updatedBooking.getBookingStatus() != null) {
            existing.setBookingStatus(updatedBooking.getBookingStatus());
        }

        if (updatedBooking.getUser() != null) {
            existing.setUser(updatedBooking.getUser());
        }

        if (updatedBooking.getHotel() != null) {
            existing.setHotel(updatedBooking.getHotel());
        }

        if (updatedBooking.getRoom() != null) {
            existing.setRoom(updatedBooking.getRoom());
        }

        if (updatedBooking.getPayment() != null) {
            existing.setPayment(updatedBooking.getPayment());
        }

        validateDates(existing.getCheckIn(), existing.getCheckOut());

        return bookingRepo.save(existing);
    }

    public void deleteBooking(Long id) {
        Booking booking = getOne(id);
        bookingRepo.delete(booking);
    }

    private void validateDates(LocalDate checkIn, LocalDate checkOut) {

        if (checkIn == null || checkOut == null) {
            throw new BadRequestException("Check-in and Check-out dates must not be null");
        }

        if (checkIn.isAfter(checkOut)) {
            throw new BadRequestException("Check-in date cannot be after check-out date");
        }

        if (checkIn.isBefore(LocalDate.now())) {
            throw new BadRequestException("Check-in date cannot be in the past");
        }
    }
}
