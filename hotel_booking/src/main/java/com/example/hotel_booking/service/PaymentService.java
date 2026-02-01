package com.example.hotel_booking.service;

import com.example.hotel_booking.handler.ResourceNotFoundException;
import com.example.hotel_booking.model.Payment;
import com.example.hotel_booking.repository.PaymentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService {
    private final PaymentRepository paymentRepo;
    public PaymentService(PaymentRepository paymentRepo){
        this.paymentRepo =paymentRepo;
    }
    public Payment save(Payment payment) {
        return paymentRepo.save(payment);
    }
    public List<Payment> getAll() {
        return paymentRepo.findAll();
    }
    public Payment getPayment(Long id) {
        return paymentRepo.findById(id).orElseThrow(()-> new ResourceNotFoundException("Payment not found with id "+id));
    }
}
