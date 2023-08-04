import axios from 'axios';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk('results/fetchUsersStatus', async (params) => {
  const { percPage, searchValue, popular } = params;
  const getUsers = `search/users?q=${!!searchValue ? searchValue : null}`;
  const { data } = await axios.get(`https://api.github.com/${getUsers}&${percPage}`);
  console.log(data, 'data в редаксе');

  return data.items;
});

const initialState = {
  results: [],
  users: [{ repos: [] }],
  repositories: [{ repos: [] }],
  status: 'loading',
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getRepositories(state, action) {
      state.results = action.payload;
    },
    setUsers(state, action) {
      state.users = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.status = 'loading';
        state.users = [];
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.status = 'success';
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'error';
        state.users = [];
      });
  },
});

export const { getRepositories, setUsers } = usersSlice.actions;
export default usersSlice.reducer;
