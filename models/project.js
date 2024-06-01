const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _projectName: String,
    _applicationDate: Date,
    _startDate: Date,
    _description: String,
    _projectManager: {
        type: mongoose.ObjectId,
        ref: 'User',
    },
    _productOwner: {
        type: mongoose.ObjectId,
        ref: 'User',
    },
    _developmentTeam: [{
        type: mongoose.ObjectId,
        ref: 'User',
    }],
    _dashboard: {
        type: mongoose.ObjectId,
        ref: 'Dashboard',
    },
});

class Project {
    constructor(projectName, applicationDate, startDate, description, projectManager, productOwner, developmentTeam, dashboard) {
        this._projectName = projectName;
        this._applicationDate = applicationDate;
        this._startDate = startDate;
        this._description = description;
        this._projectManager = projectManager;
        this._productOwner = productOwner;
        this._developmentTeam = developmentTeam;
        this._dashboard = dashboard;
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

    get projectManager() {
        return this._projectManager;
    }
    set projectManager(projectManager) {
        console.log("PROJECT MANAGER", projectManager);
        this._projectManager = projectManager;
    }

    get productOwner() {
        return this._productOwner;
    }
    set productOwner(productOwner) {
        this._productOwner = productOwner;
    }

    get developmentTeam() {
        return this._developmentTeam;
    }
    set developmentTeam(developmentTeam) {
        this._developmentTeam = developmentTeam;
    }

    get dashboard() {
        return this._dashboard;
    }
    set dashboard(dashboard) {
        this._dashboard = dashboard;
    }
}

schema.loadClass(Project);
module.exports = mongoose.model('Project', schema);