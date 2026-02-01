package com.example.hotel_booking.service;

import com.example.hotel_booking.handler.ResourceNotFoundException;
import com.example.hotel_booking.model.User;
import com.example.hotel_booking.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepo;
    public UserService (UserRepository userRepo){
        this.userRepo = userRepo;
    }
    public User saveUser(User user) {
        return userRepo.save(user);
    }
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }
    public User getUser(Long id) {
        return userRepo.findById(id).orElseThrow(()-> new ResourceNotFoundException("User not found with id "+id));
    }
    public void deleteUser(Long id) {
        userRepo.deleteById(id);
    }
}
