package com.example.hotel_booking.controller;

import com.example.hotel_booking.model.Room;
import com.example.hotel_booking.service.RoomService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rooms")
public class RoomController {

    private final RoomService roomService;
    RoomController(RoomService roomService){
        this.roomService=roomService;
    }
    @PostMapping("/add")
    public Room addRoom(@RequestBody Room room) {
        return roomService.save(room);
    }
    @GetMapping("/get")
    public List<Room> getAllRoom() {
        return roomService.getAll();
    }
}
