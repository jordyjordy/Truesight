import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type {RootState} from '../../store'
import {Log} from "./logSlice";
export interface Campaign {
    _id: string,
    name:string,
    DM: string,
    users:any[],
    characters: any[],
    logs:any[]
    items: any[],
    spells:any[],
    notes: any[],
    handouts: any[],
    isDM: boolean
}

interface CampaignsState {
    campaign:Campaign
}


const initialState: CampaignsState = {
    campaign:{
        _id:"",
        name:"",
        DM:"",
        users:[],
        characters:[],
        logs:[],
        items:[],
        spells:[],
        notes:[],
        handouts:[],
        isDM:false
    }
}

export const mainCampaignSlice = createSlice({
    name:'mainCampaign',
    initialState,
    reducers: {
        editCampaign: (state, action:PayloadAction<Campaign>) => {
            state.campaign = action.payload
        },
        addLog: (state,action:PayloadAction<Log>) => {
            state.campaign.logs.push(action.payload)
        },
        populateLogs: (state, action:PayloadAction<Log[]>) => {
            state.campaign.logs = action.payload
        },
        editLog: (state, action:PayloadAction<Log>) => {
            state.campaign.logs = state.campaign.logs.map(el => 
                el._id === action.payload._id?action.payload:el
            )
        },
        removeLog: (state, action:PayloadAction<String>) => {
            state.campaign.logs = state.campaign.logs.filter(el => el._id !== action.payload)
        },
        addNote: (state,action:PayloadAction<Log>) => {
            state.campaign.notes.push(action.payload)
        },
        populateNotes: (state, action:PayloadAction<Log[]>) => {
            state.campaign.notes = action.payload
        },
        editNote: (state, action:PayloadAction<Log>) => {
            state.campaign.notes = state.campaign.notes.map(el => 
                el._id === action.payload._id?action.payload:el
            )
        },
        removeNote: (state, action:PayloadAction<String>) => {
            state.campaign.notes = state.campaign.notes.filter(el => el._id !== action.payload)
        },
        
    }
})

export const {editCampaign, addLog, populateLogs, editLog, removeLog} = mainCampaignSlice.actions

export const selectCampaigns = (state:RootState) => state.mainCampaign

export default mainCampaignSlice.reducer