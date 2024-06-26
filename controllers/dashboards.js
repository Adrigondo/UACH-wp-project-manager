const express = require('express');
const Dashboard = require('../models/dashboard');
const { defineAbilityFor } = require('../utilities/permissions');

async function create(req, res, next) {
    const { startDate, productBacklogColumn, releasesBacklogs } = req.body;

    const dashboard = new Dashboard({ startDate, productBacklogColumn, releasesBacklogs });

    const currentUser = req.auth.data.user;
    const ability = await defineAbilityFor(currentUser);

    if (ability.cannot('CREATE', 'Dashboard')) {
        res.status(403).json({
            msg: "Dashboard couldn't be created",
            obj: {},
        });
        return;
    }

    dashboard.save().then((obj) => {
        res.status(200).json({
            msg: 'Dashboard correctly created',
            obj: obj,
        });
    }).catch((exc) => {
        res.status(500).json({
            msg: "Dashboard couldn't be created",
            obj: exc,
        })
    });
}

async function list(req, res, next) {
    const currentUser = req.auth.data.user;
    const ability = await defineAbilityFor(currentUser);

    if (ability.cannot('LIST', 'Dashboard')) {
        res.status(403).json({
            msg: "Dashboard couldn't be listed",
            obj: {},
        });
        return;
    }

    Dashboard.find().populate("_productBacklogColumn").populate("_releasesBacklogs").then((obj) => {
        res.status(200).json({
            msg: 'Dashboard list',
            obj: obj,
        });
    }).catch((exc) => {
        console.error(exc)
        res.status(500).json({
            msg: "Dashboard couldn't be listed",
            obj: exc,
        })
    });
}

async function index(req, res, next) {
    const { id } = req.params;
    const currentUser = req.auth.data.user;
    const ability = await defineAbilityFor(currentUser);

    if (ability.cannot('READ', 'Dashboard')) {
        res.status(403).json({
            msg: "Dashboard couldn't be readed",
            obj: {},
        });
        return;
    }

    Dashboard.findOne({ _id: id }).then((obj) => {
        res.status(200).json({
            msg: `Dashboard ${id}`,
            obj: obj,
        });
    }).catch((exc) => {
        res.status(500).json({
            msg: `Dashboard  ${id} couldn't be recovered`,
            obj: exc,
        })
    });
}

async function replace(req, res, next) {
    const { id } = req.params;
    const { startDate, productBacklogColumn, releasesBacklogs } = {
        startDate: req.body.startDate || "",
        productBacklogColumn: req.body.releasesBacklogs || "",
    }

    const dashboard = new Object({
        _startDate: startDate,
        _productBacklogColumn: productBacklogColumn,
        _releasesBacklogs: releasesBacklogs,
    });

    const currentUser = req.auth.data.user;
    const ability = await defineAbilityFor(currentUser);

    if (ability.cannot('REPLACE', 'Dashboard')) {
        res.status(403).json({
            msg: "Dashboard couldn't be replaced",
            obj: {},
        });
        return;
    }

    Dashboard.findOneAndUpdate({ _id: id }, dashboard, { new: true }).then((obj) => {
        res.status(200).json({
            msg: `Dashboard ${obj.id} updated`,
            obj: obj,
        });
    }).catch((exc) => {
        res.status(500).json({
            msg: `Dashboard  ${obj.id} couldn't be updated`,
            obj: exc,
        })
    });
}

async function update(req, res, next) {
    const { id } = req.params;
    const { startDate, productBacklogColumn, releasesBacklogs } = {
        startDate: req.body.startDate || undefined,
        productBacklogColumn: req.body.productBacklogColumn || undefined,
        releasesBacklogs: req.body.releasesBacklogs || undefined,
    }

    const dashboard = new Object({
        _startDate: startDate,
        _productBacklogColumn: productBacklogColumn,
        _releasesBacklogs: releasesBacklogs,
    });

    const currentUser = req.auth.data.user;
    const ability = await defineAbilityFor(currentUser);
    
    if (ability.cannot('UPDATE', 'Dashboard')) {
        res.status(403).json({
            msg: "Dashboard couldn't be updated",
            obj: {},
        });
        return;
    }

    Dashboard.findOneAndUpdate({ _id: id }, dashboard, { new: true }).then((obj) => {
        res.status(200).json({
            msg: `Dashboard ${obj.id} updated`,
            obj: obj,
        });
    }).catch((exc) => {
        res.status(500).json({
            msg: `Dashboard  ${obj.id} couldn't be updated`,
            obj: exc,
        })
    });
}

async function destroy(req, res, next) {
    const { id } = req.params;
    const currentUser = req.auth.data.user;
    const ability = await defineAbilityFor(currentUser);

    if (ability.cannot('REMOVE', 'Dashboard')) {
        res.status(403).json({
            msg: "Dashboard couldn't be deleted",
            obj: {},
        });
        return;
    }

    Dashboard.findByIdAndDelete({ _id: id }).then((obj) => {
        res.status(200).json({
            msg: `Dashboard ${id} deleted`,
            obj: obj,
        });
    }).catch((exc) => {
        res.status(500).json({
            msg: `Dashboard  ${id} couldn't be deleted`,
            obj: exc,
        })
    });
}

module.exports = { create, list, index, replace, update, destroy }
