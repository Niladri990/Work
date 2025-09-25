package com.example.demo.controller;

import com.example.demo.dto.BookingRequest;
import com.example.demo.model.ActivityLog;
import com.example.demo.model.Booking;
import com.example.demo.model.User;
import com.example.demo.repo.ActivityLogRepository;
import com.example.demo.repo.BookingRepository;
import com.example.demo.repo.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {
    
    @Autowired
    private BookingRepository bookingRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired(required = false)
    private ActivityLogRepository activityLogRepository;
    
    @PostMapping
    public ResponseEntity<?> createBooking(@Valid @RequestBody BookingRequest bookingRequest, 
                                         HttpServletRequest request) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String email = authentication.getName();
            User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
            
            Booking booking = new Booking();
            booking.setUser(user);
            booking.setLocationType(bookingRequest.getLocationType());
            booking.setPickupLocation(bookingRequest.getPickupLocation());
            booking.setStartDate(bookingRequest.getStartDate());
            booking.setEndDate(bookingRequest.getEndDate());
            booking.setFrequency(Booking.Frequency.valueOf(bookingRequest.getFrequency().toUpperCase()));
            booking.setWasteTypes(bookingRequest.getWasteTypes());
            booking.setRemarks(bookingRequest.getRemarks());
            
            Booking savedBooking = bookingRepository.save(booking);
            
            // Log activity
            if (activityLogRepository != null) {
                ActivityLog activityLog = new ActivityLog(
                    user.getId(), 
                    user.getEmail(), 
                    ActivityLog.ActivityType.BOOKING_CREATED, 
                    "Conservancy service booked: " + bookingRequest.getFrequency()
                );
                activityLog.setIpAddress(getClientIpAddress(request));
                activityLog.setUserAgent(request.getHeader("User-Agent"));
                activityLogRepository.save(activityLog);
            }
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Conservancy service booked successfully");
            response.put("bookingId", savedBooking.getId());
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to create booking");
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    @GetMapping
    public ResponseEntity<?> getUserBookings(HttpServletRequest request) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String email = authentication.getName();
            User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
            
            List<Booking> bookings = bookingRepository.findByUserOrderByCreatedAtDesc(user);
            
            return ResponseEntity.ok(bookings);
            
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to fetch bookings");
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getBooking(@PathVariable Long id) {
        try {
            Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
            
            return ResponseEntity.ok(booking);
            
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to fetch booking");
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateBookingStatus(@PathVariable Long id, 
                                               @RequestParam String status,
                                               HttpServletRequest request) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String email = authentication.getName();
            User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
            
            Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
            
            booking.setStatus(Booking.Status.valueOf(status.toUpperCase()));
            bookingRepository.save(booking);
            
            // Log activity
            if (activityLogRepository != null) {
                ActivityLog activityLog = new ActivityLog(
                    user.getId(), 
                    user.getEmail(), 
                    ActivityLog.ActivityType.BOOKING_CREATED, 
                    "Booking status updated to: " + status
                );
                activityLog.setIpAddress(getClientIpAddress(request));
                activityLog.setUserAgent(request.getHeader("User-Agent"));
                activityLogRepository.save(activityLog);
            }
            
            Map<String, String> response = new HashMap<>();
            response.put("message", "Booking status updated successfully");
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to update booking status");
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    private String getClientIpAddress(HttpServletRequest request) {
        String xForwardedForHeader = request.getHeader("X-Forwarded-For");
        if (xForwardedForHeader == null) {
            return request.getRemoteAddr();
        } else {
            return xForwardedForHeader.split(",")[0];
        }
    }
}
