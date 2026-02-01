package com.example.hotel_booking.service;

import com.example.hotel_booking.handler.ResourceNotFoundException;
import com.example.hotel_booking.model.Cancellation;
import com.example.hotel_booking.repository.CancellationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class CancellationService {
    private final CancellationRepository cancellationRepo;
    public CancellationService(CancellationRepository cancellationRepo){
        this.cancellationRepo = cancellationRepo;
    }
    public Cancellation save(Cancellation cancellation) {
        return cancellationRepo.save(cancellation);
    }
    public List<Cancellation> getAll() {
        return cancellationRepo.findAll();
    }
    public Cancellation getCancellation(Long id) {
        return cancellationRepo.findById(id).orElseThrow(()-> new ResourceNotFoundException("Cancellation not found with id "+id));
    }
    public void deleteCancellation(Long id) {
        cancellationRepo.deleteById(id);
    }
}
