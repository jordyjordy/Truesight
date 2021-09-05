import { configureStore } from '@reduxjs/toolkit'
import charactersSlice from './features/general/charactersSlice'
import campaignsSlice from './features/general/campaignsSlice'
import mainCampaignSlice from './features/general/mainCampaignSlice'
import logSlice from './features/general/logSlice'
export const store = configureStore({
    reducer: {
        characters: charactersSlice,
        campaigns: campaignsSlice,
        mainCampaign: mainCampaignSlice,
        currentLog: logSlice
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
