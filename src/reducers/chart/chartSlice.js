import { createSlice } from "@reduxjs/toolkit";
import { convertPrice } from "../../helperFunctions";

const initialState = {
  dataPoints: [],
  savedDataPoints: [],
  tableData: [],
  exchangeRates: {},
};

export const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    updateChart: (state, action) => {
      state.dataPoints = [...state.dataPoints, action.payload];
    },
    saveCurrentChart: (state) => {
      state.savedDataPoints = [...state.dataPoints];
    },
    updateTable: (state, action) => {
      const val = convertPrice(state.exchangeRates);
      const rowData = {
        ...action.payload,
        priceUsd: val ? action.payload.priceEth * val : "---",
      };
      state.tableData = [rowData].concat(state.tableData);
    },
    saveExchangeRates: (state, action) => {
      state.exchangeRates = action.payload;
    },
  },
});

export const {
  updateChart,
  saveCurrentChart,
  updateLatestPrice,
  updateTable,
  saveExchangeRates,
} = chartSlice.actions;

export const selectDataPoints = (state) => state.chart.dataPoints;
export const selectSavedDataPoints = (state) => state.chart.savedDataPoints;
export const selectTableData = (state) => state.chart.tableData;
export const selectExchangeRates = (state) => state.chart.exchangeRates;

export default chartSlice.reducer;
