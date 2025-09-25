package com.example.demo.repo;

import com.example.demo.model.Booking;
import com.example.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    
    List<Booking> findByUserOrderByCreatedAtDesc(User user);
    
    List<Booking> findByStatusOrderByCreatedAtDesc(Booking.Status status);
    
    List<Booking> findByStartDateBetweenOrderByCreatedAtDesc(LocalDate start, LocalDate end);
    
    List<Booking> findByUserAndStatusOrderByCreatedAtDesc(User user, Booking.Status status);
    
    List<Booking> findByCreatedAtBetweenOrderByCreatedAtDesc(LocalDateTime start, LocalDateTime end);
}
