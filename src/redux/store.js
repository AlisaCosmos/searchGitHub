import { configureStore } from '@reduxjs/toolkit';
import resultsReducer from './slice/resultsSlice';
import filtersReduser from './slice/filtersSlice';

export const store = configureStore({
  reducer: {
    results: resultsReducer,
    filters: filtersReduser,
  },
});
