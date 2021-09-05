import mong from "mongoose"
const {Schema, model} = mong
import {composeWithMongoose} from 'graphql-compose-mongoose'
const handoutSchema = Schema({
    name:{
        type:String,
        required:[true,"Handout needs a name."]
    },
    image:{
        type:String,
        required: [true, "handout needs an image."]
    }
})

export const Handout = model("Handout",handoutSchema)
export const HandoutTC = composeWithMongoose(Handout)


