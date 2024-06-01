const express = require('express');
const DeveloperSkill = require('../models/users/developerSkill');
const { defineAbilityFor } = require('../utilities/permissions');

async function create(req, res, next) {
    const { description, rank } = req.body;
  
    const developerSkill = new DeveloperSkill({ description, rank });

    const currentUser = req.auth.data.user;
    const ability = await defineAbilityFor(currentUser);

    if (ability.cannot('CREATE', 'DeveloperSkill')) {
        res.status(403).json({
            msg: "Skill couldn't be created",
            obj: {},
        });
        return;
    }

    developerSkill.save().then((obj) => {
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

    if (ability.cannot('LIST', 'DeveloperSkill')) {
        res.status(403).json({
            msg: "Skill couldn't be listed",
            obj: {},
        });
        return;
    }

    DeveloperSkill.find().then((obj) => {
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

    if (ability.cannot('READ', 'DeveloperSkill')) {
        res.status(403).json({
            msg: "Skill couldn't be readed",
            obj: {},
        });
        return;
    }

    DeveloperSkill.findOne({ _id: id }).then((obj) => {
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

    if (ability.cannot('REPLACE', 'DeveloperSkill')) {
        res.status(403).json({
            msg: "Skill couldn't be replaced",
            obj: {},
        });
        return;
    }

    DeveloperSkill.findOneAndUpdate({ _id: id }, skill, { new: true }).then((obj) => {
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
    
    if (ability.cannot('UPDATE', 'DeveloperSkill')) {
        res.status(403).json({
            msg: "Skill couldn't be updated",
            obj: {},
        });
        return;
    }

    DeveloperSkill.findOneAndUpdate({ _id: id }, skill, { new: true }).then((obj) => {
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

    if (ability.cannot('REMOVE', 'DeveloperSkill')) {
        res.status(403).json({
            msg: "Skill couldn't be deleted",
            obj: {},
        });
        return;
    }

    DeveloperSkill.findByIdAndDelete({ _id: id }).then((obj) => {
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
