const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _startDate: Date,   
    _productBacklogColumn: {
        type: mongoose.ObjectId,
        ref: 'Column',
    },
    _releasesBacklogs: [{
        type: mongoose.ObjectId,
        ref: 'ReleaseBacklog',
    }],
});

class Dashboard {
    constructor(startDate, productBacklogColumn, releasesBacklogs) {
        this._startDate = startDate;
        this._productBacklogColumn = productBacklogColumn;
        this._releasesBacklogs = releasesBacklogs;
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

    get releasesBacklogs() {
        return this._releasesBacklogs;
    }
    set releasesBacklogs(releasesBacklogs) {
        this._releasesBacklogs = releasesBacklogs;
    }

}

schema.loadClass(Dashboard);
module.exports = mongoose.model('Dashboard', schema);