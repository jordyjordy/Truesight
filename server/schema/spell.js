import { SpellTC } from "../model/spell.js"

const spellQuery = {
    spellById: SpellTC.getResolver('findById'),
    spellByIds: SpellTC.getResolver('findByIds'),
    spellOne: SpellTC.getResolver('findOne'),
    spellMany: SpellTC.getResolver('findMany'),
    spellCount: SpellTC.getResolver('count'),
    spellConnection: SpellTC.getResolver('connection'),
    spellPagination: SpellTC.getResolver('pagination'),

}

const spellMutation = {
    spellCreateOne: SpellTC.getResolver('createOne'),
    spellCreateMany: SpellTC.getResolver('createMany'),
    spellUpdateById: SpellTC.getResolver('updateById'),
    spellUpdateOne: SpellTC.getResolver('updateOne'),
    spellUpdateMany: SpellTC.getResolver('updateMany'),
    spellRemoveById: SpellTC.getResolver('removeById'),
    spellRemoveOne: SpellTC.getResolver('removeOne'),
    spellRemoveMany: SpellTC.getResolver('removeMany'),
}

export {spellQuery, spellMutation}