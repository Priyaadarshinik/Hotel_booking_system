package com.example.hotel_booking.controller;

import com.example.hotel_booking.model.Hotel;
import com.example.hotel_booking.service.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/hotels")
public class HotelController {

    private final HotelService hotelService;
    public HotelController(HotelService hotelService){
        this.hotelService = hotelService;
    }
    @PostMapping("/add")
    public Hotel addHotel(@RequestBody Hotel hotel) {
        return hotelService.saveHotel(hotel);
    }
    @GetMapping("/get")
    public List<Hotel> getHotels() {
        return hotelService.getHotels();
    }
    @GetMapping("/{id}")
    public Hotel getHotelById(@PathVariable Long id) {
        return hotelService.getHotel(id);
    }
}