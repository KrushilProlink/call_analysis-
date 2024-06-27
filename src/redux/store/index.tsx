import { configureStore } from "@reduxjs/toolkit";
import getCallDataSlice from "../slice/getCallDataSlice";
import getApwAnalysisSlice from "../slice/getApwAnalysisSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import getRecruiterDetailsSlice from "../slice/getRecruiterDetailsSlice";
import getRecruiterReportSlice from "../slice/getRecruiterReportSlice";
import getDashboardDataSlice from "../slice/getDashboardDataSlice";

const middleware = (getDefaultMiddleware: any) => {
  return getDefaultMiddleware({
    serializableCheck: false,
  });
};

const recruiterPersistConfig = {
  key: "recruiterDetails",
  storage,
};
const recruiterRepoPersistConfig = {
  key: "recruiterRepoDetails",
  storage,
};
const dashboardPersistConfig = {
  key: "dashboardDetails",
  storage,
};

export const store = configureStore({
  reducer: {
    callDetails: getCallDataSlice,
    apwAnalysisDetails: getApwAnalysisSlice,
    getRecruiterDetails: persistReducer(
      recruiterPersistConfig,
      getRecruiterDetailsSlice
    ),
    getRecruiterReportDetails: persistReducer(
      recruiterRepoPersistConfig,
      getRecruiterReportSlice
    ),
    getDashboardDetails: getDashboardDataSlice,
  },
  middleware,
});

export const persistor = persistStore(store);
