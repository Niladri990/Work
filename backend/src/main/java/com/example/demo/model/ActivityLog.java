package com.example.demo.model;

// Removed Lombok due to Java 24 compatibility issues
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;
import java.util.List;

@SuppressWarnings("unused")
@Document(collection = "activity_logs")
public class ActivityLog {
    
    @Id
    private String id;
    
    @Field("user_id")
    private Long userId;
    
    @Field("user_email")
    private String userEmail;
    
    @Field("activity_type")
    private ActivityType activityType;
    
    @Field("description")
    private String description;
    
    @Field("metadata")
    private Object metadata; // Flexible field for storing additional data
    
    @Field("ip_address")
    private String ipAddress;
    
    @Field("user_agent")
    private String userAgent;
    
    @Field("created_at")
    private LocalDateTime createdAt;
    
    public ActivityLog(Long userId, String userEmail, ActivityType activityType, String description) {
        this.userId = userId;
        this.userEmail = userEmail;
        this.activityType = activityType;
        this.description = description;
        this.createdAt = LocalDateTime.now();
        
    }
    
    public enum ActivityType {
        BOOKING_STATUS_UPDATED,LOGIN, LOGOUT, REGISTRATION, COMPLAINT_SUBMITTED, 
        BOOKING_CREATED, SCHEDULE_UPDATED, PROFILE_UPDATED,
        WASTE_REPORTED, COLLECTION_SCHEDULED
    }
    
    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    
    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }
    
    public ActivityType getActivityType() { return activityType; }
    public void setActivityType(ActivityType activityType) { this.activityType = activityType; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public Object getMetadata() { return metadata; }
    public void setMetadata(Object metadata) { this.metadata = metadata; }
    
    public String getIpAddress() { return ipAddress; }
    public void setIpAddress(String ipAddress) { this.ipAddress = ipAddress; }
    
    public String getUserAgent() { return userAgent; }
    public void setUserAgent(String userAgent) { this.userAgent = userAgent; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    // Constructors
    public ActivityLog() {}
    
    public ActivityLog(String id, Long userId, String userEmail, ActivityType activityType, String description, 
                      Object metadata, String ipAddress, String userAgent, LocalDateTime createdAt) {
        this.id = id;
        this.userId = userId;
        this.userEmail = userEmail;
        this.activityType = activityType;
        this.description = description;
        this.metadata = metadata;
        this.ipAddress = ipAddress;
        this.userAgent = userAgent;
        this.createdAt = createdAt;
    }
}
