# BeeSmart


## Table of Contents

- [Introduction](#introduction)
- [Project Scope](#project-scope)


## **INTRODUCTION**

- Final project for the Batch27 of the Constructor Academy's Full-Stack Web Development Bootcamp;
- BeeSmart team:
  - Erzsebet Erdei (Böbi): 
  - Joshua Sussman: 
  - Raphael Cordon: https://github.com/raphaelcordon
  - Vytas Urbelis: 


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
1.  Building implemented in Gitlab pipeline publishing the application image on Docker Hub.

2.  Deployment on a virtual machine on Digital Ocean via docker-compose.deploy.yml which includes:
    - Creation of container for Postgres server and application database.
    - Creation of container for application, Web Api, and Front End building.
    - Creation of container for Nginx to manage reverse proxy and web application caching.

3.  Removal of old images and startup of containers.