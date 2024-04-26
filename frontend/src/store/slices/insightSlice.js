import { createSlice } from "@reduxjs/toolkit"

export const InsightSlice = createSlice({
    name: "insight",
    initialState: {
        insightData: [],
    },
    reducers: {
        storeInsightData: (state, action) => {
            state.InsightData = action.payload;
        },
    },
});

export const {  storeInsightData, } = InsightSlice.actions;
export default InsightSlice.reducer;