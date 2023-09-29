import { configureStore } from "@reduxjs/toolkit";
import chartReducer from "../reducers/chart/chartSlice";
import credentialsReducer from "../reducers/credentials/credentialsSlice";

export const store = configureStore({
  reducer: {
    chart: chartReducer,
    credentials: credentialsReducer,
  },
});
