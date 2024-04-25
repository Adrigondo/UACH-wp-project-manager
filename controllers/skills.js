const express = require('express');

function create(req, res, next) {
    res.send('Skills create');
}

function list(req, res, next) {
    res.send('Skills list');
}

function index(req, res, next) {
    res.send(`Skills index ${req.params.id}`);
}

function replace(req, res, next) {
    res.send(`Skills replace ${req.params.id}`);
}

function update(req, res, next) {
    res.send(`Skills update ${req.params.id}`);
}

function destroy(req, res, next) {
    res.send(`Skills destroy ${req.params.id}`);
}

module.exports = { create, list, index, replace, update, destroy };