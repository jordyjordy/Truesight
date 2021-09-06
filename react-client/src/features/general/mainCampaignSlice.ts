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
        }
    }
})

export const {editCampaign, addLog, populateLogs} = mainCampaignSlice.actions

export const selectCampaigns = (state:RootState) => state.mainCampaign

export default mainCampaignSlice.reducer