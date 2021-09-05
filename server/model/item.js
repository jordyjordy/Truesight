import mong from "mongoose"
const {Schema, model} = mong

const itemSchema = Schema({
    name: {
        type: String,
        require: [true, "items need names"]
    },
    class: String,
    type: {
        type: String
    },
    cost: {
        type: String
    },
    weight: {
        type: Number,
    },
    description: {
        type: String,
        require: [true, "items need descriptions!"]

    },
    ac: String,
    strength: Number,
    stealth: String,
    damage: String,
    properties: String,
    rarity: String,
    attunement: String,
    attuned: Boolean,
    icon: {
        type: String
    },
    color: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId, ref: "User"
    },
    private: {
        type: Boolean
    }


})

itemSchema.statics.findByName = async (name, page, editable, user) => {
    var options = {}
    if (name != undefined) {
        options.name = { $regex: name.toLowerCase(), $options: 'i' }
    }
    if (editable == 'true') {
        options.user = user
    }
    const items = await Item.find(options).skip((page - 1) * 20).limit(20)
    return items
}
itemSchema.statics.itemCount = async () => {
    return (await Item.find()).length
}


export const Item = model("Item", itemSchema)