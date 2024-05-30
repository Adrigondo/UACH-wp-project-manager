const mongoose = require('mongoose');
const User = require('./users/user');

const schema = mongoose.Schema({
    _projectName: String,
    _applicationDate: Date,
    _startDate: Date,
    _description: String,
    _proyectManager: [{
        type: mongoose.ObjectId,
        ref: User.prototype.name,
    }],
    _proyectOwner: [{
        type: mongoose.ObjectId,
        ref: User.prototype.name,
    }],
    _developmentTeam: [{
        type: mongoose.ObjectId,
        ref: User.prototype.name,
    }],
});

class Project {
    constructor(projectName, applicationDate, startDate, description, proyectManager, proyectOwner, developmentTeam  ) {
        this._projectName = projectName;
        this._applicationDate = applicationDate;
        this._startDate = startDate;
        this._description = description;
        this._proyectManager = proyectManager;
        this._proyectOwner = proyectOwner;
        this._developmentTeam = developmentTeam;
    }
    get projectName() {
        return this._projectName;
    }
    set projectName(projectName) {
        this._projectName = projectName;
    }

    get applicationDate() {
        return this._applicationDate;
    }
    set applicationDate(applicationDate) {
        this._applicationDate = applicationDate;
    }

    get startDate() {
        return this._startDate;
    }
    set startDate(startDate) {
        this._startDate = startDate;
    }

    get description() {
        return this._description;
    }
    set description(description) {
        this._description = description;
    }

    get proyectManager() {
        return this._proyectManager;
    }
    set proyectManager(proyectManager) {
        this._proyectManager = proyectManager;
    }

    get proyectOwner() {
        return this._proyectOwner;
    }
    set proyectOwner(proyectOwner) {
        this._proyectOwner = proyectOwner;
    }

    get developmentTeam() {
        return this._developmentTeam;
    }
    set developmentTeam(developmentTeam) {
        this._developmentTeam = developmentTeam;
    }
}

schema.loadClass(Project);
module.exports = schema;