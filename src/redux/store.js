import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import employeeReducer from './slices/employeeSlice';
import registerReducer from './slices/registerSlice'

export const store = configureStore({
    reducer: {
      user: userReducer,
      employees: employeeReducer,
      register: registerReducer,
    },
  });