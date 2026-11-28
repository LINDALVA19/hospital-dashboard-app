FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
# Copia o pom.xml
COPY pom.xml .
# Copia a pasta src inteira (onde está o código)
COPY src ./src
# Compila
RUN mvn clean package

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/xml-processor-1.0.jar app.jar
CMD ["java", "-jar", "app.jar"]