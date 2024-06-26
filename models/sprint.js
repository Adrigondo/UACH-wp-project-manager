const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _backlog: {
        type: mongoose.ObjectId,
        ref: 'Column',
    },
    _doing: {
        type: mongoose.ObjectId,
        ref: 'Column',
    },
    _done: {
        type: mongoose.ObjectId,
        ref: 'Column',
    },
    _testing: {
        type: mongoose.ObjectId,
        ref: 'Column',
    },
    _release: {
        type: mongoose.ObjectId,
        ref: 'Column',
    },
});

class Sprint {
    constructor(backlog, doing, done, testing, release) {
        this._backlog = backlog;
        this._doing = doing;
        this._done = done;
        this._testing = testing;
        this._release = release;
    }

    get backlog() {
        return this._backlog;
    }
    set backlog(backlog) {
        this._backlog = backlog;
    }

    get doing() {
        return this._doing;
    }
    set doing(doing) {
        this._doing = doing;
    }

    get done() {
        return this._done;
    }
    set done(done) {
        this._done = done;
    }

    get testing() {
        return this._testing;
    }
    set testing(testing) {
        this._testing = testing;
    }

    get release() {
        return this._release;
    }
    set release(release) {
        this._release = release;
    }

}

schema.loadClass(Sprint);
module.exports = mongoose.model('Sprint', schema);