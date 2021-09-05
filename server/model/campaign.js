const mongoose = require('mongoose')

const campaignSchema = mongoose.Schema({
    name:{
        type:String,
        require: [true,"every group needs a name!"]
    },
    DM: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: "User"
        }
    ],
    characters: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: "Character"
        }
    ],
    logs: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: "Log"
        }
    ],
    items: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: "Item"
        }
    ],
    spells: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: "Spell"
        }
    ],
    notes: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: "Note"
        }
    ],
    handouts: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: "Handout"
        }
    ]

})

campaignSchema.statics.findByUser = async (userid) => {
    const campaign = await Campaign.find({ users: {$in:[userid]}})
    return campaign
}

const Campaign = mongoose.model("Campaign",campaignSchema)
module.exports = Campaign