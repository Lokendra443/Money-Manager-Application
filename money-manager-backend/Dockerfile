# Stage 1: Build the JAR
FROM eclipse-temurin:21-jdk AS build
WORKDIR /app
COPY . .
RUN ./mvnw clean package

# Stage 2: Run the application
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/money-manager-backend-0.0.1-SNAPSHOT.jar moneymanager-v1.0.jar
EXPOSE 9090
ENTRYPOINT ["java", "-jar", "moneymanager-v1.0.jar"]



