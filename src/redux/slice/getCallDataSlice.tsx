import { createSlice } from "@reduxjs/toolkit";

export interface ItemsState {
  data: any;
  teamName: string;
}
const initialState: ItemsState = {
  data: [],
  teamName: "",
};
const getCallDataSlice: any = createSlice({
  name: "data",
  initialState,
  reducers: {
    addItem(state: any, action: any) {
      state.data = action?.payload?.data;
      state.teamName = action?.payload?.teamName;
    },
    deleteItem: (state?: any) => ({
      ...state,
      data: [],
    }),
  },
});

export const { addItem, deleteItem } = getCallDataSlice.actions;

export default getCallDataSlice.reducer;
