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

campaignSchema.statics.getSimpleLogs = async (userid,campaignid) => {
    if(verifyUserInCampaign(userid,campaignid)) {
        const campaign = await Campaign.findById(campaignid).populate('logs',['name','session'])
        return campaign
    } return {logs:[]}
}

async function verifyUserInCampaign(userid,campaignid) {
    try{
    const campaign = await Campaign.findById(campaignid)
    return campaign.users.includes(userid)
    } catch(err) {
        return false
    }
}

async function verifyUserIsDM(userid,campaignid) {
    try {
        const campaign = await Campaign.findById(campaignid)
        return campaign.DM === userid
    } catch(err) {
        return false
    }
}
const Campaign = mongoose.model("Campaign",campaignSchema)
module.exports = Campaign