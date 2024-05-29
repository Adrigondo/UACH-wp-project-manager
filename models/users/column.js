const mongoose = require('mongoose');
const UserStory = require('./userStory');

const schema = mongoose.Schema({
    _userStories: UserStory,
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
