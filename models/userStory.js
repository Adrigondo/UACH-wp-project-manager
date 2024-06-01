const mongoose = require('mongoose');
const PrioritiesEnum = require('./enums/priorities.enum');

const schema = new mongoose.Schema({
    _title: String,
    _narrativeHow: String,
    _narrativeWant: String,
    _narrativeLike: String,
    _priority: {
        type: String,
        enum: Object.keys(PrioritiesEnum),
        default: PrioritiesEnum.MUST,
    },
    _size: Number,
    _criteriaContext: String,
    _criteriaWhen: String,
    _criteriaThen: String,
    _approved: Boolean,
});

class UserStory {
    constructor(title, narrativeHow, narrativeWant, narrativeLike, priority, size, criteriaContext, criteriaWhen, criteriaThen, approved) {
        this._title = title;
        this._narrativeHow = narrativeHow;
        this._narrativeWant = narrativeWant;
        this._narrativeLike = narrativeLike;
        this._priority = priority;
        this._size = size;
        this._criteriaContext = criteriaContext;
        this._criteriaWhen = criteriaWhen;
        this._criteriaThen = criteriaThen;
        this._approved = approved;
    }

    get title() {
        return this._title;
    }
    set title(title) {
        this._title = title;
    }

    get narrativeHow() {
        return this._narrativeHow;
    }
    set narrativeHow(narrativeHow) {
        this._narrativeHow = narrativeHow;
    }

    get narrativeWant() {
        return this._narrativeWant;
    }
    set narrativeWant(narrativeWant) {
        this._narrativeWant = narrativeWant;
    }

    get narrativeLike() {
        return this._narrativeLike;
    }
    set narrativeLike(narrativeLike) {
        this._narrativeLike = narrativeLike;
    }

    get priority() {
        return this._priority;
    }
    set priority(priority) {
        this._priority = priority;
    }

    get size() {
        return this._size;
    }
    set size(size) {
        this._size = size;
    }

    get criteriaContext() {
        return this._criteriaContext;
    }
    set criteriaContext(criteriaContext) {
        this._criteriaContext = criteriaContext;
    }

    get criteriaWhen() {
        return this._criteriaWhen;
    }
    set criteriaWhen(criteriaWhen) {
        this._criteriaWhen = criteriaWhen;
    }

    get criteriaThen() {
        return this._criteriaThen;
    }
    set criteriaThen(criteriaThen) {
        this._criteriaThen = criteriaThen;
    }

    get approved() {
        return this._approved;
    }
    set approved(approved) {
        this._approved = approved;
    }
}

schema.loadClass(UserStory);
module.exports = mongoose.model('UserStory', schema);
