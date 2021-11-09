import {AxiosInstance} from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {BookType} from "../../types";
import {FetchStatus} from "../../api";
import {createBooks} from "../../adapters/book";


interface BooksStateType {
  list: BookType[],
  status: string | null,
  error: string | null,
}


const initialState = {
  list: [],
  status: null,
  error: null,
} as BooksStateType;


const fetchBooks = createAsyncThunk(
  `books/fetchBooks`,
  async (api: AxiosInstance, {rejectWithValue}): Promise<BookType[] | unknown> => {
    try {
      const response = await api.get(`/books`);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

const booksSlice = createSlice({
  name: `books`,
  initialState,
  reducers: {
    // loadBooks: (state, action) => {state.list = action.payload},
  },
  extraReducers: {
    [fetchBooks.pending.toString()]: (state) => {
      state.status = FetchStatus.LOADING;
      state.error = null;
    },
    [fetchBooks.fulfilled.toString()]: (state, action) => {
      state.status = FetchStatus.RESOLVED;
      state.list = createBooks(action.payload);
    },
    [fetchBooks.rejected.toString()]: (state, action) => {
      state.status = FetchStatus.REJECTED;
      state.error = action.payload;
    },
  },
});

const {/* actions, */ reducer} = booksSlice;


/* export const {
  loadBooks,
} = actions; */

export {
  reducer,
  fetchBooks,
};
