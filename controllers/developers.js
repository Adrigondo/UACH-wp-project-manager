const express = require('express');

function create(req, res, next) {
    res.send('Developers create');
}

function list(req, res, next) {
    res.send('Developers list');
}

function index(req, res, next) {
    res.send(`Developers index ${req.params.id}`);
}

function replace(req, res, next) {
    res.send(`Developers replace ${req.params.id}`);
}

function update(req, res, next) {
    res.send(`Developers update ${req.params.id}`);
}

function destroy(req, res, next) {
    res.send(`Developers destroy ${req.params.id}`);
}

module.exports = { create, list, index, replace, update, destroy };