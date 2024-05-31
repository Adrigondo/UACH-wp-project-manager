const mongoose = require('mongoose');
const AddressSchema = require('./address.schema');

const schema = mongoose.Schema({
    _name: String,
    _lastName: String,
    _birth: String,
    _curp: String,
    _rfc: String,
    _address: AddressSchema,
    _skills: [{
        type: mongoose.ObjectId,
        ref: 'DeveloperSkill'
    }],
});

class Developer {
    constructor(name, lastName, birth, curp, rfc, address, skills,) {
        this._name = name;
        this._lastName = lastName;
        this._birth = birth;
        this._curp = curp;
        this._rfc = rfc;
        this._address = address;
        this._skills = skills;
    }
    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
    }

    get lastName() {
        return this._lastName;
    }
    set lastName(lastName) {
        this._lastName = lastName;
    }

    get birth() {
        return this._birth;
    }
    set birth(birth) {
        this._birth = birth;
    }

    get curp() {
        return this._curp;
    }
    set curp(curp) {
        this._curp = curp;
    }

    get rfc() {
        return this._rfc;
    }
    set rfc(rfc) {
        this._rfc = rfc;
    }

    get address() {
        return this._address;
    }
    set address(address) {
        this._address = address;
    }

    get skills() {
        return this._skills;
    }
    set skills(skills) {
        this._skills = skills;
    }
}

schema.loadClass(Developer);
module.exports = schema;