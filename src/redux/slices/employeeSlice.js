// src/redux/slices/employeeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  punchStatus: null,
  lastPunchInDate: null,
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    punchIn: (state, action) => {
      const { userId } = action.payload;
      const today = new Date().toDateString();
      state.punchStatus = 'punchedIn';
      state.lastPunchInDate = today;
      localStorage.setItem(`punchStatus_${userId}`, 'punchedIn');
      localStorage.setItem(`lastPunchInDate_${userId}`, today);
    },
    punchOut: (state, action) => {
      const { userId } = action.payload;
      state.punchStatus = 'punchedOut';
      localStorage.setItem(`punchStatus_${userId}`, 'punchedOut');
    },
    resetPunchStatus: (state, action) => {
      const { userId } = action.payload;
      const today = new Date().toDateString();
      if (state.lastPunchInDate !== today) {
        state.punchStatus = null;
        state.lastPunchInDate = null;
        localStorage.removeItem(`punchStatus_${userId}`);
        localStorage.removeItem(`lastPunchInDate_${userId}`);
      }
    },
    loadPunchStatus: (state, action) => {
      const { userId } = action.payload;
      state.punchStatus = localStorage.getItem(`punchStatus_${userId}`) || null;
      state.lastPunchInDate = localStorage.getItem(`lastPunchInDate_${userId}`) || null;
    },
  },
});

export const { punchIn, punchOut, resetPunchStatus, loadPunchStatus } = employeeSlice.actions;
export default employeeSlice.reducer;
