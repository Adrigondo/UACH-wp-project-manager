var controller = require('../controllers/auth');
const { expressjwt } = require('express-jwt');
const { defineAbilityFor } = require('../utilities/permissions');

module.exports = (app, router) => {
  const jwtSecret = "c2c3416e440dc7ad082c788352d983be";
  app.set('jwt.secret', jwtSecret);

  router.post('/login', controller.login);

  app.use(expressjwt({ secret: app.get('jwt.secret'), algorithms: ['HS256'] }).unless({
    path: ['/login'],
  }));

  router.use((req, _, next) => {
    req.auth.ability = defineAbilityFor(req.auth.ability.user);
    next();
  });
};
