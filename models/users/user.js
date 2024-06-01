const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _username: String,
    _email: String,
    _password: String,
    _salt: String,
    _roles: [{
        type: mongoose.ObjectId,
        ref: 'Role',
    }],
    _socialNetworks: [{
        type: mongoose.ObjectId,
        ref: 'UserSocialNetwork'
    }],
});

class User {
    constructor(username, email, password, salt, roles, socialNetworks) {
        this._username=username;
        this._email = email;
        this._password = password;
        this._salt = salt;
        this._roles = roles;
        this._socialNetworks = socialNetworks;
    }
    get username() {
        return this._username;
    }
    set username(username) {
        this._username = username;
    }

    get email() {
        return this._email;
    }
    set email(email) {
        this._email = email;
    }

    get password() {
        return this._password;
    }
    set password(password) {
        this._password = password;
    }

    get salt() {
        return this._salt;
    }
    set salt(salt) {
        this._salt = salt;
    }

    get roles() {
        return this._roles;
    }
    set roles(roles) {
        this._roles = roles;
    }

    get socialNetworks() {
        return this._socialNetworks;
    }
    set socialNetworks(socialNetworks) {
        this._socialNetworks = socialNetworks;
    }
}

schema.loadClass(User);
module.exports = mongoose.model('User', schema);