const express = require('express');

function create(req, res, next) {
    res.send('Sprints create');
}

function list(req, res, next) {
    res.send('Sprints list');
}

function index(req, res, next) {
    res.send(`Sprints index ${req.params.id}`);
}

function replace(req, res, next) {
    res.send(`Sprints replace ${req.params.id}`);
}

function update(req, res, next) {
    res.send(`Sprints update ${req.params.id}`);
}

function destroy(req, res, next) {
    res.send(`Sprints destroy ${req.params.id}`);
}

module.exports = { create, list, index, replace, update, destroy };