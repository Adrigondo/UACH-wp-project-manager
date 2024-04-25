const express = require('express');

function create(req, res, next) {
    res.send('Projects create');
}

function list(req, res, next) {
    res.send('Projects list');
}

function index(req, res, next) {
    res.send(`Projects index ${req.params.id}`);
}

function replace(req, res, next) {
    res.send(`Projects replace ${req.params.id}`);
}

function update(req, res, next) {
    res.send(`Projects update ${req.params.id}`);
}

function destroy(req, res, next) {
    res.send(`Projects destroy ${req.params.id}`);
}

module.exports = { create, list, index, replace, update, destroy };