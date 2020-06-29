const mongoose = require('mongoose')

const skills = {
    ACROBATICS: 'acrobatics',
    ANIMAL_HANDLING: 'animal handling',
    ARCANA: 'arcana',
    ATHLETICS: 'athletics',
    DECEPTION: 'deception',
    HISTORY: 'history',
    INSIGHT: 'insight',
    INTIMIDATION: 'intimidation',
    INVESTIGATION: 'investigation',
    MEDICINE: 'medicine',
    NATURE: 'nature',
    PERCEPTION: 'perception',
    PERFORMANCE: 'performance',
    PERSUASION: 'persuasion',
    RELIGION: 'religion',
    SLEIGHT_OF_HAND: 'sleight of hand',
    STEALTH: 'stealth',
    SURVIVAL: 'survival'
}

const characterSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, "You need a name, silly!"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    },
    class: {
        type: String,
        required: [true, "You need a class, silly!"]
    },
    level: {
        type: Number,
        required: [true, "You need a level, silly!"]
    },
    proficiency: { type: Number },
    attributes: {
        strength: {type: Number},
        dexterity: {type: Number},
        constitution: {type: Number},
        intelligence: {type: Number},
        wisdom: {type: Number},
        charisma: {type: Number}

    },
    savingthrows: {
        strength: {type: Boolean},
        dexterity: {type: Boolean},
        constitution: {type: Boolean},
        intelligence: {type: Boolean},
        wisdom: {type: Boolean},
        charisma: {type: Boolean}
    },skills: [
        {
            skill: {
                type: String
            }
        }
    ],
    spells: [
        {
            spell: {
                type: mongoose.Schema.Types.ObjectId, ref: 'Spells'
            }
        }
    ]
})

characterSchema.statics.findByUser = async (userid) => {
    const char = await Character.find({user:userid})
    return char
}

characterSchema.statics.findSingleById = async (id) => {
    const char = await Character.findOne({_id:id})
    return char
}

const Character = mongoose.model("Character", characterSchema)
module.exports = Character