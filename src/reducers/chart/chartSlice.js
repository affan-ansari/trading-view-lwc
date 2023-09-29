import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataPoints: [],
  savedDataPoints: [],
  latestPrice: 0,
};

export const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    updateChart: (state, action) => {
      console.log(action.payload);
      state.dataPoints = [...state.dataPoints, action.payload];
    },
    saveCurrentChart: (state) => {
      state.savedDataPoints = [...state.dataPoints];
    },
    updateLatestPrice: (state, action) => {
      state.latestPrice = action.payload;
    },
  },
});

export const { updateChart, saveCurrentChart, updateLatestPrice } =
  chartSlice.actions;

export const selectDataPoints = (state) => state.chart.dataPoints;
export const selectSavedDataPoints = (state) => state.chart.savedDataPoints;
export const selectLatestPrice = (state) => state.chart.latestPrice;

export default chartSlice.reducer;
