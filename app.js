const createError = require('http-errors');
const express = require('express');
const router = express.Router();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const developersRouter = require('./routes/developers');
const projectsRouter = require('./routes/projects');
const dashboardsRouter = require('./routes/dashboards');
const releaseBacklogsRouter = require('./routes/release-backlogs');
const sprintsRouter = require('./routes/sprints');
const columnsRouter = require('./routes/columns');
const userStoriesRouter = require('./routes/user-stories');
const userSocialNetworksRouter = require('./routes/user-social-networks');
const skillsRouter = require('./routes/skills');
const dbConnection = require('./dbConnection');
const { initializeAdminIfNeeded } = require("./utilities/initializeDb");
const { expressjwt } = require('express-jwt');

const Routers = [
  authRouter,
  indexRouter,
  usersRouter,
  developersRouter,
  projectsRouter,
  dashboardsRouter,
  releaseBacklogsRouter,
  sprintsRouter,
  columnsRouter,
  userStoriesRouter,
  userSocialNetworksRouter,
  skillsRouter,
]

dbConnection.run().then(async () => {
  console.log("Connection to database sucessful!");
  try {
    const result = await initializeAdminIfNeeded();
    if (result) {
      console.log("Database data initialization completed!");
    } else {
      console.log("Check for database minimum data passed!");
    }
  } catch (error) {
    console.error(error);
  }
});

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const jwtSecret = "c2c3416e440dc7ad082c788352d983be";
app.set('jwt.secret', jwtSecret);
app.use(expressjwt({ secret: app.get('jwt.secret'), algorithms: ['HS256'] }).unless({
  path: ['/login'],
}));


Routers.forEach((createRouter) => {
  if (typeof createRouter === 'function') {
    createRouter(app, router);
  }
});
app.use('/', router);

// app.use('/', indexRouter);
// app.use('/login', authRouter);
// app.use('/users', usersRouter);
// app.use('/developers', developersRouter);
// app.use('/projects', projectsRouter);
// app.use('/dashboards', dashboardsRouter);
// app.use('/release-backlogs', releaseBacklogsRouter);
// app.use('/sprints', sprintsRouter);
// app.use('/columns', columnsRouter);
// app.use('/user-stories', userStoriesRouter);
// app.use('/user-social-networks', userSocialNetworksRouter);
// app.use('/skills', skillsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;