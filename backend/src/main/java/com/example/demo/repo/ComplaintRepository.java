package com.example.demo.repo;

import com.example.demo.model.Complaint;
import com.example.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
    
    List<Complaint> findByUserOrderByCreatedAtDesc(User user);
    
    List<Complaint> findByStatusOrderByCreatedAtDesc(Complaint.Status status);
    
    List<Complaint> findByWasteTypeOrderByCreatedAtDesc(String wasteType);
    
    List<Complaint> findByCreatedAtBetweenOrderByCreatedAtDesc(LocalDateTime start, LocalDateTime end);
    
    List<Complaint> findByUserAndStatusOrderByCreatedAtDesc(User user, Complaint.Status status);
}
