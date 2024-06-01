class SanitiziedUser {
    constructor({ _username, _lastName, _email, _roles }) {
        this._username = _username;
        this._email = _email;
        this._roles = _roles;
    }

    get username() {
        return this._username;
    }
    set username(username) {
        this.__username = _username;
    }

    get email() {
        return this._email;
    }
    set email(email) {
        this._email=email;
    }

    get roles() {
        return this._roles;
    }
    set roles(roles) {
        this._roles=roles;
    }

    get socialNetworks() {
        return this._socialNetworks;
    }
    set socialNetworks(socialNetworks) {
        this._socialNetworks = socialNetworks;
    }

    get developerData() {
        return this._developerData;
    }
    set developerData(developerData) {
        this._developerData = developerData;
    }
}
module.exports = SanitiziedUser;