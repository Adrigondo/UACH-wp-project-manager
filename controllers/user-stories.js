const express = require('express');
const UserStory = require('../models/users/userStory');
const mongoose = require('mongoose');

async function create(req, res, next) {
    const {title, narrativeHow, narrativeWant, narrativeLike, priority, size, criteriaContext, criteriaWhen, criteriaThen, approved } = req.body;

    const userStory = new UserStory({ title, narrativeHow, narrativeWant, narrativeLike, priority, size, criteriaContext, criteriaWhen, criteriaThen, approved });

    const currentUser = req.auth.data.user;
    const ability = await defineAbilityFor(currentUser);

    if (ability.cannot('CREATE', 'User story')) {
        res.status(403).json({
            msg: "User story couldn't be created",
            obj: {},
        });
        return;
    }

    userStory.save().then((obj) => {
        res.status(200).json({
            msg: 'User story correctly created',
            obj: obj,
        });
    }).catch((exc) => {
        res.status(500).json({
            msg: "User story couldn't be created",
            obj: exc,
        })
    });
}

async function list(req, res, next) {
    const currentUser = req.auth.data.user;
    const ability = await defineAbilityFor(currentUser);

    if (ability.cannot('LIST', 'User story')) {
        res.status(403).json({
            msg: "User story couldn't be listed",
            obj: {},
        });
        return;
    }

    UserStory.find().then((obj) => {
        res.status(200).json({
            msg: 'User story list',
            obj: obj,
        });
    }).catch((exc) => {
        console.error(exc)
        res.status(500).json({
            msg: "User story couldn't be listed",
            obj: exc,
        })
    });
}

async function index(req, res, next) {
    const { id } = req.params;
    const currentUser = req.auth.data.user;
    const ability = await defineAbilityFor(currentUser);

    if (ability.cannot('READ', 'User story')) {
        res.status(403).json({
            msg: "User story couldn't be readed",
            obj: {},
        });
        return;
    }

    UserStory.findOne({ _id: id }).then((obj) => {
        res.status(200).json({
            msg: `User story ${id}`,
            obj: obj,
        });
    }).catch((exc) => {
        res.status(500).json({
            msg: `User story  ${id} couldn't be recovered`,
            obj: exc,
        })
    });
}

async function replace(req, res, next) {
    const { id } = req.params;
    const { description, status } = {
        description: req.body.description || "",
        status: req.body.status || "",
    }

    const role = new Object({
        _description: description,
        _status: status,
    });

    const currentUser = req.auth.data.user;
    const ability = await defineAbilityFor(currentUser);

    if (ability.cannot('REPLACE', 'Role')) {
        res.status(403).json({
            msg: "Role couldn't be replaced",
            obj: {},
        });
        return;
    }

    Role.findOneAndUpdate({ _id: id }, role, { new: true }).then((obj) => {
        res.status(200).json({
            msg: `Role ${obj.id} updated`,
            obj: obj,
        });
    }).catch((exc) => {
        res.status(500).json({
            msg: `Role  ${obj.id} couldn't be updated`,
            obj: exc,
        })
    });
}

async function update(req, res, next) {
    const { id } = req.params;
    const { description, status } = {
        description: req.body.description || undefined,
        status: req.body.status || undefined,
    }

    const role = new Object({
        _description: description,
        _status: status,
    });

    const currentUser = req.auth.data.user;
    const ability = await defineAbilityFor(currentUser);
    
    if (ability.cannot('UPDATE', 'Role')) {
        res.status(403).json({
            msg: "Role couldn't be updated",
            obj: {},
        });
        return;
    }

    Role.findOneAndUpdate({ _id: id }, role, { new: true }).then((obj) => {
        res.status(200).json({
            msg: `Role ${obj.id} updated`,
            obj: obj,
        });
    }).catch((exc) => {
        res.status(500).json({
            msg: `Role  ${obj.id} couldn't be updated`,
            obj: exc,
        })
    });
}

async function destroy(req, res, next) {
    const { id } = req.params;
    const currentUser = req.auth.data.user;
    const ability = await defineAbilityFor(currentUser);

    if (ability.cannot('DELETE', 'Role')) {
        res.status(403).json({
            msg: "Role couldn't be deleted",
            obj: {},
        });
        return;
    }

    Role.findByIdAndDelete({ _id: id }).then((obj) => {
        res.status(200).json({
            msg: `Role ${id} deleted`,
            obj: obj,
        });
    }).catch((exc) => {
        res.status(500).json({
            msg: `Role  ${id} couldn't be deleted`,
            obj: exc,
        })
    });
}

module.exports = { create, list, index, replace, update, destroy }
