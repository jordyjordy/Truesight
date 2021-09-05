import { ItemTC } from "../model/item.js"

const itemQuery = {
    itemById: ItemTC.getResolver('findById'),
    itemByIds: ItemTC.getResolver('findByIds'),
    itemOne: ItemTC.getResolver('findOne'),
    itemMany: ItemTC.getResolver('findMany'),
    itemCount: ItemTC.getResolver('count'),
    itemConnection: ItemTC.getResolver('connection'),
    itemPagination: ItemTC.getResolver('pagination'),

}

const itemMutation = {
    itemCreateOne: ItemTC.getResolver('createOne'),
    itemCreateMany: ItemTC.getResolver('createMany'),
    itemUpdateById: ItemTC.getResolver('updateById'),
    itemUpdateOne: ItemTC.getResolver('updateOne'),
    itemUpdateMany: ItemTC.getResolver('updateMany'),
    itemRemoveById: ItemTC.getResolver('removeById'),
    itemRemoveOne: ItemTC.getResolver('removeOne'),
    itemRemoveMany: ItemTC.getResolver('removeMany'),
}

export {itemQuery, itemMutation}