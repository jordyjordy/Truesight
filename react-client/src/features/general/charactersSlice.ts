import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type {RootState} from '../../store'

export interface SimpleCharacter {
    _id: string,
    name: string,
    cclass: string
}

interface CharactersState {
    characters:SimpleCharacter[]
}


const initialState: CharactersState = {characters:[]}

export const charactersSlice = createSlice({
    name:'characters',
    initialState,
    reducers: {
        addCharacter: (state, action:PayloadAction<SimpleCharacter>) => {
            state.characters.push(action.payload) 
        },
        removeCharacter: (state, action:PayloadAction<SimpleCharacter>) => {
            state.characters = state.characters.filter(char => char._id === action.payload._id)
        },
        setCharacters: (state, action:PayloadAction<SimpleCharacter[]>) => {
            console.log(state.characters)
            console.log(action.payload)
            state.characters = action.payload
        }
    }
})

export const {addCharacter, removeCharacter, setCharacters} = charactersSlice.actions

export const selectCharacters = (state:RootState) => state.characters

export default charactersSlice.reducer