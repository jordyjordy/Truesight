import mong from "mongoose"
const { Schema, model } = mong
import {composeWithMongoose} from 'graphql-compose-mongoose'
const spellSchema = Schema({
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
    components: {
        type: String
    },
    description: {
        type: String
    },
    concentration: {
        type: Boolean
    },
    user: {
        type: Schema.Types.ObjectId, ref: "User"
    },
    private: {
        type: Boolean
    }
})

spellSchema.statics.findByName = async (name, page, editable, user) => {
    var options = {}
    if (name != undefined) {
        options.name = { $regex: name.toLowerCase(), $options: 'i' }
    }
    if (editable == 'true') {
        options.user = user
    }
    const items = await Spell.find(options).skip((page - 1) * 20).limit(20)
    return items
}
spellSchema.statics.spellCount = async () => {
    return (await Spell.find()).length
}

export const Spell = model("Spell", spellSchema)
export const SpellTC = composeWithMongoose(Spell)