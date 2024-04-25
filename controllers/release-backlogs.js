const express = require('express');

function create(req, res, next) {
    res.send('Release Backlogs create');
}

function list(req, res, next) {
    res.send('Release Backlogs list');
}

function index(req, res, next) {
    res.send(`Release Backlogs index ${req.params.id}`);
}

function replace(req, res, next) {
    res.send(`Release Backlogs replace ${req.params.id}`);
}

function update(req, res, next) {
    res.send(`Release Backlogs update ${req.params.id}`);
}

function destroy(req, res, next) {
    res.send(`Release Backlogs destroy ${req.params.id}`);
}

module.exports = { create, list, index, replace, update, destroy };