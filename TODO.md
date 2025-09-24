# Project Structure

```
fullstack-project/
│
├── frontend/                      # React.js app
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── App.js                 # Main React component (fetch users, add user)
│   │   ├── index.js               # React entry point
│   │   └── components/            # (Optional) extra UI components
│   ├── package.json               # React dependencies
│   ├── package-lock.json
│   └── README.md
│
├── backend/                       # Java + Gradle + Spring Boot
│   ├── build.gradle               # Gradle config
│   ├── settings.gradle
│   ├── gradlew
│   ├── gradlew.bat
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/example/demo/
│   │   │   │   ├── DemoApplication.java         # Spring Boot main class
│   │   │   │   ├── controller/
│   │   │   │   │   └── UserController.java
│   │   │   │   ├── model/
│   │   │   │   │   ├── User.java                # MySQL entity
│   │   │   │   │   └── ActivityLog.java         # MongoDB document
│   │   │   │   └── repo/
│   │   │   │       ├── UserRepository.java
│   │   │   │       └── ActivityLogRepository.java
│   │   │   └── resources/
│   │   │       ├── application.properties       # MySQL + MongoDB config
│   │   │       └── static/                      # (optional for serving static files)
│   │   └── test/java/com/example/demo/
│   │       └── DemoApplicationTests.java
│   └── README.md
│
├── docker/                        # (Optional, containerization support)
│   ├── docker-compose.yml         # Runs MySQL + MongoDB (and optionally backend/frontend)
│   └── db-init-scripts/           # SQL or Mongo init scripts if needed
│
└── README.md                      # Project root instructions
```