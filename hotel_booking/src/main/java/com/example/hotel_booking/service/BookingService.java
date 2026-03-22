package com.example.hotel_booking.service;


import com.example.hotel_booking.handler.BadRequestException;
import com.example.hotel_booking.handler.ResourceNotFoundException;
import com.example.hotel_booking.model.Booking;
import com.example.hotel_booking.model.Room;
import com.example.hotel_booking.repository.BookingRepository;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepo;

    public BookingService(BookingRepository bookingRepo) {
        this.bookingRepo = bookingRepo;
    }

    public Booking createBooking(Booking newBooking) {

        validateDates(newBooking.getCheckIn(), newBooking.getCheckOut());
        if (RoomService.checkRoomAvailabilityStatus(newBooking.getRoom().getRoomId(), newBooking.getRoom().getQuantity()) ){
            Room room = RoomService.getRoom(newBooking.getRoom().getRoomId());
            Room updateQuantity = new Room(null, null,null,null, room.getQuantity() - newBooking.getRoom().getQuantity(),null);
            RoomService.updateRoom(room.getRoomId() , updateQuantity);
        }
        else  throw new ResourceNotFoundException("Room is not available");
        newBooking.setBookingStatus(Booking.BookingStatus.PENDING);

        return bookingRepo.save(newBooking);
    }
    public List<Booking> getBookings() {
        return bookingRepo.findAll();
    }

    public Booking getOne(Long id) {
        return bookingRepo.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Booking not found with id " + id));
    }
    public Booking updatePartial(Long id, Booking updatedBooking) {

        Booking existing = getOne(id);


        if (updatedBooking.getBookingStatus() != null) {
            existing.setBookingStatus(updatedBooking.getBookingStatus());
        }

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
