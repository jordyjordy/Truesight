import { NoteTC } from "../model/note.js"

const noteQuery = {
    noteById: NoteTC.getResolver('findById'),
    noteByIds: NoteTC.getResolver('findByIds'),
    noteOne: NoteTC.getResolver('findOne'),
    noteMany: NoteTC.getResolver('findMany'),
    noteCount: NoteTC.getResolver('count'),
    noteConnection: NoteTC.getResolver('connection'),
    notePagination: NoteTC.getResolver('pagination'),

}

const noteMutation = {
    noteCreateOne: NoteTC.getResolver('createOne'),
    noteCreateMany: NoteTC.getResolver('createMany'),
    noteUpdateById: NoteTC.getResolver('updateById'),
    noteUpdateOne: NoteTC.getResolver('updateOne'),
    noteUpdateMany: NoteTC.getResolver('updateMany'),
    noteRemoveById: NoteTC.getResolver('removeById'),
    noteRemoveOne: NoteTC.getResolver('removeOne'),
    noteRemoveMany: NoteTC.getResolver('removeMany'),
}

export {noteQuery, noteMutation}