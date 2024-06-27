import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RecruiterDetailsState {
  data: any;
  date: string | null;
}

const initialState: RecruiterDetailsState = {
  data: null,
  date: null,
};

interface RecruiterDetailsPayload {
  data: any;
  date: string;
}

const getRecruiterDetailsSlice = createSlice({
  name: "recruiterDetails",
  initialState,
  reducers: {
    setRecruiterDetails: (
      state,
      action: PayloadAction<RecruiterDetailsPayload>
    ) => {
      state.data = action.payload.data;
      state.date = action.payload.date;
    },
  },
});

export const { setRecruiterDetails } = getRecruiterDetailsSlice.actions;
export default getRecruiterDetailsSlice.reducer;
