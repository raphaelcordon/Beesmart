import { createSlice } from "@reduxjs/toolkit"

export const CampaignSlice = createSlice({
    name: "campaign",
    initialState: {
        campaignData: [],
    },
    reducers: {
        storeCampaignData: (state, action) => {
            state.campaignData = action.payload;
        },
        updateCampaign: (state, action) => {
            const index = state.campaignData.findIndex(c => c.id === action.payload.id);
            if (index !== -1) {
                state.campaignData[index] = {...state.campaignData[index], ...action.payload};
            }
        },
        deleteCampaign: (state, action) => {
            state.campaignData = state.campaignData.filter(campaign => campaign.id !== action.payload);
        },
    },
});

export const {  storeCampaignData, updateCampaign, deleteCampaign } = CampaignSlice.actions;
export default CampaignSlice.reducer;