const mongoose = require('mongoose')

const spellSchema = mongoose.Schema({
    name: {
        type: String
    },
    level: {
        type: Number
    },
    castingtime: {
        type: String
    },
    duration: {
        type: String
    },
    distance: {
        type: String
    },
    attack: {
        type: String
    },
    school: {
        type: String
    },
    effect: {
        type: String
    },
    components: [
        {
            type: String
        }
    ],
    description: {
        type: String
    }
})

const Spell = mongoose.model("Spell", spellSchema)
module.exports = Spell