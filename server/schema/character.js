import { CharacterTC } from "../model/character.js";

const characterQuery = {
    characterById: CharacterTC.getResolver('findById'),
    characterByIds: CharacterTC.getResolver('findByIds'),
    characterOne: CharacterTC.getResolver('findOne'),
    characterMany: CharacterTC.getResolver('findMany',[authMiddleware]),
    characterCount: CharacterTC.getResolver('count'),
    characterConnection: CharacterTC.getResolver('connection'),
    characterPagination: CharacterTC.getResolver('pagination'),

}

const characterMutation = {
    characterCreateOne: CharacterTC.getResolver('createOne'),
    characterCreateMany: CharacterTC.getResolver('createMany'),
    characterUpdateById: CharacterTC.getResolver('updateById'),
    characterUpdateOne: CharacterTC.getResolver('updateOne'),
    characterUpdateMany: CharacterTC.getResolver('updateMany'),
    characterRemoveById: CharacterTC.getResolver('removeById'),
    characterRemoveOne: CharacterTC.getResolver('removeOne'),
    characterRemoveMany: CharacterTC.getResolver('removeMany'),
}

async function authMiddleware(resolve, source, args, context, info) {
        
    return resolve(source,args,context,info)
}

export {characterQuery, characterMutation}