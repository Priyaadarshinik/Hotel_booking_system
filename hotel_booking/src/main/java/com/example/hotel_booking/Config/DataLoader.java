package com.example.hotel_booking.Config;

import com.example.hotel_booking.model.User;
import com.example.hotel_booking.repository.UserRepository;
import com.example.hotel_booking.Security.Role;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataLoader {

    private final UserRepository repo;
    private final PasswordEncoder encoder;

    @Autowired
    public DataLoader(UserRepository repo, PasswordEncoder encoder) {
        this.repo = repo;
        this.encoder = encoder;
    }

    @PostConstruct
    public void loadUsers() {
        if (repo.findByEmail("admin@example.com").isEmpty()) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setEmail("admin@example.com");
            admin.setPassword(encoder.encode("admin123"));
            admin.setRole(Role.ADMIN);
            repo.save(admin);
        }

        if (repo.findByEmail("user@example.com").isEmpty()) {
            User user = new User();
            user.setUsername("user");
            user.setEmail("user@example.com");
            user.setPassword(encoder.encode("user123"));
            user.setRole(Role.USER);
            repo.save(user);
        }
    }
}
