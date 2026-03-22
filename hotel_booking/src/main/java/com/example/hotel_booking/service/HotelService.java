package com.example.hotel_booking.service;

import com.example.hotel_booking.handler.ResourceNotFoundException;
import com.example.hotel_booking.model.Hotel;
import com.example.hotel_booking.model.User;
import com.example.hotel_booking.repository.HotelRepository;
import com.example.hotel_booking.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HotelService {

    private final HotelRepository hotelRepo;
    private final UserRepository userRepository;

    public HotelService(HotelRepository hotelRepo, UserRepository userRepository){
        this.hotelRepo = hotelRepo;
        this.userRepository = userRepository;
    }

    public Hotel saveHotel(Hotel hotel){

        String username = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        System.out.println("LOGGED USER: " + username); // debug

        User user = userRepository.findByEmail(username)
                .orElseThrow(() ->  new ResourceNotFoundException("User not found"));

        hotel.setUser(user);

        return hotelRepo.save(hotel);
    }

    public List<Hotel> getHotels(){
        return hotelRepo.findAll();
    }

    public Hotel getHotel(Long id) {
        return hotelRepo.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Hotel not found with id " + id));
    }

    public Hotel updateHotel(Long id, Hotel updatedHotel){

        Hotel existing = getHotel(id);

        existing.setName(updatedHotel.getName());
        existing.setDescription(updatedHotel.getDescription());
        existing.setAddress(updatedHotel.getAddress());
        existing.setCity(updatedHotel.getCity());
        return hotelRepo.save(existing);
    }

    public Hotel updatePartial(Long id, Hotel updatedHotel){

        Hotel existing = getHotel(id);

        if(updatedHotel.getName() != null){
            existing.setName(updatedHotel.getName());
        }

        if(updatedHotel.getDescription() != null){
            existing.setDescription(updatedHotel.getDescription());
        }

        if(updatedHotel.getAddress() != null){
            existing.setAddress(updatedHotel.getAddress());
        }

        if(updatedHotel.getCity() != null){
            existing.setCity(updatedHotel.getCity());
        }

        return hotelRepo.save(existing);
    }

    public void deleteHotel(Long id){
        Hotel hotel = getHotel(id);
        hotelRepo.delete(hotel);
    }
}