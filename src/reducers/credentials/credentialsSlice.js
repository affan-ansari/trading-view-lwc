import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  credentials: { infuraId: "", pairAddress: "" },
};

export const credentialsSlice = createSlice({
  name: "credentials",
  initialState,
  reducers: {
    storeCredentials: (state, action) => {
      console.log(action.payload);
      state.credentials = action.payload;
    },
  },
});

export const { storeCredentials } = credentialsSlice.actions;

export const selectCredentials = (state) => state.credentials.credentials;

export default credentialsSlice.reducer;
