package com.example.hotel_booking.service;

import com.example.hotel_booking.handler.ResourceNotFoundException;
import com.example.hotel_booking.model.Hotel;
import com.example.hotel_booking.repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class HotelService {

    private final HotelRepository hotelRepo;
    public HotelService (HotelRepository hotelRepo){
        this.hotelRepo = hotelRepo;
    }
    public Hotel saveHotel(Hotel hotel){
        return hotelRepo.save(hotel);
    }
    public List<Hotel> getHotels(){
        return hotelRepo.findAll();
    }
    public Hotel getHotel(Long id) {
        return hotelRepo.findById(id).orElseThrow(()-> new ResourceNotFoundException("User not found with id "+id));
    }
}
