const mongoose = require('mongoose');
const SocialNetworksEnum = require('../enums/socialNetwork.enum');

const schema = mongoose.Schema({
    _username: String,
    _apiKey: String,
    _socialNetwork: {
        type: String,
        enum: Object.keys(SocialNetworksEnum)
    },
});

class UserSocialNetwork {
    constructor(username, apiKey, socialNetwork) {
        this._username = username;
        this._apiKey = apiKey;
        this._socialNetwork = socialNetwork;
    }
    
    get username() {
        return this._username;
    }
    set username(username) {
        this._username=username;
    }

    get apiKey() {
        return this._apiKey;
    }
    set apiKey(apiKey) {
        this._apiKey=apiKey;
    }

    get socialNetwork() {
        return this._socialNetwork;
    }
    set socialNetwork(socialNetwork) {
        this._socialNetwork=socialNetwork;
    }
}

schema.loadClass(UserSocialNetwork);
module.exports = mongoose.model('UserSocialNetwork', schema);