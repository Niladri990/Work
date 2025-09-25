package com.example.demo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
// Removed Lombok due to Java 24 compatibility issues
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Collections;

@Entity
@Table(name = "users")
public class User implements UserDetails {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank
    @Email
    @Column(unique = true, nullable = false)
    private String email;
    
    @NotBlank
    @Size(min = 6)
    @Column(nullable = false)
    private String password;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserType userType;
    
    // Fields for Green Center and NGO
    private String regNumber;
    private String ownerName;
    
    // Fields for Conservancy
    private String conservancyRegNumber;
    private String conservancyOwnerName;
    
    // Fields for Rider
    private String riderType; // "ngo" or "conservancy"
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    // UserDetails implementation
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + userType.name()));
    }
    
    @Override
    public String getUsername() {
        return email;
    }
    
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }
    
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }
    
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
    
    @Override
    public boolean isEnabled() {
        return true;
    }
    
    public enum UserType {
        USER, GREEN_CENTER, NGO, CONSERVANCY, RIDER
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    
    public UserType getUserType() { return userType; }
    public void setUserType(UserType userType) { this.userType = userType; }
    
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
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    
    // Constructors
    public User() {}
    
    public User(Long id, String email, String password, UserType userType, String regNumber, String ownerName, 
                String conservancyRegNumber, String conservancyOwnerName, String riderType, 
                LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.userType = userType;
        this.regNumber = regNumber;
        this.ownerName = ownerName;
        this.conservancyRegNumber = conservancyRegNumber;
        this.conservancyOwnerName = conservancyOwnerName;
        this.riderType = riderType;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
