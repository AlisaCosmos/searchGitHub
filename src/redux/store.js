import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slice/usersSlice';
import filtersReduser from './slice/filtersSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    filters: filtersReduser,
  },
});
