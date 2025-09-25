package com.example.demo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
// Removed Lombok due to Java 24 compatibility issues

import java.util.List;

public class ComplaintRequest {
    
    @NotBlank
    private String wasteType;
    
    @NotEmpty
    private List<String> materials;
    
    @NotBlank
    private String locationType;
    
    @NotBlank
    private String description;
    
    @NotBlank
    private String location;
    
    private String photoNames;
    
    // Getters and Setters
    public String getWasteType() { return wasteType; }
    public void setWasteType(String wasteType) { this.wasteType = wasteType; }
    
    public List<String> getMaterials() { return materials; }
    public void setMaterials(List<String> materials) { this.materials = materials; }
    
    public String getLocationType() { return locationType; }
    public void setLocationType(String locationType) { this.locationType = locationType; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    
    public String getPhotoNames() { return photoNames; }
    public void setPhotoNames(String photoNames) { this.photoNames = photoNames; }
}
