package com.example.demo.controller;

import com.example.demo.dto.ComplaintRequest;
import com.example.demo.model.ActivityLog;
import com.example.demo.model.Complaint;
import com.example.demo.model.User;
import com.example.demo.repo.ActivityLogRepository;
import com.example.demo.repo.ComplaintRepository;
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
@RequestMapping("/api/complaints")
@CrossOrigin(origins = "*")
public class ComplaintController {
    
    @Autowired
    private ComplaintRepository complaintRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired(required = false)
    private ActivityLogRepository activityLogRepository;
    
    @PostMapping
    public ResponseEntity<?> createComplaint(@Valid @RequestBody ComplaintRequest complaintRequest, 
                                           HttpServletRequest request) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String email = authentication.getName();
            User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
            
            Complaint complaint = new Complaint();
            complaint.setUser(user);
            complaint.setWasteType(complaintRequest.getWasteType());
            complaint.setMaterials(complaintRequest.getMaterials());
            complaint.setLocationType(complaintRequest.getLocationType());
            complaint.setDescription(complaintRequest.getDescription());
            complaint.setLocation(complaintRequest.getLocation());
            complaint.setPhotoNames(complaintRequest.getPhotoNames());
            
            Complaint savedComplaint = complaintRepository.save(complaint);
            
            // Log activity
            if (activityLogRepository != null) {
                ActivityLog activityLog = new ActivityLog(
                    user.getId(), 
                    user.getEmail(), 
                    ActivityLog.ActivityType.COMPLAINT_SUBMITTED, 
                    "Complaint submitted: " + complaintRequest.getWasteType()
                );
                activityLog.setIpAddress(getClientIpAddress(request));
                activityLog.setUserAgent(request.getHeader("User-Agent"));
                activityLogRepository.save(activityLog);
            }
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Complaint submitted successfully");
            response.put("complaintId", savedComplaint.getId());
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to submit complaint");
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    @GetMapping
    public ResponseEntity<?> getUserComplaints(HttpServletRequest request) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String email = authentication.getName();
            User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
            
            List<Complaint> complaints = complaintRepository.findByUserOrderByCreatedAtDesc(user);
            
            return ResponseEntity.ok(complaints);
            
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to fetch complaints");
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getComplaint(@PathVariable Long id) {
        try {
            Complaint complaint = complaintRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));
            
            return ResponseEntity.ok(complaint);
            
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to fetch complaint");
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateComplaintStatus(@PathVariable Long id, 
                                                 @RequestParam String status,
                                                 HttpServletRequest request) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String email = authentication.getName();
            User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
            
            Complaint complaint = complaintRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));
            
            complaint.setStatus(Complaint.Status.valueOf(status.toUpperCase()));
            complaintRepository.save(complaint);
            
            // Log activity
            if (activityLogRepository != null) {
                ActivityLog activityLog = new ActivityLog(
                    user.getId(), 
                    user.getEmail(), 
                    ActivityLog.ActivityType.COMPLAINT_SUBMITTED, 
                    "Complaint status updated to: " + status
                );
                activityLog.setIpAddress(getClientIpAddress(request));
                activityLog.setUserAgent(request.getHeader("User-Agent"));
                activityLogRepository.save(activityLog);
            }
            
            Map<String, String> response = new HashMap<>();
            response.put("message", "Complaint status updated successfully");
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to update complaint status");
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
