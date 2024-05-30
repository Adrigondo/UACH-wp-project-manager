const express = require('express');
const Role = require('../models/users/sprint');
const mongoose = require('mongoose');

async function create(req, res, next) {
    const { backlog, doing, done, testing, release } = req.body;

    const sprint = new Sprint({ backlog, doing, done, testing, release });

    const currentUser = req.auth.data.user;
    const ability = await defineAbilityFor(currentUser);

    if (ability.cannot('CREATE', 'Sprint')) {
        res.status(403).json({
            msg: "Sprint couldn't be created",
            obj: {},
        });
        return;
    }

    sprint.save().then((obj) => {
        res.status(200).json({
            msg: 'Sprint correctly created',
            obj: obj,
        });
    }).catch((exc) => {
        res.status(500).json({
            msg: "Sprint couldn't be created",
            obj: exc,
        })
    });
}

async function list(req, res, next) {
    const currentUser = req.auth.data.user;
    const ability = await defineAbilityFor(currentUser);

    if (ability.cannot('LIST', 'Sprint')) {
        res.status(403).json({
            msg: "Sprint couldn't be listed",
            obj: {},
        });
        return;
    }

    Sprint.find().then((obj) => {
        res.status(200).json({
            msg: 'Sprint list',
            obj: obj,
        });
    }).catch((exc) => {
        console.error(exc)
        res.status(500).json({
            msg: "Sprint couldn't be listed",
            obj: exc,
        })
    });
}

async function index(req, res, next) {
    const { id } = req.params;
    const currentUser = req.auth.data.user;
    const ability = await defineAbilityFor(currentUser);

    if (ability.cannot('READ', 'Sprint')) {
        res.status(403).json({
            msg: "Sprint couldn't be readed",
            obj: {},
        });
        return;
    }

    Sprint.findOne({ _id: id }).then((obj) => {
        res.status(200).json({
            msg: `Sprint ${id}`,
            obj: obj,
        });
    }).catch((exc) => {
        res.status(500).json({
            msg: `Sprint  ${id} couldn't be recovered`,
            obj: exc,
        })
    });
}

async function replace(req, res, next) {
    const { id } = req.params;
    const { backlog, doing, done, testing, release } = {
        backlog: req.body.backlog || "",
        doing: req.body.doing || "",
        done: req.body.done || "",
        testing: req.body.testing || "",
        release: req.body.release || "",
    }

    const sprint = new Object({
        _backlog: backlog,
        _doing: doing,
        _done: done,
        _testing: testing,
        _release: release,
    });

    const currentUser = req.auth.data.user;
    const ability = await defineAbilityFor(currentUser);

    if (ability.cannot('REPLACE', 'Sprint')) {
        res.status(403).json({
            msg: "Sprint couldn't be replaced",
            obj: {},
        });
        return;
    }

    Sprint.findOneAndUpdate({ _id: id }, sprint, { new: true }).then((obj) => {
        res.status(200).json({
            msg: `Sprint ${obj.id} updated`,
            obj: obj,
        });
    }).catch((exc) => {
        res.status(500).json({
            msg: `Sprint  ${obj.id} couldn't be updated`,
            obj: exc,
        })
    });
}

async function update(req, res, next) {
    const { id } = req.params;
    const { backlog, doing, done, testing, release } = {
        backlog: req.body.backlog || undefined,
        doing: req.body.doing || undefined,
        done: req.body.done || undefined,
        testing: req.body.testing || undefined,
        release: req.body.release || undefined,
    }

    const sprint = new Object({
        _backlog: backlog,
        _doing: doing,
        _done: done,
        _testing: testing,
        _release: release,
    });

    const currentUser = req.auth.data.user;
    const ability = await defineAbilityFor(currentUser);
    
    if (ability.cannot('UPDATE', 'Sprint')) {
        res.status(403).json({
            msg: "Sprint couldn't be updated",
            obj: {},
        });
        return;
    }

    Sprint.findOneAndUpdate({ _id: id }, sprint, { new: true }).then((obj) => {
        res.status(200).json({
            msg: `Sprint ${obj.id} updated`,
            obj: obj,
        });
    }).catch((exc) => {
        res.status(500).json({
            msg: `Sprint  ${obj.id} couldn't be updated`,
            obj: exc,
        })
    });
}

async function destroy(req, res, next) {
    const { id } = req.params;
    const currentUser = req.auth.data.user;
    const ability = await defineAbilityFor(currentUser);

    if (ability.cannot('DELETE', 'Sprint')) {
        res.status(403).json({
            msg: "Sprint couldn't be deleted",
            obj: {},
        });
        return;
    }

    Sprint.findByIdAndDelete({ _id: id }).then((obj) => {
        res.status(200).json({
            msg: `Sprint ${id} deleted`,
            obj: obj,
        });
    }).catch((exc) => {
        res.status(500).json({
            msg: `Sprint  ${id} couldn't be deleted`,
            obj: exc,
        })
    });
}

module.exports = { create, list, index, replace, update, destroy }
