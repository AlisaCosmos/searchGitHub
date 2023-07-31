import axios from 'axios';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchResults = createAsyncThunk('results/fetchResultsStatus', async (params) => {
  const { percPage, searchValue, popular } = params;
  const getRandomUsers = 'users?';
  const getUsers = `search/users?&q=${searchValue}`;
  console.log(getUsers);
  console.log(searchValue, 'searchValue');
  const limit = 'x-ratelimit-used=4';
  //q=tom+repos:%3E42+followers:%3E1000
  //`https://api.github.com/search/users?${percPage}&q=${searchValue}  `
  //https://api.github.com/users?${percPage}

  const { data } = await axios.get(
    `https://api.github.com/${searchValue ? getUsers : getRandomUsers}&${percPage}`,
    {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    },
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
