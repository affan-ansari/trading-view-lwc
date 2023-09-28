import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataPoints: [],
};

export const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    updateChart: (state, action) => {
      console.log(action.payload);
      state.dataPoints = [...state.dataPoints, action.payload];
    },
  },
});

export const { updateChart } = chartSlice.actions;

export const selectDataPoints = (state) => state.chart.dataPoints;

export default chartSlice.reducer;
