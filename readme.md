# Instructions to initialize the project
npm install -g express-generator
express --view=pug project-manager
cd project-manager
npm install
DEBUG=project-manager:* npm start