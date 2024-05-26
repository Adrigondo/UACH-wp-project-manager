const mongoose = require('mongoose');
const SkillRankEnum = require('../enums/skillRank.enum');

const schema = mongoose.Schema({
    _description: String,
    _rank: {
        type: String,
        enum: Object.keys(SkillRankEnum),
        default: SkillRankEnum.JUNIOR,
    },
});

class DeveloperSkill {
    constructor(description, rank) {
        this._description = description;
        this._rank = rank;
    }
    
    get description() {
        return this._description;
    }
    set description(description) {
        this._description=description;
    }

    get rank() {
        return this._rank;
    }
    set rank(rank) {
        this._rank=rank;
    }
}

schema.loadClass(DeveloperSkill);
module.exports = mongoose.model('DeveloperSkill', schema);