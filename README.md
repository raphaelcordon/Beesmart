# BeeSmart

## **INTRODUCTION**

- Final project for Batch27 of the Constructor Academy's Full-Stack Web Development Bootcamp;
- BeeSmart team:
  - Erzsebet Erdei (Böbi): 
  - Joshua Sussman: 
  - Raphael Cordon: https://github.com/raphaelcordon
  - Vytas Urbelis: https://github.com/vytautas-urbelis


## **Technical Project**
- BACKEND:
    - Python-Django Rest Framework
    - Postgres database
    - Applied software modeling concepts of DDD.
- Authentication and Access:
    - JWT authentication.
    - Roles for access level control (authorization).
- FRONTEND:
    - React-Vite;
    - Style: daisy-UI, Tailwind CSS, Fontawesome;
- Docker:
    - Docker-compose integrating containers for application and database;
    - In production, also integrates the implementation of NGINX on a virtual machine for reverse proxy management and caching.

## **Environment**
1.  Building implemented in GitLab pipeline publishing the application image on Docker Hub.

2.  Deployment on a virtual machine on Digital Ocean via docker-compose.deploy.yml which includes:
    - Creation of container for Postgres server and application database.
    - Creation of container for application, Web API, and Front End building.
    - Creation of a container for Nginx to manage reverse proxy and web application caching.

3.  Removal of old images and startup of containers.
