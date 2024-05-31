const mongoose = require('mongoose');
const {PermissionsEnum, HttpPermissionsEnum} = require('../enums/permissions.enum');

const schema = mongoose.Schema({
    _description: String,
    _type: {
        type: String,
        enum: [
            ...Object.keys(PermissionsEnum),
            ...Object.keys(HttpPermissionsEnum),
        ],
        default: PermissionsEnum.READ
    },
});

class Permission {
    constructor(description, type) {
        this._description = description;
        this._type = type;
    }

    get description() {
        return this._description;
    }
    set description(description) {
        this._description = description;
    }

    get type() {
        return this._type;
    }
    set type(type) {
        this._type = type;
    }

}

schema.loadClass(Permission);
module.exports = mongoose.model('Permission', schema);