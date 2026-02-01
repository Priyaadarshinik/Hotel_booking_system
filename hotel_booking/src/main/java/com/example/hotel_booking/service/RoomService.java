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
        return roomRepo.findById(id).orElseThrow(()-> new ResourceNotFoundException("Room not found with id "+id));
    }
    public void deleteRoom(Long id) {
        roomRepo.deleteById(id);
    }
}
