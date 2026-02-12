package com.example.hotel_booking.service;

import com.example.hotel_booking.handler.ResourceNotFoundException;
import com.example.hotel_booking.model.Hotel;
import com.example.hotel_booking.repository.HotelRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HotelService {

    private final HotelRepository hotelRepo;

    public HotelService(HotelRepository hotelRepo){
        this.hotelRepo = hotelRepo;
    }

    public Hotel saveHotel(Hotel hotel){
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
        existing.setCountry(updatedHotel.getCountry());
        existing.setUser(updatedHotel.getUser());

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

        if(updatedHotel.getCountry() != null){
            existing.setCountry(updatedHotel.getCountry());
        }

        if(updatedHotel.getUser() != null){
            existing.setUser(updatedHotel.getUser());
        }

        return hotelRepo.save(existing);
    }

    public void deleteHotel(Long id){
        Hotel hotel = getHotel(id);
        hotelRepo.delete(hotel);
    }
}
