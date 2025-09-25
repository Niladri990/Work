package com.example.demo.controller;

import com.example.demo.dto.ScheduleRequest;
import com.example.demo.model.ActivityLog;
import com.example.demo.model.Schedule;
import com.example.demo.model.User;
import com.example.demo.repo.ActivityLogRepository;
import com.example.demo.repo.ScheduleRepository;
import com.example.demo.repo.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/schedules")
@CrossOrigin(origins = "*")
public class ScheduleController {
    
    @Autowired
    private ScheduleRepository scheduleRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired(required = false)
    private ActivityLogRepository activityLogRepository;
    
    @PostMapping
    public ResponseEntity<?> createOrUpdateSchedule(@Valid @RequestBody ScheduleRequest scheduleRequest, 
                                                  HttpServletRequest request) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String email = authentication.getName();
            User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
            
            // Check if schedule already exists for this date
            Optional<Schedule> existingSchedule = scheduleRepository.findByUserAndScheduleDate(user, scheduleRequest.getScheduleDate());
            
            Schedule schedule;
            if (existingSchedule.isPresent()) {
                schedule = existingSchedule.get();
                schedule.setWasteTypes(scheduleRequest.getWasteTypes());
            } else {
                schedule = new Schedule();
                schedule.setUser(user);
                schedule.setScheduleDate(scheduleRequest.getScheduleDate());
                schedule.setWasteTypes(scheduleRequest.getWasteTypes());
            }
            
            Schedule savedSchedule = scheduleRepository.save(schedule);
            
            // Log activity
            if (activityLogRepository != null) {
                ActivityLog activityLog = new ActivityLog(
                    user.getId(), 
                    user.getEmail(), 
                    ActivityLog.ActivityType.SCHEDULE_UPDATED, 
                    "Schedule updated for: " + scheduleRequest.getScheduleDate()
                );
                activityLog.setIpAddress(getClientIpAddress(request));
                activityLog.setUserAgent(request.getHeader("User-Agent"));
                activityLogRepository.save(activityLog);
            }
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Schedule saved successfully");
            response.put("scheduleId", savedSchedule.getId());
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to save schedule");
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    @GetMapping
    public ResponseEntity<?> getUserSchedules(HttpServletRequest request) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String email = authentication.getName();
            User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
            
            List<Schedule> schedules = scheduleRepository.findByUserOrderByScheduleDateDesc(user);
            
            return ResponseEntity.ok(schedules);
            
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to fetch schedules");
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    @GetMapping("/date/{date}")
    public ResponseEntity<?> getScheduleByDate(@PathVariable String date) {
        try {
            LocalDate scheduleDate = LocalDate.parse(date);
            List<Schedule> schedules = scheduleRepository.findByScheduleDateOrderByCreatedAtDesc(scheduleDate);
            
            return ResponseEntity.ok(schedules);
            
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to fetch schedule");
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSchedule(@PathVariable Long id, HttpServletRequest request) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String email = authentication.getName();
            User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
            
            Schedule schedule = scheduleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Schedule not found"));
            
            // Check if user owns this schedule
            if (!schedule.getUser().getId().equals(user.getId())) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Unauthorized");
                error.put("message", "You can only delete your own schedules");
                return ResponseEntity.badRequest().body(error);
            }
            
            scheduleRepository.delete(schedule);
            
            // Log activity
            if (activityLogRepository != null) {
                ActivityLog activityLog = new ActivityLog(
                    user.getId(), 
                    user.getEmail(), 
                    ActivityLog.ActivityType.SCHEDULE_UPDATED, 
                    "Schedule deleted for: " + schedule.getScheduleDate()
                );
                activityLog.setIpAddress(getClientIpAddress(request));
                activityLog.setUserAgent(request.getHeader("User-Agent"));
                activityLogRepository.save(activityLog);
            }
            
            Map<String, String> response = new HashMap<>();
            response.put("message", "Schedule deleted successfully");
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to delete schedule");
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
