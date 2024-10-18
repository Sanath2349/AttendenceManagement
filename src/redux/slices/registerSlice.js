// redux/slices/registerSlice.js
import { createSlice } from '@reduxjs/toolkit';

const registerSlice = createSlice({
  name: 'register',
  initialState: {
    currentUser: null,
    error: null,
  },
  reducers: {
    registerSuccess: (state, action) => {
      state.currentUser = action.payload; // This includes the user's role
      state.error = null;
    },
    registerFailure: (state, action) => {
      state.currentUser = null;
      state.error = action.payload;
    },
  },
});

export const { registerSuccess, registerFailure } = registerSlice.actions;
export default registerSlice.reducer;
