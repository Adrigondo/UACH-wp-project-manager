const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users/user');
const SanitiziedUser = require('../models/users/sanitiziedUser');

function login(req, res, next) {
    const { email, password } = req.body;
    User.findOne({ _email: email }).then(async (user) => {
        if (user) {
            const sanitiziedUser = new SanitiziedUser({
                _username: user.username,
                _email: user.email,
                _roles: user.roles,
                _socialNetworks: user.socialNetworks,
            });
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
                    exp: Math.floor(Date.now() / 1000) + 86400, // 1 day
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

module.exports = { login };