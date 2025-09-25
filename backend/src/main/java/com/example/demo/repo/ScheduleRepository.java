package com.example.demo.repo;

import com.example.demo.model.Schedule;
import com.example.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    
    List<Schedule> findByUserOrderByScheduleDateDesc(User user);
    
    List<Schedule> findByScheduleDateOrderByCreatedAtDesc(LocalDate scheduleDate);
    
    List<Schedule> findByStatusOrderByScheduleDateDesc(Schedule.Status status);
    
    List<Schedule> findByScheduleDateBetweenOrderByScheduleDateDesc(LocalDate start, LocalDate end);
    
    List<Schedule> findByUserAndStatusOrderByScheduleDateDesc(User user, Schedule.Status status);
    
    Optional<Schedule> findByUserAndScheduleDate(User user, LocalDate scheduleDate);
    
    List<Schedule> findByCreatedAtBetweenOrderByCreatedAtDesc(LocalDateTime start, LocalDateTime end);
}
