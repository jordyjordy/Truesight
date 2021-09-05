import mong from "mongoose"
const {Schema, model} = mong
import {composeWithMongoose} from 'graphql-compose-mongoose'
const noteSchema = Schema({
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
})
export const Note = model("Note",noteSchema)
export const NoteTC = composeWithMongoose(Note)

