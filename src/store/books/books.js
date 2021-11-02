import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {FetchStatus} from "../../api";


const fetchBooks = createAsyncThunk(
  `books/fetchBooks`,
  async (api, {rejectWithValue}) => {
    try {
      const response = await api.get(`/books`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/* const fetchBooks = (api) => createAsyncThunk(
  `books/fetchBooks`,
  new Promise((resolve) => {
    api.get(`/books`)
      .then((response) => {
        console.log(response.data);
        resolve(response.data);
      });
  })
); */

const booksSlice = createSlice({
  name: `books`,
  initialState: {
    list: [],
    status: null,
    error: null,
  },
  reducers: {
    // loadBooks: (state, action) => {state.list = action.payload},
  },
  extraReducers: {
    [fetchBooks.rejected]: (state, action) => {
      state.status = FetchStatus.LOADING;
      state.error = null;
    },
    [fetchBooks.fulfilled]: (state, action) => {
      state.status = FetchStatus.RESOLVED;
      state.list = action.payload;
    },
    [fetchBooks.rejected]: (state, action) => {
      state.status = FetchStatus.REJECTED;
      state.error = action.payload;
    },
  },
});

const {actions, reducer} = booksSlice;


export const {
  loadBooks,
} = actions;

export {
  reducer,
  fetchBooks,
};
