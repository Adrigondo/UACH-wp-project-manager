const mongoose = require('mongoose');
const Sprint = require('./sprint');

const schema = mongoose.Schema({
    _sprints: Sprint,
    _version: String,
    _endDate: Date,
});

class ReleaseBacklog {
    constructor(sprints, version, endDate) {
        this._sprints = sprints;
        this._version = version;
        this._endDate = endDate;
    }

    get sprints() {
        return this._sprints;
    }
    set sprints(sprints) {
        this._sprints = sprints;
    }

    get version() {
        return this._version;
    }
    set version(version) {
        this._version = version;
    }

    get endDate() {
        return this._endDate;
    }
    set endDate(endDate) {
        this._endDate = endDate;
    }

}

schema.loadClass(ReleaseBacklog);
