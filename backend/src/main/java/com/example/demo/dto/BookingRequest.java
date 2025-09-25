package com.example.demo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
// Removed Lombok due to Java 24 compatibility issues

import java.time.LocalDate;
import java.util.List;

public class BookingRequest {
    
    @NotBlank
    private String locationType;
    
    @NotBlank
    private String pickupLocation;
    
    @NotNull
    private LocalDate startDate;
    
    @NotNull
    private LocalDate endDate;
    
    @NotBlank
    private String frequency;
    
    @NotEmpty
    private List<String> wasteTypes;
    
    private String remarks;
    
    // Getters and Setters
    public String getLocationType() { return locationType; }
    public void setLocationType(String locationType) { this.locationType = locationType; }
    
    public String getPickupLocation() { return pickupLocation; }
    public void setPickupLocation(String pickupLocation) { this.pickupLocation = pickupLocation; }
    
    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }
    
    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }
    
    public String getFrequency() { return frequency; }
    public void setFrequency(String frequency) { this.frequency = frequency; }
    
    public List<String> getWasteTypes() { return wasteTypes; }
    public void setWasteTypes(List<String> wasteTypes) { this.wasteTypes = wasteTypes; }
    
    public String getRemarks() { return remarks; }
    public void setRemarks(String remarks) { this.remarks = remarks; }
}
