const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _street: String,
    _number: String,
    _zip: String,
    _city: String,
    _state: String,
    _country: String,
});

class Address {
    constructor(street, number, zip, city, state, country) {
        this._street = street;
        this._number = number;
        this._zip = zip;
        this._city = city;
        this._state = state;
        this._country = country;
    }
    get street() {
        return this._street;
    }
    set street(street) {
        this._street = street;
    }

    get number() {
        return this._number;
    }
    set number(number) {
        this._number = number;
    }

    get zip() {
        return this._zip;
    }
    set zip(zip) {
        this._zip = zip;
    }

    get city() {
        return this._city;
    }
    set city(city) {
        this._city = city;
    }

    get state() {
        return this._state;
    }
    set state(state) {
        this._state = state;
    }

    get country() {
        return this._country;
    }
    set country(country) {
        this._country = country;
    }
}

schema.loadClass(Address);
module.exports = schema;