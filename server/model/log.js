import mong from "mongoose"
const {Schema, model} = mong

const logSchema = Schema({
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
        type: Schema.Types.ObjectId, ref: "Campaign"
    }
})

export const Log = model("Log",logSchema)