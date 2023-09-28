import { configureStore } from "@reduxjs/toolkit";
import chartReducer from "../reducers/chart/chartSlice";

export const store = configureStore({
  reducer: {
    chart: chartReducer,
  },
});
