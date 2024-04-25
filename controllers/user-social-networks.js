const express = require('express');

function create(req, res, next) {
    res.send('User Social Networks create');
}

function list(req, res, next) {
    res.send('User Social Networks list');
}

function index(req, res, next) {
    res.send(`User Social Networks index ${req.params.id}`);
}

function replace(req, res, next) {
    res.send(`User Social Networks replace ${req.params.id}`);
}

function update(req, res, next) {
    res.send(`User Social Networks update ${req.params.id}`);
}

function destroy(req, res, next) {
    res.send(`User Social Networks destroy ${req.params.id}`);
}

module.exports = { create, list, index, replace, update, destroy };