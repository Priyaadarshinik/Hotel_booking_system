package com.example.hotel_booking.service;

import com.example.hotel_booking.handler.BadRequestException;
import com.example.hotel_booking.handler.ResourceNotFoundException;
import com.example.hotel_booking.model.Hotel;
import com.example.hotel_booking.model.Room;
import com.example.hotel_booking.repository.HotelRepository;
import com.example.hotel_booking.repository.RoomRepository;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class RoomService {

    private static  RoomRepository roomRepo;
    private static  HotelRepository hotelRepository;

    public RoomService(RoomRepository roomRepo, HotelRepository hotelRepository) {
        RoomService.roomRepo = roomRepo;
        RoomService.hotelRepository = hotelRepository;
    }

    public Room save(Room room) {

        if (room.getHotel() == null || room.getHotel().getHotelId() == null) {
            throw new BadRequestException("Hotel is required to create a room");
        }

        Hotel hotel = hotelRepository.findById(room.getHotel().getHotelId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Hotel not found with id " + room.getHotel().getHotelId())
                );

        room.setHotel(hotel);

        return roomRepo.save(room);
    }

    public List<Room> getAll() {
        return roomRepo.findAll();
    }

    public static Room getRoom(Long id) {
        return roomRepo.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Room not found with id " + id));
    }

    public static boolean checkRoomAvailabilityStatus(Long newRoom, int quantity){
        Room room = getRoom(newRoom);
        return room.getQuantity() >= quantity;
    }

    public static Room updateRoom(Long id, Room updatedRoom) {

        Room existing = getRoom(id);

        existing.setRoomType(updatedRoom.getRoomType());
        existing.setQuantity(updatedRoom.getQuantity());
        existing.setMaxGuest(updatedRoom.getMaxGuest());
        existing.setPrice(updatedRoom.getPrice());

        if (updatedRoom.getHotel() != null && updatedRoom.getHotel().getHotelId() != null) {

            Hotel hotel = hotelRepository.findById(updatedRoom.getHotel().getHotelId())
                    .orElseThrow(() ->
                            new ResourceNotFoundException("Hotel not found with id " + updatedRoom.getHotel().getHotelId())
                    );

            existing.setHotel(hotel);
        }

        return roomRepo.save(existing);
    }

    public Room updatePartial(Long id, Room updatedRoom) {

        Room existing = getRoom(id);


        if (updatedRoom.getRoomType() != null) {
            existing.setRoomType(updatedRoom.getRoomType());
        }

        if (updatedRoom.getQuantity() != null) {
            existing.setQuantity(updatedRoom.getQuantity());
        }

        if (updatedRoom.getMaxGuest() != null) {
            existing.setMaxGuest(updatedRoom.getMaxGuest());
        }

        if (updatedRoom.getPrice() != null) {
            existing.setPrice(updatedRoom.getPrice());
        }

        if (updatedRoom.getHotel() != null && updatedRoom.getHotel().getHotelId() != null) {

            Hotel hotel = hotelRepository.findById(updatedRoom.getHotel().getHotelId())
                    .orElseThrow(() ->
                            new ResourceNotFoundException("Hotel not found with id " + updatedRoom.getHotel().getHotelId())
                    );

            existing.setHotel(hotel);
        }

        return roomRepo.save(existing);
    }

    public void deleteRoom(Long id) {
        Room room = getRoom(id);
        roomRepo.delete(room);
    }
}