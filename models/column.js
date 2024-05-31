const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _userStories: [{
        type: mongoose.ObjectId,
        ref: 'UserStory'
    }],
});

class Column {
    constructor(userStories) {
        this._userStories = userStories;
    }

    get userStories() {
        return this._userStories;
    }
    set userStories(userStories) {
        this._userStories = userStories;
    }

}

schema.loadClass(Column);
module.exports = mongoose.model('Column', schema);