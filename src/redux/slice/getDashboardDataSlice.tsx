import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dateRange: null,
  teamName: null,
};

const getDashboardDataSlice = createSlice({
  name: "dashboadData",
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

export const { setDateRange, setTeamsName } = getDashboardDataSlice.actions;
export default getDashboardDataSlice.reducer;
