# Nirmal Backend

Spring Boot backend application for the Nirmal waste management system.

## Features

- **User Authentication**: JWT-based authentication with different user types (User, Green Center, NGO, Conservancy, Rider)
- **Complaint Management**: Submit and track waste-related complaints
- **Booking System**: Schedule conservancy services
- **Schedule Management**: Manage waste collection schedules
- **Activity Logging**: Track user activities in MongoDB
- **Dual Database**: MySQL for relational data, MongoDB for activity logs

## Technology Stack

- **Spring Boot 3.2.0**
- **Spring Security** with JWT
- **Spring Data JPA** for MySQL
- **Spring Data MongoDB**
- **MySQL 8.0** for main data
- **MongoDB** for activity logs
- **Gradle** for build management

## Database Configuration

### MySQL
- **Host**: localhost:3306
- **Database**: nirmal_db
- **Username**: root
- **Password**: 97488

### MongoDB
- **Host**: localhost:27017
- **Database**: nirmal_activity_logs

## API Endpoints

### Authentication (`/api/auth`)
- `POST /login` - User login
- `POST /register` - User registration
- `POST /logout` - User logout

### Complaints (`/api/complaints`)
- `POST /` - Submit complaint
- `GET /` - Get user complaints
- `GET /{id}` - Get specific complaint
- `PUT /{id}/status` - Update complaint status

### Bookings (`/api/bookings`)
- `POST /` - Create booking
- `GET /` - Get user bookings
- `GET /{id}` - Get specific booking
- `PUT /{id}/status` - Update booking status

### Schedules (`/api/schedules`)
- `POST /` - Create/update schedule
- `GET /` - Get user schedules
- `GET /date/{date}` - Get schedules by date
- `DELETE /{id}` - Delete schedule

## Running the Application

1. **Prerequisites**:
   - Java 17+
   - MySQL 8.0+
   - MongoDB

2. **Build and Run**:
   ```bash
   ./gradlew bootRun
   ```

3. **Access**:
   - Application: http://localhost:8080
   - API Base URL: http://localhost:8080/api

## CORS Configuration

The application is configured to allow requests from:
- http://localhost:3000 (React frontend)
- http://127.0.0.1:5500 (Live Server)
- file:// (Local file access)

## Security

- JWT tokens for authentication
- Password encryption using BCrypt
- CORS enabled for frontend integration
- Role-based access control

## User Types

1. **USER**: Regular users who can submit complaints and book services
2. **GREEN_CENTER**: Green center administrators
3. **NGO**: NGO administrators
4. **CONSERVANCY**: Conservancy administrators
5. **RIDER**: Waste collection riders (NGO or Conservancy)

## Development

To run in development mode:
```bash
./gradlew bootRun --args='--spring.profiles.active=dev'
```
