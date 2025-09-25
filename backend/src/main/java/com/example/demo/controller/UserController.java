package com.example.demo.controller;

import com.example.demo.dto.AuthResponse;
import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.RegisterRequest;
import com.example.demo.model.ActivityLog;
import com.example.demo.model.User;
import com.example.demo.repo.ActivityLogRepository;
import com.example.demo.repo.UserRepository;
import com.example.demo.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class UserController {
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired(required = false)
    private ActivityLogRepository activityLogRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest, HttpServletRequest request) {
        try {
            // Find user by email and userType
            User user = userRepository.findByEmailAndUserType(loginRequest.getEmail(), 
                User.UserType.valueOf(loginRequest.getUserType().toUpperCase()))
                .orElseThrow(() -> new RuntimeException("Invalid email, password, or user type"));
            
            // Authenticate user
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );
            
            SecurityContextHolder.getContext().setAuthentication(authentication);
            
            // Generate JWT token
            String token = jwtUtil.generateToken(user);
            
            // Log activity
            if (activityLogRepository != null) {
                ActivityLog activityLog = new ActivityLog(
                    user.getId(), 
                    user.getEmail(), 
                    ActivityLog.ActivityType.LOGIN, 
                    "User logged in successfully"
                );
                activityLog.setIpAddress(getClientIpAddress(request));
                activityLog.setUserAgent(request.getHeader("User-Agent"));
                activityLogRepository.save(activityLog);
            }
            
            return ResponseEntity.ok(new AuthResponse(token, user));
            
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Authentication failed");
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest registerRequest, HttpServletRequest request) {
        try {
            // Check if user already exists
            if (userRepository.existsByEmail(registerRequest.getEmail())) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "User already exists");
                error.put("message", "User with this email already exists");
                return ResponseEntity.badRequest().body(error);
            }
            
            // Validate password confirmation
            if (!registerRequest.getPassword().equals(registerRequest.getConfirmPassword())) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Password mismatch");
                error.put("message", "Passwords do not match");
                return ResponseEntity.badRequest().body(error);
            }
            
            // Create new user
            User user = new User();
            user.setEmail(registerRequest.getEmail());
            user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
            user.setUserType(User.UserType.valueOf(registerRequest.getUserType().toUpperCase()));
            
            // Set additional fields based on user type
            switch (user.getUserType()) {
                case GREEN_CENTER:
                case NGO:
                    user.setRegNumber(registerRequest.getRegNumber());
                    user.setOwnerName(registerRequest.getOwnerName());
                    break;
                case CONSERVANCY:
                    user.setConservancyRegNumber(registerRequest.getConservancyRegNumber());
                    user.setConservancyOwnerName(registerRequest.getConservancyOwnerName());
                    break;
                case RIDER:
                    user.setRiderType(registerRequest.getRiderType());
                    break;
            }
            
            User savedUser = userRepository.save(user);
            
            // Log activity
            if (activityLogRepository != null) {
                ActivityLog activityLog = new ActivityLog(
                    savedUser.getId(), 
                    savedUser.getEmail(), 
                    ActivityLog.ActivityType.REGISTRATION, 
                    "User registered successfully"
                );
                activityLog.setIpAddress(getClientIpAddress(request));
                activityLog.setUserAgent(request.getHeader("User-Agent"));
                activityLogRepository.save(activityLog);
            }
            
            // Generate JWT token for auto-login
            String token = jwtUtil.generateToken(savedUser);
            
            return ResponseEntity.ok(new AuthResponse(token, savedUser));
            
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Registration failed");
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        try {
            String email = SecurityContextHolder.getContext().getAuthentication().getName();
            User user = userRepository.findByEmail(email).orElse(null);
            
            if (user != null && activityLogRepository != null) {
                // Log activity
                ActivityLog activityLog = new ActivityLog(
                    user.getId(), 
                    user.getEmail(), 
                    ActivityLog.ActivityType.LOGOUT, 
                    "User logged out successfully"
                );
                activityLog.setIpAddress(getClientIpAddress(request));
                activityLog.setUserAgent(request.getHeader("User-Agent"));
                activityLogRepository.save(activityLog);
            }
            
            SecurityContextHolder.clearContext();
            
            Map<String, String> response = new HashMap<>();
            response.put("message", "Logged out successfully");
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Logout failed");
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
