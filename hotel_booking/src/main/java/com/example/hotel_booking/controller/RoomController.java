package com.example.hotel_booking.controller;

import com.example.hotel_booking.model.Room;
import com.example.hotel_booking.service.RoomService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/rooms")
public class RoomController {

    private final RoomService roomService;

    public RoomController(RoomService roomService){
        this.roomService = roomService;
    }

    @PostMapping
    public ResponseEntity<Room> createRoom(@RequestBody Room room) {
        return ResponseEntity.ok(roomService.save(room));
    }

    @GetMapping
    public ResponseEntity<List<Room>> getAllRooms() {
        return ResponseEntity.ok(roomService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<Room>> getRoom(@PathVariable Long id) {
        List<Room> allRooms = roomService.getAll();
        List<Room> exactRooms = new ArrayList<>();
        for(Room room:allRooms){
            if (Objects.equals(room.getHotel().getHotelId(), id)){
                exactRooms.add(room);
            }
        }
        return ResponseEntity.ok(exactRooms);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Room> updateRoom(
            @PathVariable Long id,
            @RequestBody Room room) {

        return ResponseEntity.ok(roomService.updateRoom(id, room));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Room> patchRoom(
            @PathVariable Long id,
            @RequestBody Room room) {

        return ResponseEntity.ok(roomService.updatePartial(id, room));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoom(@PathVariable Long id) {
        roomService.deleteRoom(id);
        return ResponseEntity.noContent().build();
    }
}
