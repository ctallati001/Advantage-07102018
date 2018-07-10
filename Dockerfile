FROM java:8
EXPOSE 8080
VOLUME /tmp
ADD target/bidding-0.0.1-SNAPSHOT.jar app.jar
RUN bash -c  'touch /app.jar'
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-Dspring.profiles.active=local","-jar","/app.jar"]
