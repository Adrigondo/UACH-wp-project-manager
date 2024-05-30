const express = require('express');
const Column = require('../models/users/column');

async function create(req, res, next) {
    const { userStories} = req.body;

    //Lista de User Story

    const column = new Column({ userStories});

    const currentUser = req.auth.data.user;
    const ability = await defineAbilityFor(currentUser);
    
    if (ability.cannot('CREATE', 'Column')) {
        res.status(403).json({
            msg: " couldn't be created",
            obj: {},
        });
        return;
    }

    column.save().then((obj) => {
        res.status(200).json({
            msg: 'Column correctly created',
            obj: obj,
        });
    }).catch((exc) => {
        res.status(500).json({
            msg: "Column couldn't be created",
            obj: exc,
        })
    });
}


async function list(req, res, next) {
    const currentUser = req.auth.data.user;
    const ability = await defineAbilityFor(currentUser);

    if (ability.cannot('LIST', 'Column')) {
        res.status(403).json({
            msg: " couldn't be listed",
            obj: {},
        });
        return;
    }

    Column.find().then((obj) => {
        res.status(200).json({
            msg: 'Column list',
            obj: obj,
        });
    }).catch((exc) => {
        console.error(exc)
        res.status(500).json({
            msg: "Column couldn't be listed",
            obj: exc,
        })
    });

}


async function index(req, res, next) {
    const { id } = req.params;
    const currentUser = req.auth.data.user;
    

    if (ability.cannot('READ', '')) {
        res.status(403).json({
            msg: " couldn't be readed",
            obj: {},
        });
        return;
    }

    Column.findOne({ _id: id }).then((obj) => {
        res.status(200).json({
            msg: `Column ${id}`,
            obj: obj,
        });
    }).catch((exc) => {
        res.status(500).json({
            msg: `Column  ${id} couldn't be recovered`,
            obj: exc,
        })
    });
}


async function replace(req, res, next) {
    const { id } = req.params;
    const { userStories } = {
        userStories: req.body.userStories || "",
    }

    const column = new Object({
        _userStories: userStories,
    });

    const currentUser = req.auth.data.user;
    const ability = await defineAbilityFor(currentUser);

    if (ability.cannot('REPLACE', 'Column')) {
        res.status(403).json({
            msg: "Column couldn't be replaced",
            obj: {},
        });
        return;
    }

    Column.findOneAndUpdate({ _id: id }, column, { new: true }).then((obj) => {
        res.status(200).json({
            msg: `Column ${obj.id} updated`,
            obj: obj,
        });
    }).catch((exc) => {
        res.status(500).json({
            msg: `Column  ${obj.id} couldn't be updated`,
            obj: exc,
        })
    });
}


async function update(req, res, next) {
    const { id } = req.params;
    const { userStories } = {
        userStories: req.body.userStories || undefined,
    }

    const column = new Object({
        _userStories: userStories,
    });

    const currentUser = req.auth.data.user;
    const ability = await defineAbilityFor(currentUser);
    
    if (ability.cannot('UPDATE', 'Column')) {
        res.status(403).json({
            msg: "Column couldn't be updated",
            obj: {},
        });
        return;
    }

    Column.findOneAndUpdate({ _id: id }, column, { new: true }).then((obj) => {
        res.status(200).json({
            msg: `Column ${obj.id} updated`,
            obj: obj,
        });
    }).catch((exc) => {
        res.status(500).json({
            msg: `Column  ${obj.id} couldn't be updated`,
            obj: exc,
        })
    });
}

async function destroy(req, res, next) {
    const { id } = req.params;
    const currentUser = req.auth.data.user;
    const ability = await defineAbilityFor(currentUser);

    if (ability.cannot('DELETE', 'Column')) {
        res.status(403).json({
            msg: "Column couldn't be deleted",
            obj: {},
        });
        return;
    }

    Column.findByIdAndDelete({ _id: id }).then((obj) => {
        res.status(200).json({
            msg: `Column ${id} deleted`,
            obj: obj,
        });
    }).catch((exc) => {
        res.status(500).json({
            msg: `Column  ${id} couldn't be deleted`,
            obj: exc,
        })
    });
}


module.exports = { create, list, index, replace, update, destroy };
