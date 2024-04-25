const express = require('express');

function create(req, res, next) {
    res.send('User Stories create');
}

function list(req, res, next) {
    res.send('User Stories list');
}

function index(req, res, next) {
    res.send(`User Stories index ${req.params.id}`);
}

function replace(req, res, next) {
    res.send(`User Stories replace ${req.params.id}`);
}

function update(req, res, next) {
    res.send(`User Stories update ${req.params.id}`);
}

function destroy(req, res, next) {
    res.send(`User Stories destroy ${req.params.id}`);
}

module.exports = { create, list, index, replace, update, destroy };