import {AxiosInstance} from "axios";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

import {BookType, ErrorType, NewBookType} from "../../types";
import {FetchStatus} from "../../api";
import {createBooks} from "../../adapters/book";
import {createErrorValue} from "../../utils";


interface BooksStateType {
  list: BookType[],
  status: string | null,
  loadError: ErrorType | null,
  deleteError: ErrorType | null,
  addNewError: ErrorType | null,
}

const initialState = {
  list: [],
  status: null,
  loadError: null,
  deleteError: null,
  addNewError: null,
} as BooksStateType;


const loadBooks = createAsyncThunk<
  Promise<BookType[] | unknown>,
  void,
  {
    extra: AxiosInstance
  }
>(
  `books/loadBooks`,
  async (_, {extra: api, rejectWithValue}) => {
    try {
      const response = await api.get(`/books`);
      return response.data;
    } catch (error) {
      return rejectWithValue(createErrorValue(error));
    }
  }
);

const addNewBook = createAsyncThunk<
  Promise<BookType | unknown>,
  NewBookType,
  {
    extra: AxiosInstance,
  }
>(
  `books/addNewBook`,
  async (newBook, {extra: api, rejectWithValue, getState}) => {
    try {
      const {books} = getState() as {books: BooksStateType};
      const booksCount: number = books.list.length;
      const lastBookId: string = books.list[booksCount - 1].id;

      const response = await api.post(`/books`, {
        newBook,
        lastBookId,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(createErrorValue(error));
    }
  }
);

const deleteBook = createAsyncThunk<
  Promise<string | unknown>,
  {
    bookId: string,
    cb: () => void,
  },
  {
    extra: AxiosInstance,
  }
>(
  `books/deleteBook`,
  async ({bookId, cb}, {extra: api, rejectWithValue}) => {
    try {
      const response = await api.delete(`/books/${bookId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(createErrorValue(error));''
    } finally {
      cb();
    }
  }
);


const booksSlice = createSlice({
  name: `books`,
  initialState,
  reducers: {
    resetBooksStatus: (state) => {state.status = null},
    resetAddNewBookError: (state) => {state.addNewError = null},
  },
  extraReducers: {
    // load
    [loadBooks.pending.toString()]: (state) => {
      state.status = FetchStatus.LOADING;
      state.loadError = null;
    },
    [loadBooks.fulfilled.toString()]: (state, action: PayloadAction<BookType[]>) => {
      state.status = FetchStatus.RESOLVED;
      state.list = createBooks(action.payload);
    },
    [loadBooks.rejected.toString()]: (state, action: PayloadAction<ErrorType>) => {
      state.status = FetchStatus.REJECTED;
      state.loadError = action.payload;
    },
    // addNewBook
    [addNewBook.pending.toString()]: (state) => {
      state.status = FetchStatus.WAIT;
      state.addNewError = null;
    },
    [addNewBook.rejected.toString()]: (state, action: PayloadAction<ErrorType>) => {
      state.status = FetchStatus.REJECTED;
      state.addNewError = action.payload;
    },
    [addNewBook.fulfilled.toString()]: (state, action: PayloadAction<BookType>) => {
      state.status = FetchStatus.RESOLVED;
      state.list.push(action.payload);
    },
    // deleteBook
    [deleteBook.pending.toString()]: (state) => {
      state.status = FetchStatus.WAIT;
      state.deleteError = null;
    },
    [deleteBook.rejected.toString()]: (state, action: PayloadAction<ErrorType>) => {
      state.status = FetchStatus.REJECTED;
      state.deleteError = action.payload;
    },
    [deleteBook.fulfilled.toString()]: (state, action: PayloadAction<string>) => {
      state.status = FetchStatus.RESOLVED;
      const bookId = action.payload;
      state.list = state.list.filter((book) => book.id !== bookId);
    },
  },
});

const {actions, reducer} = booksSlice;


export const {
  resetBooksStatus,
  resetAddNewBookError,
} = actions;

export {
  reducer,
  loadBooks,
  addNewBook,
  deleteBook,
};
