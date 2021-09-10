import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type {RootState} from '../../store'

export interface Log {
    _id: string,
    name:string,
    session:number,
    text:string
}

interface logState {
    log:Log
}


const initialState: logState = {
    log:{
        _id : "",
        name : "",
        session : 0,
        text : ""
    }
}

export const logSlice = createSlice({
    name:'Log',
    initialState,
    reducers: {
        setLog: (state, action:PayloadAction<Log>) => {
            state.log = action.payload
        },
        editName: (state, action:PayloadAction<string>) => {
            state.log.name = action.payload
        },
        editSession: (state, action:PayloadAction<number>) => {
            state.log.session = action.payload
        },
        editText: (state, action: PayloadAction<string>) => {
            state.log.text = action.payload
        }
    }
})

export const {setLog, editName,editSession,editText} = logSlice.actions

export const selectCampaigns = (state:RootState) => state.mainCampaign

export default logSlice.reducer