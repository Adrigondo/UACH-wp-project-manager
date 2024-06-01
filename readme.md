# Management Projects Software

## Description
This project is based on the implementation of a software project management using the Scrum methodology.  We build an api in node.js. The db is done in mongodb (comunicating with mongoose), the RACL is done with CASL, and the sessions are managed with JWT.

## Getting Started
### Public credentials
These are the credentials for an admin account that you can use to test the aplication.
- **Email:** admin.
- **Password:** admin123

The API was deployed to *Back4App*, here is the url: [https://wpprojectmanager-e8dqs6f1.b4a.run/](https://wpprojectmanager-e8dqs6f1.b4a.run/).

### Response format
This is the format of the responses:
```json
{
    "msg": "...",
    "obj": ...
}
```
The obj can be the error, an object, a null, the important is that there goes the content of the response. In the [Routes](#routes) section, keep in mind that we are just specifiying the content, but actually, it has the format mentioned here

### Routes
All the routes in the aplication requires of the jwttoken, except [/auth/login](#auth).

#### Auth routes
| Route       | Method | Body                             | Response                       |
| ----------- | ------ | -------------------------------- | ------------------------------ |
| /auth/login | POST   | email:String<br/>password:String | jwttoken {data:userSanitizied} |

#### Other routes
| Route for model       |
| --------------------- |
| /users                |
| /permissions          |
| /roles                |
| /developers           |
| /projects             |
| /developer-skills     |
| /user-social-networks |
| /dashboards           |
| /release-backlogs     |
| /sprints              |
| /columns              |
| /user-stories         |

All the routes have the next format, for example `/users/create`.
| Route    | Method | Params     | Body                           | Response                             |
| -------- | ------ | ---------- | ------------------------------ | ------------------------------------ |
| /create  | POST   |            | Values of the model to create  | The obj created                      |
| /read    | GET    | id:MongoId |                                | The obj with the id provided         |
| /list    | GET    |            |                                | The list of objs of the model        |
| /update  | PATCH  | id:MongoId | Values to update of the model  | The new obj with the id provided     |
| /replace | PUT    | id:MongoId | Values of the model to replace | The new obj with the id provided     |
| /delete  | DELETE | id:MongoId |                                | The obj deleted with the id provided |

## Diagrams
### Class diagram
The models that we identified in the project are: 
- User
- Permission
- Role
- Developer
- Project
- Developer Skill
- User Social Network
- Dashboard
- Release Backlog
- Sprint 
- Column
- User Story 

After identifying the classes involved in the project, we make the next class diagram:
![Class diagram](./diagrams/class-diagram.png)

### Sequence diagram
The following Interaction Diagram explains the flow of the project according to the requirements. This diagram shows some of the interactions that will occur in the application like:
- Login 
- Create new project 
- Visualice project 
- Create new skill
- Create new user 
- Add new user story to Product Backlog Column
- Move a user story in a sprint from a column to another one

With these interactions identified, the following diagram was made:
![Sequence diagram](./diagrams/sequence-diagram.png)

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
npm install @casl/ability bcrypt express-jwt jsonwebtoken mongoose
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
