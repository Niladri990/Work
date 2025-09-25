-- Initialize Nirmal Database
-- This script runs when the MySQL container starts for the first time

USE nirmal_db;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_user_type ON users(user_type);
CREATE INDEX IF NOT EXISTS idx_complaints_user_id ON complaints(user_id);
CREATE INDEX IF NOT EXISTS idx_complaints_status ON complaints(status);
CREATE INDEX IF NOT EXISTS idx_complaints_created_at ON complaints(created_at);
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_schedules_user_id ON schedules(user_id);
CREATE INDEX IF NOT EXISTS idx_schedules_schedule_date ON schedules(schedule_date);

-- Insert some demo data (optional)
INSERT IGNORE INTO users (email, password, user_type, reg_number, owner_name, created_at, updated_at) VALUES
('admin@greencenter.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'GREEN_CENTER', 'GC001', 'Green Center Admin', NOW(), NOW()),
('admin@ngo.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'NGO', 'NGO001', 'NGO Admin', NOW(), NOW()),
('admin@conservency.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'CONSERVANCY', 'CONS001', 'Conservancy Admin', NOW(), NOW()),
('rider@ngo.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'RIDER', NULL, NULL, NOW(), NOW()),
('user@test.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'USER', NULL, NULL, NOW(), NOW());

-- Update rider with rider type
UPDATE users SET rider_type = 'ngo' WHERE email = 'rider@ngo.com';
UPDATE users SET conservancy_reg_number = 'CONS001', conservancy_owner_name = 'Conservancy Admin' WHERE email = 'admin@conservency.com';
