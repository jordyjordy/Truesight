import mong from "mongoose"
const {Schema,model} = mong
import {composeWithMongoose} from 'graphql-compose-mongoose'
import { GraphQLID, GraphQLObjectType } from "graphql"
import { CharacterTC } from "./character.js"
import { UserTC } from "./user.js"
import { SpellTC } from "./spell.js"
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
            name: {
                type:String,
                required: [true,"Your log entry needs a name"]
            },
            session:{
                type:Number,
                required: [true, "A log should be tied to a session!"]
            },
            text: {
                type: String
            }
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
            name:{
                type:String,
                required:[true,"your note needs a name"]
            },
            type: {
                type:String,
                enum:['NPC','Location','Event','Item','Misc'],
                default: 'Misc',
                required:[true, "your note needs a type!"]
            },
            text: {
                type:String,
                required:[true,"your note needs text!"]
            }
        }
    ],
    handouts: [
        {
            name:{
                type:String,
                required:[true,"Handout needs a name."]
            },
            image:{
                type:String,
                required: [true, "handout needs an image."]
            }
        }
    ]

})

campaignSchema.statics.findByUser = async (userid) => {
    const campaign = await Campaign.find({ users: {$in:[userid]}})
    return campaign
}

export const Campaign = model("Campaign",campaignSchema)
export const CampaignTC = composeWithMongoose(Campaign)

const CampaignType = new GraphQLObjectType({
    name: 'campaign',
    fields: function() {
        return {
            _id: {
                type:GraphQLID
            },
            characters: {
                type: CharacterTC.getResolver('findMany').getType()
            },
            users: {
                type: UserTC.getResolver('findMany').getType()
            },
            DM: {
                type: UserTC.getResolver('findOne').getType()
            },
            spells: {
                type: SpellTC.getResolver('findMany').getType()
            },
            items: {
                type: SpellTC.getResolver('findMany').getType()
            }
        }
    }
})

CampaignTC.addResolver({
    name:'findByUser',
    kind:'query',
    type: [CampaignType],
    args: {userid:'String'},
    resolve: async({source, args, context, info}) => {
        try {
            console.log(args.userid)
            const campaign = await Campaign.find({ users: {$in:[args.userid]}}).
            populate('users').
            populate('characters',['attributes','name','cclass']).
            populate('items').
            populate('spells').
            populate('DM', 'email')
            console.log(campaign)
            return campaign
        } catch(err) {
            console.error(error.message)
        }
    }
})