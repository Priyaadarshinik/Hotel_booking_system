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

    private final RoomRepository roomRepo;
    private final HotelRepository hotelRepository;

    public RoomService(RoomRepository roomRepo, HotelRepository hotelRepository) {
        this.roomRepo = roomRepo;
        this.hotelRepository = hotelRepository;
    }

    // ✅ CREATE ROOM
    public Room save(Room room) {

        // 🔥 Validate hotel presence
        if (room.getHotel() == null || room.getHotel().getHotelId() == null) {
            throw new BadRequestException("Hotel is required to create a room");
        }

        // 🔥 Fetch actual hotel from DB
        Hotel hotel = hotelRepository.findById(room.getHotel().getHotelId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Hotel not found with id " + room.getHotel().getHotelId())
                );

        // 🔥 Attach managed hotel entity
        room.setHotel(hotel);

        return roomRepo.save(room);
    }

    // ✅ GET ALL ROOMS
    public List<Room> getAll() {
        return roomRepo.findAll();
    }

    // ✅ GET SINGLE ROOM
    public Room getRoom(Long id) {
        return roomRepo.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Room not found with id " + id));
    }

    // ✅ UPDATE FULL
    public Room updateRoom(Long id, Room updatedRoom) {

        Room existing = getRoom(id);

        existing.setRoomNumber(updatedRoom.getRoomNumber());
        existing.setRoomType(updatedRoom.getRoomType());
        existing.setAvailabilityStatus(updatedRoom.getAvailabilityStatus());
        existing.setMaxGuest(updatedRoom.getMaxGuest());
        existing.setPrice(updatedRoom.getPrice());

        // 🔥 Optional: prevent hotel reassignment (recommended)
        if (updatedRoom.getHotel() != null && updatedRoom.getHotel().getHotelId() != null) {

            Hotel hotel = hotelRepository.findById(updatedRoom.getHotel().getHotelId())
                    .orElseThrow(() ->
                            new ResourceNotFoundException("Hotel not found with id " + updatedRoom.getHotel().getHotelId())
                    );

            existing.setHotel(hotel);
        }

        return roomRepo.save(existing);
    }

    // ✅ UPDATE PARTIAL
    public Room updatePartial(Long id, Room updatedRoom) {

        Room existing = getRoom(id);

        if (updatedRoom.getRoomNumber() != null) {
            existing.setRoomNumber(updatedRoom.getRoomNumber());
        }

        if (updatedRoom.getRoomType() != null) {
            existing.setRoomType(updatedRoom.getRoomType());
        }

        if (updatedRoom.getAvailabilityStatus() != null) {
            existing.setAvailabilityStatus(updatedRoom.getAvailabilityStatus());
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

    // ✅ DELETE ROOM
    public void deleteRoom(Long id) {
        Room room = getRoom(id);
        roomRepo.delete(room);
    }
}