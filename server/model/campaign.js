import mong from "mongoose"
const {Schema,model} = mong
import {composeWithMongoose} from 'graphql-compose-mongoose'
const campaignSchema = Schema({
    name:{
        type:String,
        require: [true,"every group needs a name!"]
    },
    DM: {
        type: Schema.Types.ObjectId, ref: "User"
    },
    users: [
        {
            type: Schema.Types.ObjectId, ref: "User"
        }
    ],
    characters: [
        {
            type: Schema.Types.ObjectId, ref: "Character"
        }
    ],
    logs: [
        {
            type: Schema.Types.ObjectId, ref: "Log"
        }
    ],
    items: [
        {
            type: Schema.Types.ObjectId, ref: "Item"
        }
    ],
    spells: [
        {
            type: Schema.Types.ObjectId, ref: "Spell"
        }
    ],
    notes: [
        {
            type: Schema.Types.ObjectId, ref: "Note"
        }
    ],
    handouts: [
        {
            type: Schema.Types.ObjectId, ref: "Handout"
        }
    ]

})

campaignSchema.statics.findByUser = async (userid) => {
    const campaign = await Campaign.find({ users: {$in:[userid]}})
    return campaign
}

export const Campaign = model("Campaign",campaignSchema)
export const CampaignTC = composeWithMongoose(Campaign)