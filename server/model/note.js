const mongoose = require('mongoose')

const noteSchema = mongoose.Schema({
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
    },
    campaign:{
        type: mongoose.Schema.Types.ObjectId, ref: "Campaign"
    }
})
const Note = mongoose.model("Note",noteSchema)

module.exports = Note