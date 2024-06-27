import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RecruiterReportState {
  data: any;
}

const initialState: RecruiterReportState = {
  data: null,
};

const getRecruiterReportSlice = createSlice({
  name: "recruiterReportDetails",
  initialState,
  reducers: {
    setRecruiterReportDetails: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
  },
});

export const { setRecruiterReportDetails } = getRecruiterReportSlice.actions;
export default getRecruiterReportSlice.reducer;
