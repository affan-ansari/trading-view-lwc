import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  credentials: {
    infuraId: "f370c580e10c471cbe322f4674cd06c8",
    pairAddress: "0x2cC846fFf0b08FB3bFfaD71f53a60B4b6E6d6482",
  },
};

export const credentialsSlice = createSlice({
  name: "credentials",
  initialState,
  reducers: {
    storeCredentials: (state, action) => {
      state.credentials = action.payload;
    },
  },
});

export const { storeCredentials } = credentialsSlice.actions;

export const selectCredentials = (state) => state.credentials.credentials;

export default credentialsSlice.reducer;
