var controller = require('../controllers/auth');
const express = require('express');
const router = express.Router();

module.exports = (app, router) => {
  router.post('/login', controller.login);
};
