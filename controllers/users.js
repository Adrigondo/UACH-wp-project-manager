const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/users/user');
const { defineAbilityFor } = require('../utilities/permissions');

async function create(req, res, next) {
    const { username, email, password, roles: rolesArray, socialNetworks: socialNetworksArray } = req.body;
    
    const roles = rolesArray ? rolesArray.map((id) => {
        return new mongoose.Types.ObjectId(id);
    }) : [];
    const socialNetworks = socialNetworksArray ? socialNetworksArray.map((id) => {
        return new mongoose.Types.ObjectId(id);
    }) : [];
    const salt = await bcrypt.genSalt(10);

    const passwordHash = await bcrypt.hash(password, salt);
    const user = new User({ username, email, password: passwordHash, salt, roles, socialNetworks });

    const currentUser = req.auth.data.user;
    const ability = await defineAbilityFor(currentUser);

    if (ability.cannot('CREATE', 'User')) {
        res.status(403).json({
            msg: "User couldn't be created",
            obj: {},
        });
        return;
    }

    user.save().then((obj) => {
        res.status(200).json({
            msg: 'User correctly created',
            obj: obj,
        });
    }).catch((exc) => {
        res.status(500).json({
            msg: "User couldn't be created",
            obj: exc,
        })
    });
}

async function list(req, res, next) {
    const currentUser = req.auth.data.user;
    const ability = await defineAbilityFor(currentUser);

    if (ability.cannot('LIST', 'User')) {
        res.status(403).json({
            msg: "User couldn't be listed",
            obj: {},
        });
        return;
    }

    User.find().populate("_roles").populate("_socialNetworks").then((obj) => {
        res.status(200).json({
            msg: 'Users list',
            obj: obj,
        });
    }).catch((exc) => {
        res.status(500).json({
            msg: "User couldn't be listed",
            obj: exc,
        })
    });
}

async function index(req, res, next) {
    const { id } = req.params;

    const currentUser = req.auth.data.user;
    const ability = await defineAbilityFor(currentUser);

    if (ability.cannot('READ', 'User')) {
        res.status(403).json({
            msg: "User couldn't be readed",
            obj: {},
        });
        return;
    }

    User.findOne({ _id: id }).populate("_roles").populate("_socialNetworks").then((obj) => {
        res.status(200).json({
            msg: `User ${id}`,
            obj: obj,
        });
    }).catch((exc) => {
        res.status(500).json({
            msg: `User  ${id} couldn't be recovered`,
            obj: exc,
        })
    });
}

async function replace(req, res, next) {
    const { id } = req.params;
    const { username, email, password, roles, socialNetworks } = {
        username: req.body.username || "",
        email: req.body.email || "",
        password: req.body.password || "",
        roles: req.body.roles ? req.body.roles.map((id) => {
            return new mongoose.Types.ObjectId(id);
        }) : [],
        socialNetworks: req.body.socialNetworks ? req.body.socialNetworks.map((id) => {
            return new mongoose.Types.ObjectId(id);
        }) : [],
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new Object({
        _username: username,
        _email: email,
        _password: passwordHash,
        _salt: salt,
        _roles: roles,
        _socialNetworks: socialNetworks,
    });

    const currentUser = req.auth.data.user;
    const ability = await defineAbilityFor(currentUser);

    if (ability.cannot('REPLACE', 'User')) {
        res.status(403).json({
            msg: "User couldn't be replaced",
            obj: {},
        });
        return;
    }

    User.findByIdAndUpdate(id, user, { new: true }).then((obj) => {
        res.status(200).json({
            msg: `User ${id} replaced`,
            obj: obj,
        });
    }).catch((exc) => {
        res.status(500).json({
            msg: `User  ${obj.id} couldn't be replaced`,
            obj: exc,
        })
    });
}

async function update(req, res, next) {
    const { id } = req.params;
    const { username, email, password, roles, socialNetworks } = {
        username: req.body.username || undefined,
        email: req.body.email || undefined,
        password: req.body.password || undefined,
        roles: req.body.roles ? req.body.roles.map((id) => {
            return new mongoose.Types.ObjectId(id);
        }) : undefined,
        socialNetworks: req.body.socialNetworks ? req.body.socialNetworks.map((id) => {
            return new mongoose.Types.ObjectId(id);
        }) : undefined,
    }

    const salt = password ? await bcrypt.genSalt(10) : undefined;
    const passwordHash = password ? await bcrypt.hash(password, salt) : undefined;

    const user = new Object({
        _username: username,
        _email: email,
        _password: passwordHash,
        _salt: salt,
        _roles: roles,
        _socialNetworks: socialNetworks,
    });

    const currentUser = req.auth.data.user;
    const ability = await defineAbilityFor(currentUser);

    if (ability.cannot('UPDATE', 'User')) {
        res.status(403).json({
            msg: "User couldn't be updated",
            obj: {},
        });
        return;
    }

    User.findByIdAndUpdate(id, user, { new: true }).then((obj) => {
        res.status(200).json({
            msg: `User ${id} updated`,
            obj: obj,
        });
    }).catch((exc) => {
        res.status(500).json({
            msg: `User  ${id} couldn't be updated`,
            obj: exc,
        })
    });
}

async function destroy(req, res, next) {
    const { id } = req.params;

    const currentUser = req.auth.data.user;
    const ability = await defineAbilityFor(currentUser);

    if (ability.cannot('REMOVE', 'User')) {
        res.status(403).json({
            msg: "User couldn't be deleted",
            obj: {},
        });
        return;
    }

    User.findByIdAndDelete({ _id: id }).then((obj) => {
        res.status(200).json({
            msg: `User ${id} deleted`,
            obj: obj,
        });
    }).catch((exc) => {
        res.status(500).json({
            msg: `User  ${id} couldn't be deleted`,
            obj: exc,
        });
    });
}

module.exports = { create, list, index, replace, update, destroy }