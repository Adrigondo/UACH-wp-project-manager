const express = require('express');
const ReleaseBacklog = require('../models/releaseBacklog');
const mongoose = require('mongoose');

async function create(req, res, next) {
    const { sprints, version, endDate } = req.body;

    const releaseBacklog = new ReleaseBacklog({ sprints, version, endDate });

    const currentUser = req.auth.data.user;
    const ability = await defineAbilityFor(currentUser);

    if (ability.cannot('CREATE', 'ReleaseBacklog')) {
        res.status(403).json({
            msg: "Release backlog couldn't be created",
            obj: {},
        });
        return;
    }

    releaseBacklog.save().then((obj) => {
        res.status(200).json({
            msg: 'Release backlog correctly created',
            obj: obj,
        });
    }).catch((exc) => {
        res.status(500).json({
            msg: "Release backlog couldn't be created",
            obj: exc,
        })
    });
}

async function list(req, res, next) {
    const currentUser = req.auth.data.user;
    const ability = await defineAbilityFor(currentUser);

    if (ability.cannot('LIST', 'ReleaseBacklog')) {
        res.status(403).json({
            msg: "Release backlog couldn't be listed",
            obj: {},
        });
        return;
    }

    ReleaseBacklog.find().then((obj) => {
        res.status(200).json({
            msg: 'Release backlog list',
            obj: obj,
        });
    }).catch((exc) => {
        console.error(exc)
        res.status(500).json({
            msg: "Release backlog couldn't be listed",
            obj: exc,
        })
    });
}

async function index(req, res, next) {
    const { id } = req.params;
    const currentUser = req.auth.data.user;
    const ability = await defineAbilityFor(currentUser);

    if (ability.cannot('READ', 'ReleaseBacklog')) {
        res.status(403).json({
            msg: "Release backlog couldn't be readed",
            obj: {},
        });
        return;
    }

    ReleaseBacklog.findOne({ _id: id }).then((obj) => {
        res.status(200).json({
            msg: `Release backlog ${id}`,
            obj: obj,
        });
    }).catch((exc) => {
        res.status(500).json({
            msg: `Release backlog  ${id} couldn't be recovered`,
            obj: exc,
        })
    });
}

async function replace(req, res, next) {
    const { id } = req.params;
    const { sprints, version, endDate } = {
        sprints: req.body.sprints || "",
        version: req.body.version || "",
        endDate: req.body.endDate || "",
    }

    const releaseBacklog = new Object({
        _sprints: sprints,
        _version: version,
        _endDate: endDate,
    });

    const currentUser = req.auth.data.user;
    const ability = await defineAbilityFor(currentUser);

    if (ability.cannot('REPLACE', 'ReleaseBacklog')) {
        res.status(403).json({
            msg: "Release backlog couldn't be replaced",
            obj: {},
        });
        return;
    }

    ReleaseBacklog.findOneAndUpdate({ _id: id }, releaseBacklog, { new: true }).then((obj) => {
        res.status(200).json({
            msg: `Release backlog ${obj.id} updated`,
            obj: obj,
        });
    }).catch((exc) => {
        res.status(500).json({
            msg: `Release backlog  ${obj.id} couldn't be updated`,
            obj: exc,
        })
    });
}

async function update(req, res, next) {
    const { id } = req.params;
    const { sprints, version, endDate } = {
        sprints: req.body.sprints || undefined,
        version: req.body.version || undefined,
        endDate: req.body.endDate || undefined,
    }

    const releaseBacklog = new Object({
        _sprints: sprints,
        _version: version,
        _endDate: endDate,
    });

    const currentUser = req.auth.data.user;
    const ability = await defineAbilityFor(currentUser);
    
    if (ability.cannot('UPDATE', 'ReleaseBacklog')) {
        res.status(403).json({
            msg: "Release backlog couldn't be updated",
            obj: {},
        });
        return;
    }

    ReleaseBacklog.findOneAndUpdate({ _id: id }, releaseBacklog, { new: true }).then((obj) => {
        res.status(200).json({
            msg: `Release backlog ${obj.id} updated`,
            obj: obj,
        });
    }).catch((exc) => {
        res.status(500).json({
            msg: `Release backlog  ${obj.id} couldn't be updated`,
            obj: exc,
        })
    });
}

async function destroy(req, res, next) {
    const { id } = req.params;
    const currentUser = req.auth.data.user;
    const ability = await defineAbilityFor(currentUser);

    if (ability.cannot('REMOVE', 'ReleaseBacklog')) {
        res.status(403).json({
            msg: "Release backlog couldn't be deleted",
            obj: {},
        });
        return;
    }

    ReleaseBacklog.findByIdAndDelete({ _id: id }).then((obj) => {
        res.status(200).json({
            msg: `Release backlog ${id} deleted`,
            obj: obj,
        });
    }).catch((exc) => {
        res.status(500).json({
            msg: `Release backlog  ${id} couldn't be deleted`,
            obj: exc,
        })
    });
}

module.exports = { create, list, index, replace, update, destroy }
