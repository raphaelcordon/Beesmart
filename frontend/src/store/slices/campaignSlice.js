import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    campaignData: JSON.parse(localStorage.getItem("campaignData")) || [],
};
export const CampaignSlice = createSlice({
    name: "campaign",
    initialState,
    reducers: {
        storeCampaignData: (state, action) => {
            state.campaignData = action.payload;
            // Updating local storage with new data
            localStorage.setItem("campaignData", JSON.stringify(action.payload));
        },
        updateCampaign: (state, action) => {
            const index = state.campaignData.findIndex(
                (c) => c.id === action.payload.id
            );
            if (index !== -1) {
                state.campaignData[index] = {
                    ...state.campaignData[index],
                    ...action.payload,
                };
                // Updating local storage with updated data
                localStorage.setItem(
                    "campaignData",
                    JSON.stringify(state.campaignData)
                );
            }
        },
        deleteCampaign: (state, action) => {
            state.campaignData = state.campaignData.filter(
                (campaign) => campaign.id !== action.payload
            );
            // Updating local storage with updated data
            localStorage.setItem(
                "campaignData",
                JSON.stringify(state.campaignData)
            );
        },
    },
});

export const { storeCampaignData, updateCampaign, deleteCampaign } =
    CampaignSlice.actions;
export default CampaignSlice.reducer;