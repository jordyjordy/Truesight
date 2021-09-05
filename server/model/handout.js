const mongoose = require('mongoose')

const handoutSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Handout needs a name."]
    },
    image:{
        type:String,
        required: [true, "handout needs an image."]
    }
})

const Handout = mongoose.model("Handout",handoutSchema)

module.exports = Handout