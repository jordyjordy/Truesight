import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type {RootState} from '../../store'

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
    campaigns:Campaign[]
}


const initialState: CampaignsState = {campaigns:[]}

export const campaignsSlice = createSlice({
    name:'campaigns',
    initialState,
    reducers: {
        addCampaign: (state, action:PayloadAction<Campaign>) => {
            state.campaigns.push(action.payload) 
        },
        removeCampaign: (state, action:PayloadAction<Campaign>) => {
            state.campaigns = state.campaigns.filter(char => char._id !== action.payload._id)
        },
        setCampaigns: (state, action:PayloadAction<Campaign[]>) => {
            state.campaigns = action.payload
        },
        editCampaign: (state, action:PayloadAction<Campaign>) => {
            const index = state.campaigns.findIndex((el) =>
                el._id === action.payload._id)
            state.campaigns[index] = action.payload
        }
    }
})

export const {addCampaign, removeCampaign, setCampaigns, editCampaign} = campaignsSlice.actions

export const selectCampaigns = (state:RootState) => state.campaigns

export default campaignsSlice.reducer