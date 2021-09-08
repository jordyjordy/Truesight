const mongoose = require('mongoose')

const handoutSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Handout needs a name."]
    },
    image:{
        type:String,
        required: [true, "handout needs an image."]
    },
    campaign:{
        type: mongoose.Schema.Types.ObjectId, ref: "Campaign"
    }
})

const Handout = mongoose.model("Handout",handoutSchema)

module.exports = Handout