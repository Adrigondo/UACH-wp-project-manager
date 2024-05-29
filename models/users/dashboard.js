const mongoose = require('mongoose');
const Proyecto = require('./project');
const Column = require('./project');
const Release = require('./releaseBacklog');

const schema = mongoose.Schema({
    _project: Proyecto,
    _startDate: Date,
    _productBacklogColumn: Column,
    _releasesBacklog: Release,
});

class Dashboard {
    constructor(project, startDate, productBacklogColumn, releasesBacklog) {
        this._project = project;
        this._startDate = startDate;
        this._productBacklogColumn = productBacklogColumn;
        this._releasesBacklog = releasesBacklog;
    }
    get project() {
        return this._project;
    }
    set project(project) {
        this._project = project;
    }

    get startDate() {
        return this._startDate;
    }
    set startDate(startDate) {
        this._startDate = startDate;
    }

    get productBacklogColumn() {
        return this._productBacklogColumn;
    }
    set productBacklogColumn(productBacklogColumn) {
        this._productBacklogColumn = productBacklogColumn;
    }

    get releasesBacklog() {
        return this._releasesBacklog;
    }
    set releasesBacklog(releasesBacklog) {
        this._releasesBacklog = releasesBacklog;
    }

}

schema.loadClass(Dashboard);
