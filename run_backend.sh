#!/bin/bash

# Script to run the Nirmal backend
echo "Starting Nirmal Backend..."

# Check if Java is installed
if ! command -v java &> /dev/null; then
    echo "Java is not installed. Please install Java 17 or higher."
    exit 1
fi

# Check if MySQL is running
if ! pgrep -x "mysqld" > /dev/null; then
    echo "MySQL is not running. Please start MySQL first."
    echo "You can use: docker-compose up -d (from docker directory)"
    exit 1
fi

# Navigate to backend directory
cd "$(dirname "$0")/backend"

# Try to run with Gradle
if [ -f "./gradlew" ]; then
    echo "Running with Gradle..."
    chmod +x ./gradlew
    ./gradlew bootRun
else
    echo "Gradle wrapper not found. Please ensure gradlew and gradle-wrapper.jar are present."
    exit 1
fi
