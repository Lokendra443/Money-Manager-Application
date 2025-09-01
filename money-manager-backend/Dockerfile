# Stage 1: Build the project using Maven
FROM maven:3.9.2-eclipse-temurin-21 AS build
WORKDIR /app

# Copy pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy source code
COPY src ./src

# Build the jar (skip tests for faster build)
RUN mvn clean package -DskipTests

# Stage 2: Run the jar using a lightweight JRE
FROM eclipse-temurin:21-jre
WORKDIR /app

# Copy the jar from the build stage
COPY --from=build /app/target/money-manager-backend-0.0.1-SNAPSHOT.jar moneymanager-v1.0.jar

# Expose your backend port
EXPOSE 9090

# Run the jar
ENTRYPOINT ["java", "-jar", "moneymanager-v1.0.jar"]
