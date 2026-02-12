package com.example.hotel_booking.repository;

import com.example.hotel_booking.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room,Long> {
}
