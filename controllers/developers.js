const express = require('express');
const mongoose = require('mongoose');
const Developer = require('../models/users/developer');
const { defineAbilityFor } = require('../utilities/permissions');

async function create(req, res, next) {
    const {
        name, lastName, birth, curp, rfc, address, skills: skillsArray, userId
    } = req.body;
    const skills = skillsArray ? skillsArray.map((id) => {
        return new mongoose.Types.ObjectId(id);
    }) : [];

    const developer = new Developer({ name, lastName, birth, curp, rfc, address, skills, userId });

    const currentUser = req.auth.data.user;
    const ability = await defineAbilityFor(currentUser);

    if (ability.cannot('CREATE', 'Developer')) {
        res.status(403).json({
            msg: "Developer couldn't be created",
            obj: {},
        });
        return;
    }

    developer.save().then((obj) => {
        res.status(200).json({
            msg: 'Developer correctly created',
            obj: obj,
        });
    }).catch((exc) => {
        res.status(500).json({
            msg: "Developer couldn't be created",
            obj: exc,
        })
    });
}

async function list(req, res, next) {
    const currentUser = req.auth.data.user;
    const ability = await defineAbilityFor(currentUser);

    if (ability.cannot('LIST', 'Developer')) {
        res.status(403).json({
            msg: "Developer couldn't be listed",
            obj: {},
        });
        return;
    }

    Developer.find().populate("_userId").then((obj) => {
        res.status(200).json({
            msg: 'Developers list',
            obj: obj,
        });
    }).catch((exc) => {
        res.status(500).json({
            msg: "Developer couldn't be listed",
            obj: exc,
        })
    });
}

async function index(req, res, next) {
    const { id } = req.params;

    const currentUser = req.auth.data.user;
    const ability = await defineAbilityFor(currentUser);

    if (ability.cannot('READ', 'Developer')) {
        res.status(403).json({
            msg: "Developer couldn't be readed",
            obj: {},
        });
        return;
    }

    Developer.findOne({ _id: id }).populate("_userId").then((obj) => {
        res.status(200).json({
            msg: `Developer ${id}`,
            obj: obj,
        });
    }).catch((exc) => {
        res.status(500).json({
            msg: `Developer  ${id} couldn't be recovered`,
            obj: exc,
        })
    });
}

async function replace(req, res, next) {
    const { id } = req.params;
    const {
        name, lastName, birth, curp, rfc, address, skills, userId
    } = {
        name: req.body.name || "",
        lastName: req.body.lastName || "",
        birth: req.body.birth || "",
        curp: req.body.curp || "",
        rfc: req.body.rfc || "",
        address: req.body.address || "",
        userId: req.body.userId || null,
        skills: req.body.skills ? req.body.skills.map((id) => {
            return new mongoose.Types.ObjectId(id);
        }) : [],
    }

    const developer = new Object({
        _name: name,
        _lastName: lastName,
        _birth: birth,
        _curp: curp,
        _rfc: rfc,
        _address: address,
        _userId: userId,
        _skills: skills,
    });

    const currentUser = req.auth.data.user;
    const ability = await defineAbilityFor(currentUser);

    if (ability.cannot('REPLACE', 'Developer')) {
        res.status(403).json({
            msg: "Developer couldn't be replaced",
            obj: {},
        });
        return;
    }

    Developer.findByIdAndUpdate(id, developer, { new: true }).then((obj) => {
        res.status(200).json({
            msg: `Developer ${id} replaced`,
            obj: obj,
        });
    }).catch((exc) => {
        res.status(500).json({
            msg: `Developer  ${obj.id} couldn't be replaced`,
            obj: exc,
        })
    });
}

async function update(req, res, next) {
    const { id } = req.params;
    const {
        name, lastName, birth, curp, rfc, address, skills, userId
    } = {
        name: req.body.name || undefined,
        lastName: req.body.lastName || undefined,
        birth: req.body.birth || undefined,
        curp: req.body.curp || undefined,
        rfc: req.body.rfc || undefined,
        address: req.body.address || undefined,
        userId: req.body.userId || undefined,
        skills: req.body.skills ? req.body.skills.map((id) => {
            return new mongoose.Types.ObjectId(id);
        }) : undefined,
    }

    const developer = new Object({
        _name: name,
        _lastName: lastName,
        _birth: birth,
        _curp: curp,
        _rfc: rfc,
        _address: address,
        _userId: userId,
        _skills: skills,
    });

    const currentUser = req.auth.data.user;
    const ability = await defineAbilityFor(currentUser);

    if (ability.cannot('UPDATE', 'Developer')) {
        res.status(403).json({
            msg: "Developer couldn't be updated",
            obj: {},
        });
        return;
    }

    Developer.findByIdAndUpdate(id, developer, { new: true }).then((obj) => {
        res.status(200).json({
            msg: `Developer ${id} updated`,
            obj: obj,
        });
    }).catch((exc) => {
        res.status(500).json({
            msg: `Developer  ${id} couldn't be updated`,
            obj: exc,
        })
    });
}

async function destroy(req, res, next) {
    const { id } = req.params;

    const currentUser = req.auth.data.user;
    const ability = await defineAbilityFor(currentUser);

    if (ability.cannot('DELETE', 'Developer')) {
        res.status(403).json({
            msg: "Developer couldn't be deleted",
            obj: {},
        });
        return;
    }

    Developer.findByIdAndDelete({ _id: id }).then((obj) => {
        res.status(200).json({
            msg: `Developer ${id} deleted`,
            obj: obj,
        });
    }).catch((exc) => {
        res.status(500).json({
            msg: `Developer  ${id} couldn't be deleted`,
            obj: exc,
        });
    });
}

module.exports = { create, list, index, replace, update, destroy }