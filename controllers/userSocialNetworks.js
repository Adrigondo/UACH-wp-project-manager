const express = require('express');
const UserSocialNetwork = require('../models/users/userSocialNetwork');
const mongoose = require('mongoose');

async function create(req, res, next) {
    const { username, apiKey, socialNetwork } = req.body;

    const userSocialNetwork = new UserSocialNetwork({ username, apiKey, socialNetwork });

    const currentUser = req.auth.data.user;
    const ability = await defineAbilityFor(currentUser);

    if (ability.cannot('CREATE', 'User social network')) {
        res.status(403).json({
            msg: "User social network couldn't be created",
            obj: {},
        });
        return;
    }

    userSocialNetwork.save().then((obj) => {
        res.status(200).json({
            msg: 'User social network correctly created',
            obj: obj,
        });
    }).catch((exc) => {
        res.status(500).json({
            msg: "User social network couldn't be created",
            obj: exc,
        })
    });
}

async function list(req, res, next) {
    const currentUser = req.auth.data.user;
    const ability = await defineAbilityFor(currentUser);

    if (ability.cannot('LIST', 'User social network')) {
        res.status(403).json({
            msg: "User social network couldn't be listed",
            obj: {},
        });
        return;
    }

    UserSocialNetwork.find().then((obj) => {
        res.status(200).json({
            msg: 'User social network list',
            obj: obj,
        });
    }).catch((exc) => {
        console.error(exc)
        res.status(500).json({
            msg: "User social network couldn't be listed",
            obj: exc,
        })
    });
}

async function index(req, res, next) {
    const { id } = req.params;
    const currentUser = req.auth.data.user;
    const ability = await defineAbilityFor(currentUser);

    if (ability.cannot('READ', 'User social network')) {
        res.status(403).json({
            msg: "User social network couldn't be readed",
            obj: {},
        });
        return;
    }

    UserSocialNetwork.findOne({ _id: id }).then((obj) => {
        res.status(200).json({
            msg: `User social network ${id}`,
            obj: obj,
        });
    }).catch((exc) => {
        res.status(500).json({
            msg: `User social network  ${id} couldn't be recovered`,
            obj: exc,
        })
    });
}

async function replace(req, res, next) {
    const { id } = req.params;
    const { username, apiKey, socialNetwork } = {
        username: req.body.username || "",
        apiKey: req.body.apiKey || "",
        socialNetwork: req.body.socialNetwork || "",
    }

    const userSocialNetwork = new Object({
        _username: username,
        _apiKey: apiKey,
        _socialNetwork: socialNetwork,
    });

    const currentUser = req.auth.data.user;
    const ability = await defineAbilityFor(currentUser);

    if (ability.cannot('REPLACE', 'User social network')) {
        res.status(403).json({
            msg: "User social network couldn't be replaced",
            obj: {},
        });
        return;
    }

    UserSocialNetwork.findOneAndUpdate({ _id: id }, userSocialNetwork, { new: true }).then((obj) => {
        res.status(200).json({
            msg: `User social network ${obj.id} updated`,
            obj: obj,
        });
    }).catch((exc) => {
        res.status(500).json({
            msg: `User social network  ${obj.id} couldn't be updated`,
            obj: exc,
        })
    });
}

async function update(req, res, next) {
    const { id } = req.params;
    const { username, apiKey, socialNetwork } = {
        username: req.body.username || undefined,
        apiKey: req.body.apiKey || undefined,
        socialNetwork: req.body.socialNetwork || undefined,
    }

    const userSocialNetwork = new Object({
        _username: username,
        _apiKey: apiKey,
        _socialNetwork: socialNetwork,
    });

    const currentUser = req.auth.data.user;
    const ability = await defineAbilityFor(currentUser);
    
    if (ability.cannot('UPDATE', 'User social network')) {
        res.status(403).json({
            msg: "User social network couldn't be updated",
            obj: {},
        });
        return;
    }

    UserSocialNetwork.findOneAndUpdate({ _id: id }, userSocialNetwork, { new: true }).then((obj) => {
        res.status(200).json({
            msg: `User social network ${obj.id} updated`,
            obj: obj,
        });
    }).catch((exc) => {
        res.status(500).json({
            msg: `User social network  ${obj.id} couldn't be updated`,
            obj: exc,
        })
    });
}

async function destroy(req, res, next) {
    const { id } = req.params;
    const currentUser = req.auth.data.user;
    const ability = await defineAbilityFor(currentUser);

    if (ability.cannot('DELETE', 'User social network')) {
        res.status(403).json({
            msg: "User social network couldn't be deleted",
            obj: {},
        });
        return;
    }

    UserSocialNetwork.findByIdAndDelete({ _id: id }).then((obj) => {
        res.status(200).json({
            msg: `User social network ${id} deleted`,
            obj: obj,
        });
    }).catch((exc) => {
        res.status(500).json({
            msg: `User social network  ${id} couldn't be deleted`,
            obj: exc,
        })
    });
}

module.exports = { create, list, index, replace, update, destroy }
