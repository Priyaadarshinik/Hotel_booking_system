package com.example.hotel_booking.service;

import com.example.hotel_booking.handler.ResourceNotFoundException;
import com.example.hotel_booking.model.Payment;
import com.example.hotel_booking.repository.PaymentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepo;

    public PaymentService(PaymentRepository paymentRepo){
        this.paymentRepo = paymentRepo;
    }

    public Payment save(Payment payment) {

        // Auto set payment date if null
        if (payment.getPaymentDate() == null) {
            payment.setPaymentDate(LocalDateTime.now());
        }

        return paymentRepo.save(payment);
    }


    public List<Payment> getAll() {
        return paymentRepo.findAll();
    }


    public Payment getPayment(Long id) {
        return paymentRepo.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Payment not found with id " + id));
    }


    public Payment updatePayment(Long id, Payment updatedPayment) {

        Payment existing = getPayment(id);

        existing.setTotalPrice(updatedPayment.getTotalPrice());
        existing.setPaymentMethod(updatedPayment.getPaymentMethod());
        existing.setPaymentDate(updatedPayment.getPaymentDate());
        existing.setTransactionId(updatedPayment.getTransactionId());
        existing.setPaymentStatus(updatedPayment.getPaymentStatus());
        existing.setBooking(updatedPayment.getBooking());

        return paymentRepo.save(existing);
    }

    public Payment updatePartial(Long id, Payment updatedPayment) {

        Payment existing = getPayment(id);

        if (updatedPayment.getTotalPrice() != null) {
            existing.setTotalPrice(updatedPayment.getTotalPrice());
        }

        if (updatedPayment.getPaymentMethod() != null) {
            existing.setPaymentMethod(updatedPayment.getPaymentMethod());
        }

        if (updatedPayment.getPaymentDate() != null) {
            existing.setPaymentDate(updatedPayment.getPaymentDate());
        }

        if (updatedPayment.getTransactionId() != null) {
            existing.setTransactionId(updatedPayment.getTransactionId());
        }

        if (updatedPayment.getPaymentStatus() != null) {
            existing.setPaymentStatus(updatedPayment.getPaymentStatus());
        }

        if (updatedPayment.getBooking() != null) {
            existing.setBooking(updatedPayment.getBooking());
        }

        return paymentRepo.save(existing);
    }

    public void deletePayment(Long id) {
        Payment payment = getPayment(id);
        paymentRepo.delete(payment);
    }
}
