import { createSlice } from "@reduxjs/toolkit"

export const CollectorSlice = createSlice({
    name: "collector",
    initialState: {
        collectorData: [],
        collectorTypeData: [],
    },
    reducers: {
        storeCollectorData: (state, action) => {
            state.CollectorData = action.payload;
        },
        updateCollector: (state, action) => {
            const index = state.collectorData.findIndex(c => c.id === action.payload.id);
            if (index !== -1) {
                state.collectorData[index] = {...state.collectorData[index], ...action.payload};
            }
        },
        deleteCollector: (state, action) => {
            state.collectorData = state.collectorData.filter(collector => collector.id !== action.payload);
        },

        storeCollectorTypeData: (state, action) => {
            state.CollectorTypeData = action.payload;
        },
    },
});

export const {  storeCollectorData, updateCollector, deleteCollector, storeCollectorTypeData } = CollectorSlice.actions;
export default CollectorSlice.reducer;