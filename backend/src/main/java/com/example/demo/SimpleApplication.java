package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.data.mongo.MongoDataAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class, MongoDataAutoConfiguration.class})
public class SimpleApplication {

    public static void main(String[] args) {
        System.out.println("Starting Nirmal Backend in Simple Mode...");
        System.out.println("Note: This is a simplified version without database connections.");
        System.out.println("The application will start but database features will be disabled.");
        
        // Set system properties for H2 database
        System.setProperty("spring.datasource.url", "jdbc:h2:mem:testdb");
        System.setProperty("spring.datasource.driverClassName", "org.h2.Driver");
        System.setProperty("spring.datasource.username", "sa");
        System.setProperty("spring.datasource.password", "password");
        System.setProperty("spring.h2.console.enabled", "true");
        System.setProperty("spring.jpa.hibernate.ddl-auto", "create-drop");
        System.setProperty("server.port", "8080");
        
        SpringApplication.run(SimpleApplication.class, args);
    }
}