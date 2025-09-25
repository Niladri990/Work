package com.example.demo.dto;

import com.example.demo.model.User;
// Removed Lombok due to Java 24 compatibility issues

public class AuthResponse {
    
    private String token;
    private String email;
    private String userType;
    private String riderType;
    private Long userId;
    private String message;
    
    public AuthResponse(String token, User user) {
        this.token = token;
        this.email = user.getEmail();
        this.userType = user.getUserType().name();
        this.riderType = user.getRiderType();
        this.userId = user.getId();
        this.message = "Authentication successful";
    }
    
    public AuthResponse(String message) {
        this.message = message;
    }
    
    // Getters and Setters
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getUserType() { return userType; }
    public void setUserType(String userType) { this.userType = userType; }
    
    public String getRiderType() { return riderType; }
    public void setRiderType(String riderType) { this.riderType = riderType; }
    
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
