package com.example.hotel_booking.service;

import com.example.hotel_booking.handler.ResourceNotFoundException;
import com.example.hotel_booking.model.User;
import com.example.hotel_booking.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepo;

    public UserService(UserRepository userRepo){
        this.userRepo = userRepo;
    }

    public User saveUser(User user) {
        return userRepo.save(user);
    }


    public List<User> getAllUsers() {
        return userRepo.findAll();
    }


    public User getUser(Long id) {
        return userRepo.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found with id " + id));
    }

    public User updateUser(Long id, User updatedUser) {

        User existing = getUser(id);

        existing.setName(updatedUser.getName());
        existing.setEmail(updatedUser.getEmail());
        existing.setPassword(updatedUser.getPassword());
        existing.setPhone_no(updatedUser.getPhone_no());
        existing.setRole(updatedUser.getRole());

        return userRepo.save(existing);
    }

    public User updatePartial(Long id, User updatedUser) {

        User existing = getUser(id);

        if (updatedUser.getName() != null) {
            existing.setName(updatedUser.getName());
        }

        if (updatedUser.getEmail() != null) {
            existing.setEmail(updatedUser.getEmail());
        }

        if (updatedUser.getPassword() != null) {
            existing.setPassword(updatedUser.getPassword());
        }

        if (updatedUser.getPhone_no() != null) {
            existing.setPhone_no(updatedUser.getPhone_no());
        }

        if (updatedUser.getRole() != null) {
            existing.setRole(updatedUser.getRole());
        }

        return userRepo.save(existing);
    }


    public void deleteUser(Long id) {

        User user = getUser(id);
        userRepo.delete(user);
    }
}
