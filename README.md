# Bookify - book tracker app

## Table of Contents
- [About](#about)
- [Technology Stack](#technology-stack)
- [Requirements](#requirements)
- [Installation](#installation)
- [System Actors](#system-actors)
- [ERD Diagram](#erd-diagram)
- [Screenshots](#screenshots)
- [Credits](#credits)

## About
Bookify app is a book tracking app. As a logged in user, you can discover books, comment and rate them, and add them to your bookshelf.
The administrator can manage the entire system.

## Technology Stack
- [Angular 17](https://v17.angular.io/docs)
- [NgRx](https://ngrx.io/)
- [Spring Boot 3](https://spring.io/projects/spring-boot)
- [Docker](https://www.docker.com/)
- [PostgreSQL](https://www.postgresql.org.pl/)
- [Apache Kafka](https://kafka.apache.org/)

## Requirements
- [Docker](https://www.docker.com/) installed on your machine.
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) installed on your machine.
- [Angular 17](https://v17.angular.io/guide/setup-local) installed on your machine.

## Installation
1. Open a terminal in the main project folder.
2. Run the command:
   ```bash
   docker-compose up
   ```
4. Open a terminal in /backend folder
5. Run commands
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```
6. Access the backend application in at `localhost:8080`.
7. Open a terminal in the /frontend folder.
8. Run commands
   ```bash
   npm i
   npm run start
   ```
9. Open web application at `localhost:4200`

## System Actors
- **Admin:** Manages books, authors, genres and comments.
- **User:** Browses books and tracks reading progress. Adding ratings and comments
- **Unauthorized:** Browses books.

## ERD Diagram
![erd](https://github.com/tnt120/bookify-ZTPAI/assets/48412587/00bb8d51-5d36-42c1-ad81-4eab07b77245)

## Screenshots
- **Login Page:**
  ![image](https://github.com/tnt120/bookify-ZTPAI/assets/48412587/5ba21fe3-1b61-4f95-b954-fa66d1fce3cd)
  ![image](https://github.com/tnt120/bookify-ZTPAI/assets/48412587/02c22821-b743-4562-8b33-98b81b859a5d)

- **Main Home:**
  ![image](https://github.com/tnt120/bookify-ZTPAI/assets/48412587/4eb09844-6ce8-445d-9fa4-8429a37df9f1)
  ![image](https://github.com/tnt120/bookify-ZTPAI/assets/48412587/15318d03-6b0b-4b7b-9554-033a07734305)

- **Book Details Page:**
  ![image](https://github.com/tnt120/bookify-ZTPAI/assets/48412587/3cd2eefc-4636-4037-87ce-3b0089976e2c)
  ![image](https://github.com/tnt120/bookify-ZTPAI/assets/48412587/6239b2bc-4340-4a69-9b90-fb1dd6fe6cb3)

- **Bookcase:**
  ![image](https://github.com/tnt120/bookify-ZTPAI/assets/48412587/0fd1e4f2-80f8-4310-918f-ca757e1d8d30)
  ![image](https://github.com/tnt120/bookify-ZTPAI/assets/48412587/df20358b-3fd1-422d-b06d-2f7cf184ffe6)

- **Admin Dashboard:**
  ![image](https://github.com/tnt120/bookify-ZTPAI/assets/48412587/0afcafc6-314d-4f11-aee5-d69898e6384f)
  ![image](https://github.com/tnt120/bookify-ZTPAI/assets/48412587/3a406d20-003d-4e93-988c-650af6ff2fbb)

## Credits

This project was developed and designed by [Artur Pajor](https://github.com/)

Contack:
- [Linked-in](https://www.linkedin.com/in/artur-pajor-131334213/)
- Email: apaj04@gmail.com
