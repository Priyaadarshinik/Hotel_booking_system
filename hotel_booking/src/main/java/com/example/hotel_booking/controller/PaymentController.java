package com.example.hotel_booking.controller;

import com.example.hotel_booking.model.Payment;
import com.example.hotel_booking.service.PaymentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/payment")
public class PaymentController {
    private final PaymentService paymentService;
    public PaymentController(PaymentService paymentService){
        this.paymentService = paymentService;
    }
    @PostMapping("/add")
    public Payment addPayment(@RequestBody Payment payment) {
        return paymentService.save(payment);
    }
    @GetMapping("get")
    public List<Payment> getPayment() {
        return paymentService.getAll();
    }


}
