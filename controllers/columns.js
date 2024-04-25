const express = require('express');

function create(req, res, next) {
    res.send('Columns create');
}

function list(req, res, next) {
    res.send('Columns list');
}

function index(req, res, next) {
    res.send(`Columns index ${req.params.id}`);
}

function replace(req, res, next) {
    res.send(`Columns replace ${req.params.id}`);
}

function update(req, res, next) {
    res.send(`Columns update ${req.params.id}`);
}

function destroy(req, res, next) {
    res.send(`Columns destroy ${req.params.id}`);
}

module.exports = { create, list, index, replace, update, destroy };