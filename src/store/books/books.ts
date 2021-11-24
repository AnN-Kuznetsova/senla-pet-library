import {AxiosInstance} from "axios";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

import {FetchStatus} from "../../api";
import {createBooks} from "../../adapters/book";
import {createErrorValue} from "../../utils";
import type {BookType, ErrorType, NewBookType} from "../../types";


interface BooksStateType {
  list: BookType[],
  status: string | null,
  error: ErrorType | null,
}

const initialState = {
  list: [],
  status: null,
  error: null,
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
      const lastBookId: string = booksCount ? books.list[booksCount - 1].id : null;

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

const updateBook = createAsyncThunk<
  Promise<BookType | unknown>,
  {
    book: BookType,
    onSubmit: () => void,
  },
  {
    extra: AxiosInstance,
  }
>(
  `books/updateBook`,
  async ({book, onSubmit}, {extra: api, rejectWithValue}) => {
    try {
      const response = await api.put(`/books/${book.id}`, book);
      onSubmit();
      return response.data;
    } catch (error) {
      return rejectWithValue(createErrorValue(error));
    }
  }
);


const booksSlice = createSlice({
  name: `books`,
  initialState,
  reducers: {
    resetBooksStatus: (state) => {state.status = null},
  },
  extraReducers: {
    // load
    [loadBooks.pending.toString()]: (state) => {
      state.status = FetchStatus.LOADING;
      state.error = null;
    },
    [loadBooks.fulfilled.toString()]: (state, action: PayloadAction<BookType[]>) => {
      state.status = FetchStatus.RESOLVED;
      state.list = createBooks(action.payload);
    },
    [loadBooks.rejected.toString()]: (state, action: PayloadAction<ErrorType>) => {
      state.status = FetchStatus.FETCH_REJECTED;
      state.error = action.payload;
    },
    // addNewBook
    [addNewBook.pending.toString()]: (state) => {
      state.status = FetchStatus.WAIT;
      state.error = null;
    },
    [addNewBook.rejected.toString()]: (state, action: PayloadAction<ErrorType>) => {
      state.status = FetchStatus.REJECTED;
      state.error = action.payload;
    },
    [addNewBook.fulfilled.toString()]: (state, action: PayloadAction<BookType>) => {
      state.status = FetchStatus.ADD_NEW_RESOLVED;
      state.list.push(action.payload);
    },
    // deleteBook
    [deleteBook.pending.toString()]: (state) => {
      state.status = FetchStatus.WAIT;
      state.error = null;
    },
    [deleteBook.rejected.toString()]: (state, action: PayloadAction<ErrorType>) => {
      state.status = FetchStatus.DELETE_REJECTED;
      state.error = action.payload;
    },
    [deleteBook.fulfilled.toString()]: (state, action: PayloadAction<string>) => {
      state.status = FetchStatus.RESOLVED;
      const bookId = action.payload;
      state.list = state.list.filter((book) => book.id !== bookId);
    },
    // updateBook
    [updateBook.pending.toString()]: (state) => {
      state.status = FetchStatus.WAIT;
      state.error = null;
    },
    [updateBook.rejected.toString()]: (state, action: PayloadAction<ErrorType>) => {
      state.status = FetchStatus.REJECTED;
      state.error = action.payload;
    },
    [updateBook.fulfilled.toString()]: (state, action: PayloadAction<BookType>) => {
      state.status = FetchStatus.RESOLVED;
      const newBookData = action.payload;
      const booksList = state.list;
      const updatedBookIndex = booksList.findIndex((book) => book.id === newBookData.id);
      state.list = [...booksList.slice(0, updatedBookIndex), newBookData, ...booksList.slice(updatedBookIndex + 1)];
    },
  },
});

const {actions, reducer} = booksSlice;


export const {
  resetBooksStatus,
} = actions;

export {
  reducer,
  loadBooks,
  addNewBook,
  deleteBook,
  updateBook,
};
