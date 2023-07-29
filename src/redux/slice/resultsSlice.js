import axios from 'axios';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchResults = createAsyncThunk('results/fetchResultsStatus', async (params) => {
  const { percPage, searchValue } = params;
  const { data } = await axios.get(
    `https://api.github.com/search/users?${percPage}&q=${searchValue}`,
  );
  console.log(data, 'data в редаксе');
  return data;
});

const initialState = {
  results: [],
  status: 'loading',
};

const resultsSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    setResults(state, action) {
      state.results = action.payload;
    },
  },

  extraReducers: {
    //загрузка
    [fetchResults.pending]: (state, action) => {
      state.status = 'loading';
      state.results = [];
    },
    //загрузка
    [fetchResults.fulfilled]: (state, action) => {
      state.results = action.payload;
      state.status = 'success';
    },
    //ошибка
    [fetchResults.rejected]: (state, action) => {
      state.status = 'error';
      state.results = [];
    },
  },
});

export const { setResults } = resultsSlice.actions;
export default resultsSlice.reducer;
