import { HandoutTC } from "../model/handout.js"

const handoutQuery = {
    handoutById: HandoutTC.getResolver('findById'),
    handoutByIds: HandoutTC.getResolver('findByIds'),
    handoutOne: HandoutTC.getResolver('findOne'),
    handoutMany: HandoutTC.getResolver('findMany'),
    handoutCount: HandoutTC.getResolver('count'),
    handoutConnection: HandoutTC.getResolver('connection'),
    handoutPagination: HandoutTC.getResolver('pagination'),

}

const handoutMutation = {
    handoutCreateOne: HandoutTC.getResolver('createOne'),
    handoutCreateMany: HandoutTC.getResolver('createMany'),
    handoutUpdateById: HandoutTC.getResolver('updateById'),
    handoutUpdateOne: HandoutTC.getResolver('updateOne'),
    handoutUpdateMany: HandoutTC.getResolver('updateMany'),
    handoutRemoveById: HandoutTC.getResolver('removeById'),
    handoutRemoveOne: HandoutTC.getResolver('removeOne'),
    handoutRemoveMany: HandoutTC.getResolver('removeMany'),
}

export {handoutQuery, handoutMutation}