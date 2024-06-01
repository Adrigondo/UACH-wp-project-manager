const express = require('express');
const Project = require('../models/project');
const mongoose = require('mongoose');

async function create(req, res, next) {
    const { projectName, applicationDate, startDate, description, proyectManager, proyectOwner, developmentTeam } = req.body;
   
    const project = new Project({ projectName, applicationDate, startDate, description, proyectManager, proyectOwner, developmentTeam});

    const currentUser = req.auth.data.user;
    const ability = await defineAbilityFor(currentUser);

    if (ability.cannot('CREATE', 'Project')) {
        res.status(403).json({
            msg: "Project couldn't be created",
            obj: {},
        });
        return;
    }

    project.save().then((obj) => {
        res.status(200).json({
            msg: 'Project correctly created',
            obj: obj,
        });
    }).catch((exc) => {
        res.status(500).json({
            msg: "Project couldn't be created",
            obj: exc,
        })
    });
}

async function list(req, res, next) {
    const currentUser = req.auth.data.user;
    const ability = await defineAbilityFor(currentUser);

    if (ability.cannot('LIST', 'Project')) {
        res.status(403).json({
            msg: "Project couldn't be listed",
            obj: {},
        });
        return;
    }

    Project.find().then((obj) => {
        res.status(200).json({
            msg: 'Project list',
            obj: obj,
        });
    }).catch((exc) => {
        console.error(exc)
        res.status(500).json({
            msg: "Project couldn't be listed",
            obj: exc,
        })
    });
}

async function index(req, res, next) {
    const { id } = req.params;
    const currentUser = req.auth.data.user;
    const ability = await defineAbilityFor(currentUser);

    if (ability.cannot('READ', 'Project')) {
        res.status(403).json({
            msg: "Project couldn't be readed",
            obj: {},
        });
        return;
    }

    Project.findOne({ _id: id }).then((obj) => {
        res.status(200).json({
            msg: `Project ${id}`,
            obj: obj,
        });
    }).catch((exc) => {
        res.status(500).json({
            msg: `Project  ${id} couldn't be recovered`,
            obj: exc,
        })
    });
}

async function replace(req, res, next) {
    const { id } = req.params;
    const { projectName, applicationDate, startDate, description, proyectManager, proyectOwner, developmentTeam } = {
        projectName: req.body.projectName || "",
        applicationDate: req.body.applicationDate || "",
        startDate: req.body.startDate || "",
        description: req.body.description || "",
        proyectManager: req.body.proyectManager || "",
        proyectOwner: req.body.proyectOwner || "",
        developmentTeam: req.body.developmentTeam || "",
    }

    const project = new Object({
        _projectName: projectName,
        _applicationDate: applicationDate,
        _startDate: startDate,
        _description: description,
        _proyectManager: proyectManager,
        _proyectOwner: proyectOwner,
        _developmentTeam: developmentTeam,
    });

    const currentUser = req.auth.data.user;
    const ability = await defineAbilityFor(currentUser);

    if (ability.cannot('REPLACE', 'Project')) {
        res.status(403).json({
            msg: "Project couldn't be replaced",
            obj: {},
        });
        return;
    }

    Project.findOneAndUpdate({ _id: id }, project, { new: true }).then((obj) => {
        res.status(200).json({
            msg: `Project ${obj.id} updated`,
            obj: obj,
        });
    }).catch((exc) => {
        res.status(500).json({
            msg: `Project  ${obj.id} couldn't be updated`,
            obj: exc,
        })
    });
}

async function update(req, res, next) {
    const { id } = req.params;
    const { projectName, applicationDate, startDate, description, proyectManager, proyectOwner, developmentTeam } = {
        projectName: req.body.projectName || undefined,
        applicationDate: req.body.applicationDate || undefined,
        startDate: req.body.startDate || undefined,
        description: req.body.description || undefined,
        proyectManager: req.body.proyectManager || undefined,
        proyectOwner: req.body.proyectOwner || undefined,
        developmentTeam: req.body.developmentTeam || undefined,
    }

    const project = new Object({
        projectName: projectName,
        _applicationDate: applicationDate,
        _startDate: startDate,
        _description: description,
        _proyectManager: proyectManager,
        _proyectOwner: proyectOwner,
        _developmentTeam: developmentTeam,
    });

    const currentUser = req.auth.data.user;
    const ability = await defineAbilityFor(currentUser);
    
    if (ability.cannot('UPDATE', 'Project')) {
        res.status(403).json({
            msg: "Project couldn't be updated",
            obj: {},
        });
        return;
    }

    Project.findOneAndUpdate({ _id: id }, project, { new: true }).then((obj) => {
        res.status(200).json({
            msg: `Project ${obj.id} updated`,
            obj: obj,
        });
    }).catch((exc) => {
        res.status(500).json({
            msg: `Project  ${obj.id} couldn't be updated`,
            obj: exc,
        })
    });
}

async function destroy(req, res, next) {
    const { id } = req.params;
    const currentUser = req.auth.data.user;
    const ability = await defineAbilityFor(currentUser);

    if (ability.cannot('REMOVE', 'Project')) {
        res.status(403).json({
            msg: "Project couldn't be deleted",
            obj: {},
        });
        return;
    }

    Project.findByIdAndDelete({ _id: id }).then((obj) => {
        res.status(200).json({
            msg: `Project ${id} deleted`,
            obj: obj,
        });
    }).catch((exc) => {
        res.status(500).json({
            msg: `Project  ${id} couldn't be deleted`,
            obj: exc,
        })
    });
}

module.exports = { create, list, index, replace, update, destroy }
