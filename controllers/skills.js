const express = require('express');
const Skill = require('../models/users/developerSkill');
const mongoose = require('mongoose');

async function create(req, res, next) {
    const { description, rank } = req.body;
  
    const skill = new Skill({ description, rank });

    const currentUser = req.auth.data.user;
    const ability = await defineAbilityFor(currentUser);

    if (ability.cannot('CREATE', 'Skill')) {
        res.status(403).json({
            msg: "Skill couldn't be created",
            obj: {},
        });
        return;
    }

    skill.save().then((obj) => {
        res.status(200).json({
            msg: 'Skill correctly created',
            obj: obj,
        });
    }).catch((exc) => {
        res.status(500).json({
            msg: "Skill couldn't be created",
            obj: exc,
        })
    });
}

async function list(req, res, next) {
    const currentUser = req.auth.data.user;
    const ability = await defineAbilityFor(currentUser);

    if (ability.cannot('LIST', 'Skill')) {
        res.status(403).json({
            msg: "Skill couldn't be listed",
            obj: {},
        });
        return;
    }

    Skill.find().then((obj) => {
        res.status(200).json({
            msg: 'Skill list',
            obj: obj,
        });
    }).catch((exc) => {
        console.error(exc)
        res.status(500).json({
            msg: "Skill couldn't be listed",
            obj: exc,
        })
    });
}

async function index(req, res, next) {
    const { id } = req.params;
    const currentUser = req.auth.data.user;
    const ability = await defineAbilityFor(currentUser);

    if (ability.cannot('READ', 'Skill')) {
        res.status(403).json({
            msg: "Skill couldn't be readed",
            obj: {},
        });
        return;
    }

    Skill.findOne({ _id: id }).then((obj) => {
        res.status(200).json({
            msg: `Skill ${id}`,
            obj: obj,
        });
    }).catch((exc) => {
        res.status(500).json({
            msg: `Skill  ${id} couldn't be recovered`,
            obj: exc,
        })
    });
}

async function replace(req, res, next) {
    const { id } = req.params;
    const { description, rank } = {
        description: req.body.description || "",
        rank: req.body.rank || "",
    }

    const skill = new Object({
        _description: description,
        _rank: rank,
    });

    const currentUser = req.auth.data.user;
    const ability = await defineAbilityFor(currentUser);

    if (ability.cannot('REPLACE', 'Slikk')) {
        res.status(403).json({
            msg: "Skill couldn't be replaced",
            obj: {},
        });
        return;
    }

    Skill.findOneAndUpdate({ _id: id }, skill, { new: true }).then((obj) => {
        res.status(200).json({
            msg: `Skill ${obj.id} updated`,
            obj: obj,
        });
    }).catch((exc) => {
        res.status(500).json({
            msg: `Skill  ${obj.id} couldn't be updated`,
            obj: exc,
        })
    });
}

async function update(req, res, next) {
    const { id } = req.params;
    const { description, rank } = {
        description: req.body.description || undefined,
        rank: req.body.rank || undefined,
    }

    const skill = new Object({
        _description: description,
        _rank: rank,
    });

    const currentUser = req.auth.data.user;
    const ability = await defineAbilityFor(currentUser);
    
    if (ability.cannot('UPDATE', 'Skill')) {
        res.status(403).json({
            msg: "Skill couldn't be updated",
            obj: {},
        });
        return;
    }

    Skill.findOneAndUpdate({ _id: id }, skill, { new: true }).then((obj) => {
        res.status(200).json({
            msg: `Skill ${obj.id} updated`,
            obj: obj,
        });
    }).catch((exc) => {
        res.status(500).json({
            msg: `Skill  ${obj.id} couldn't be updated`,
            obj: exc,
        })
    });
}

async function destroy(req, res, next) {
    const { id } = req.params;
    const currentUser = req.auth.data.user;
    const ability = await defineAbilityFor(currentUser);

    if (ability.cannot('DELETE', 'Skill')) {
        res.status(403).json({
            msg: "Skill couldn't be deleted",
            obj: {},
        });
        return;
    }

    Skill.findByIdAndDelete({ _id: id }).then((obj) => {
        res.status(200).json({
            msg: `Skill ${id} deleted`,
            obj: obj,
        });
    }).catch((exc) => {
        res.status(500).json({
            msg: `Skill  ${id} couldn't be deleted`,
            obj: exc,
        })
    });
}

module.exports = { create, list, index, replace, update, destroy }
