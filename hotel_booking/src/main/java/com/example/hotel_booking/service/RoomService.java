package com.example.hotel_booking.service;

import com.example.hotel_booking.handler.ResourceNotFoundException;
import com.example.hotel_booking.model.Room;
import com.example.hotel_booking.repository.RoomRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {

    private final RoomRepository roomRepo;

    public RoomService(RoomRepository roomRepo) {
        this.roomRepo = roomRepo;
    }

    public Room save(Room room) {
        return roomRepo.save(room);
    }


    public List<Room> getAll() {
        return roomRepo.findAll();
    }

    public Room getRoom(Long id) {
        return roomRepo.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Room not found with id " + id));
    }


    public Room updateRoom(Long id, Room updatedRoom) {

        Room existing = getRoom(id);

        existing.setRoomNumber(updatedRoom.getRoomNumber());
        existing.setRoomType(updatedRoom.getRoomType());
        existing.setAvailabilityStatus(updatedRoom.getAvailabilityStatus());
        existing.setMaxGuest(updatedRoom.getMaxGuest());
        existing.setPrice(updatedRoom.getPrice());
        existing.setHotel(updatedRoom.getHotel());

        return roomRepo.save(existing);
    }

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

        if (updatedRoom.getHotel() != null) {
            existing.setHotel(updatedRoom.getHotel());
        }

        if (updatedRoom.getPrice() != null) {
            existing.setPrice(updatedRoom.getPrice());
        }

        return roomRepo.save(existing);
    }


    public void deleteRoom(Long id) {

        Room room = getRoom(id);
        roomRepo.delete(room);
    }
}
