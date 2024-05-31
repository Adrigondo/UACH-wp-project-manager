var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var usersRouter = require('./routes/users');
var developersRouter = require('./routes/developers');
var projectsRouter = require('./routes/projects');
var dashboardsRouter = require('./routes/dashboards');
var releaseBacklogsRouter = require('./routes/release-backlogs');
var sprintsRouter = require('./routes/sprints');
var columnsRouter = require('./routes/columns');
var userStoriesRouter = require('./routes/user-stories');
var userSocialNetworksRouter = require('./routes/user-social-networks');
var skillsRouter = require('./routes/skills');
const dbConnection = require('./dbConnection');
const { initializeAdminIfNeeded } = require("./utilities/initializeDb");

dbConnection.run().then(async () => {
  try {
    const result=await initializeAdminIfNeeded();
    console.log(result)
  } catch (error) {
    console.log(error);
  }
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/developers', developersRouter);
app.use('/projects', projectsRouter);
app.use('/dashboards', dashboardsRouter);
app.use('/release-backlogs', releaseBacklogsRouter);
app.use('/sprints', sprintsRouter);
app.use('/columns', columnsRouter);
app.use('/user-stories', userStoriesRouter);
app.use('/user-social-networks', userSocialNetworksRouter);
app.use('/skills', skillsRouter);

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