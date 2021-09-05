import { SchemaComposer } from "graphql-compose";

const schemaComposer = new SchemaComposer()

import { campaignQuery, campaignMutation } from "./campaign.js";
import { characterQuery, characterMutation } from "./character.js";
import { handoutQuery, handoutMutation } from "./handout.js";
import { itemQuery, itemMutation } from "./item.js";
import {  logQuery, logMutation } from "./log.js";
import { noteQuery, noteMutation } from "./note.js";
import { spellQuery, spellMutation } from "./spell.js";
import { userQuery, userMutation } from "./user.js";

schemaComposer.Query.addFields({
    ...campaignQuery,
    ...characterQuery,
    ...handoutQuery,
    ...itemQuery,
    ...logQuery,
    ...noteQuery,
    ...spellQuery,
    ...userQuery
})

schemaComposer.Mutation.addFields({
    ...campaignMutation,
    ...characterMutation,
    ...handoutMutation,
    ...itemMutation,
    ...logMutation,
    ...noteMutation,
    ...spellMutation,
    ...userMutation
})

export default schemaComposer.buildSchema()