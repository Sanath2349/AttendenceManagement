import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isAuthenticated: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { headers, ...serializedData } = action.payload;
      state.currentUser = serializedData.data || serializedData;
      // state.currentUser = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.isAuthenticated = false;
      state.currentUser = null;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export const { loginSuccess, loginFailure, logout } = userSlice.actions;
export default userSlice.reducer;
