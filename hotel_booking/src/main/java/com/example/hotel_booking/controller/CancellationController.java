package com.example.hotel_booking.controller;

import com.example.hotel_booking.model.Cancellation;
import com.example.hotel_booking.service.CancellationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cancellation")
public class CancellationController {

    private final CancellationService cancellationService;
    public CancellationController(CancellationService cancellationService){
        this.cancellationService = cancellationService;
    }
    @PostMapping("/add")
    public Cancellation createCancellation(@RequestBody Cancellation cancellation) {
        return cancellationService.save(cancellation);
    }
    @GetMapping("/get")
    public List<Cancellation> getAllCancellations() {
        return cancellationService.getAll();
    }
    @GetMapping("/{id}")
    public Cancellation getCancellationById(@PathVariable Long id) {
        return cancellationService.getCancellation(id);
    }
    @DeleteMapping("/{id}")
    public void deleteCancellation(@PathVariable Long id) {
        cancellationService.deleteCancellation(id);
    }
}