const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const SanitiziedUser = require('../models/sanitiziedUser');

function login(req, res, next) {
    const { email, password } = req.body;
    
    User.findOne({ _email: email }).then(async (user) => {
        if (user) {
            const sanitiziedUser = new SanitiziedUser({
                _name: user.name,
                _lastName: user.lastName,
                _email: user.email,
                _roles: user.roles,
            });
            // console.debug("Sanitizied User:", sanitiziedUser);
            return {
                tryPassword: await bcrypt.hash(password, user.salt),
                userPassword: user.password,
                user: sanitiziedUser,
            };
        } else {
            throw "Usuario o contraseña incorrectos";
        }
    }).then(({ tryPassword, userPassword, user }) => {
        if (tryPassword === userPassword) {
            res.status(200).json({
                msg: "Successful login",
                obj: jwt.sign({
                    data: {
                        user: user,
                    },
                    exp: Math.floor(Date.now() / 1000) + 86400,
                }, req.app.get('jwt.secret')),
            });
        } else {
            throw "Usuario o contraseña incorrectos";
        }
    }).catch((err) => {
        res.status(403).json({
            msg: "Login failed",
            obj: err,
        });
    });
    // res.render('login', { title: 'Express' });
}

module.exports = { home, login };