package com.example.demo.repo;

import com.example.demo.model.ActivityLog;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
@ConditionalOnProperty(name = "spring.data.mongodb.uri")
public interface ActivityLogRepository extends MongoRepository<ActivityLog, String> {
    
    List<ActivityLog> findByUserIdOrderByCreatedAtDesc(Long userId);
    
    List<ActivityLog> findByUserEmailOrderByCreatedAtDesc(String userEmail);
    
    List<ActivityLog> findByActivityTypeOrderByCreatedAtDesc(ActivityLog.ActivityType activityType);
    
    List<ActivityLog> findByCreatedAtBetweenOrderByCreatedAtDesc(LocalDateTime start, LocalDateTime end);
    
    List<ActivityLog> findByUserIdAndActivityTypeOrderByCreatedAtDesc(Long userId, ActivityLog.ActivityType activityType);
}
