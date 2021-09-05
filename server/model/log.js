const mongoose = require('mongoose')

const logSchema = mongoose.Schema({
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
    },
    campaign:{
        type: mongoose.Schema.Types.ObjectId, ref: "Campaign"
    }
})

const Log = mongoose.model("Log",logSchema)
module.exports = Log