import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dateRange: null,
  teamName: null,
};

const getApwAnalysisSlice = createSlice({
  name: "apwAnalysisDetails",
  initialState,
  reducers: {
    setDateRange: (state, action) => {
      state.dateRange = action.payload.date;
    },
    setTeamsName: (state, action) => {
      state.teamName = action.payload.teamName;
    },
  },
});

export const { setDateRange, setTeamsName } = getApwAnalysisSlice.actions;
export default getApwAnalysisSlice.reducer;
