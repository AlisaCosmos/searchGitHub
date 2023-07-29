import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
  page: '1',
  totalPages: '0',
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setTotalPages(state, action) {
      state.totalPage = action.payload;
    },
  },
});

export const { setSearchValue, setPage, setTotalPages } = filtersSlice.actions;

export default filtersSlice.reducer;
