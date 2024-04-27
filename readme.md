# Management Projects Software

## Description
The following project is based on the implementation of a software project management using the Scrum methodology

## Diagrams
### Class diagram
The classes that we identify in the project are: 
- Project
- Developer
- User
- Dashboard
- Release Backlog
- Sprint 
- Column
- User Story 
- User Social Network
- Skill

After identifying the classes involved in the project, we make the next class diagram:
[Class diagram](./diagrams/class-diagram.png)

### Sequence diagram
The following Interaction Diagram explains the flow of the project according to the requirements. This diagram shows some of the interactions that will occur in the application like:
- Create new project 
- Visualice project 
- Create new skill
- Create new user 
- Add new user story to Product Backlog Column
- Move a user story in a sprint from a column to another one

With these interactions identified, the following diagram was made:
[Sequence diagram](./diagrams/sequence-diagram.png)

###  Drive folder with both diagrams:
https://drive.google.com/drive/folders/1qG5St1E4TvYXubA3IJIctspczrTvgGXa?usp=sharing

## Requeriments
```
Javascript
Node.js
```


## Instructions to initialize the project
These where the commands executed to initialize the express aplication project:
```
npm install -g express-generator
express --view=pug project-manager
cd project-manager
npm install

```
## Docker Image
To use this manual, download the image gary3k/manejador-proyectos.
```
docker pull gary3k/manejador-proyectos
docker run -ti manejador-proyectos

```
https://hub.docker.com/repository/docker/gary3k/manejador-proyectos/general


## Versioning
Version 1.0.0

## Authors
```
Adrian Alejandro Gonzalez Dominguez
Jair Delval Aguirre
Angel Eduardo Garibay Valenzuela
Brayan Ricardo Carrete Martinez
Jair Alejandro Gaytan Espindola
```
## Licence
This project is licensed under the MIT License - see the license.md file for details
