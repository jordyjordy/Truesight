import { SchemaComposer } from "graphql-compose";

const schemaComposer = new SchemaComposer()

import { campaignQuery, campaignMutation } from "./campaign.js";
import { characterQuery, characterMutation } from "./character.js";
import { itemQuery, itemMutation } from "./item.js";
import { spellQuery, spellMutation } from "./spell.js";
import { userQuery, userMutation } from "./user.js";

schemaComposer.Query.addFields({
    ...campaignQuery,
    ...characterQuery,
    ...itemQuery,
    ...spellQuery,
    ...userQuery
})

schemaComposer.Mutation.addFields({
    ...campaignMutation,
    ...characterMutation,
    ...itemMutation,
    ...spellMutation,
    ...userMutation
})

export default schemaComposer.buildSchema()