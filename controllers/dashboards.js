const express = require('express');

function create(req, res, next) {
    res.send('Dashboards create');
}

function list(req, res, next) {
    res.send('Dashboards list');
}

function index(req, res, next) {
    res.send(`Dashboards index ${req.params.id}`);
}

function replace(req, res, next) {
    res.send(`Dashboards replace ${req.params.id}`);
}

function update(req, res, next) {
    res.send(`Dashboards update ${req.params.id}`);
}

function destroy(req, res, next) {
    res.send(`Dashboards destroy ${req.params.id}`);
}

module.exports = { create, list, index, replace, update, destroy };