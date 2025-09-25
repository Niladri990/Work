package com.example.demo.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
// Removed Lombok due to Java 24 compatibility issues

import java.time.LocalDate;
import java.util.List;

public class ScheduleRequest {
    
    @NotNull
    private LocalDate scheduleDate;
    
    @NotEmpty
    private List<String> wasteTypes;
    
    // Getters and Setters
    public LocalDate getScheduleDate() { return scheduleDate; }
    public void setScheduleDate(LocalDate scheduleDate) { this.scheduleDate = scheduleDate; }
    
    public List<String> getWasteTypes() { return wasteTypes; }
    public void setWasteTypes(List<String> wasteTypes) { this.wasteTypes = wasteTypes; }
}
