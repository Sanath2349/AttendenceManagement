import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  loading: false,
  error: null,
};

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    fetchEmployeesStart: (state) => {
      state.loading = true;
    },
    fetchEmployeesSuccess: (state, action) => {
      state.list = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchEmployeesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addEmployee: (state, action) => {
      state.list.push(action.payload);
    },
    updateEmployee: (state, action) => {
      const index = state.list.findIndex((emp) => emp.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    deleteEmployee: (state, action) => {
      state.list = state.list.filter((emp) => emp.id !== action.payload);
    },
  },
});

export const {
  fetchEmployeesStart,
  fetchEmployeesSuccess,
  fetchEmployeesFailure,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} = employeeSlice.actions;

export default employeeSlice.reducer;
