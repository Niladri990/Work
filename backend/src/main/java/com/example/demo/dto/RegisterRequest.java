package com.example.demo.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
// Removed Lombok due to Java 24 compatibility issues

public class RegisterRequest {
    
    @NotBlank
    @Email
    private String email;
    
    @NotBlank
    @Size(min = 6)
    private String password;
    
    @NotBlank
    private String confirmPassword;
    
    @NotBlank
    private String userType;
    
    // Fields for Green Center and NGO
    private String regNumber;
    private String ownerName;
    
    // Fields for Conservancy
    private String conservancyRegNumber;
    private String conservancyOwnerName;
    
    // Fields for Rider
    private String riderType;
    
    // Getters and Setters
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    
    public String getConfirmPassword() { return confirmPassword; }
    public void setConfirmPassword(String confirmPassword) { this.confirmPassword = confirmPassword; }
    
    public String getUserType() { return userType; }
    public void setUserType(String userType) { this.userType = userType; }
    
    public String getRegNumber() { return regNumber; }
    public void setRegNumber(String regNumber) { this.regNumber = regNumber; }
    
    public String getOwnerName() { return ownerName; }
    public void setOwnerName(String ownerName) { this.ownerName = ownerName; }
    
    public String getConservancyRegNumber() { return conservancyRegNumber; }
    public void setConservancyRegNumber(String conservancyRegNumber) { this.conservancyRegNumber = conservancyRegNumber; }
    
    public String getConservancyOwnerName() { return conservancyOwnerName; }
    public void setConservancyOwnerName(String conservancyOwnerName) { this.conservancyOwnerName = conservancyOwnerName; }
    
    public String getRiderType() { return riderType; }
    public void setRiderType(String riderType) { this.riderType = riderType; }
}
