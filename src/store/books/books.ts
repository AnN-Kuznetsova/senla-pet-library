import {AxiosInstance} from "axios";
import {createAsyncThunk, createEntityAdapter, createSlice, EntityId, PayloadAction} from "@reduxjs/toolkit";

import {FetchOperation, FetchStatus} from "../../const";
import {createBook, createBooks, toRAWBook} from "../../adapters/book";
import {createErrorValue} from "../../utils";
import type {BookType, ErrorType} from "../../types";
import type {BookDataType} from "../../adapters/book";
import type {RootStateType} from "../..";


export interface BooksStateType {
  ids: string[],
  entities: {
    [key: string]: BookType,
  },
  operation: string | null,
  status: string | null,
  error: ErrorType | null,
}

export const booksAdapter = createEntityAdapter();
const initialState = booksAdapter.getInitialState({
  operation: null,
  status: null,
  error: null,
}) as BooksStateType;

export const booksSelectors = booksAdapter.getSelectors(
  (state: RootStateType) => state.books
);


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
  BookType,
  {
    extra: AxiosInstance,
  }
>(
  `books/addNewBook`,
  async (newBook, {extra: api, rejectWithValue, getState}) => {
    try {
      const state = getState() as RootStateType;
      const bookIds: EntityId[] = booksSelectors.selectIds(state);
      const booksCount: number = booksSelectors.selectTotal(state);
      const lastBookId: EntityId = booksCount ? bookIds[booksCount - 1] : null;
      const rawNewBook = toRAWBook(newBook);

      const response = await api.post(`/books`, {
        rawNewBook,
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
  string,
  {
    extra: AxiosInstance,
  }
>(
  `books/deleteBook`,
  async (bookId, {extra: api, rejectWithValue}) => {
    try {
      const response = await api.delete(`/books/${bookId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(createErrorValue(error));''
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
      const response = await api.put(`/books/${book.id}`, toRAWBook(book));
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
    resetBooksStatus: (state) => {
      state.operation = null;
      state.status = null;
    },
  },
  extraReducers: {
    // load
    [loadBooks.pending.toString()]: (state) => {
      state.operation = FetchOperation.LOAD;
      state.status = FetchStatus.LOADING;
      state.error = null;
    },
    [loadBooks.fulfilled.toString()]: (state, action: PayloadAction<BookDataType[]>) => {
      state.status = FetchStatus.RESOLVED;
      booksAdapter.setAll(state, createBooks(action.payload));
    },
    [loadBooks.rejected.toString()]: (state, action: PayloadAction<ErrorType>) => {
      state.status = FetchStatus.REJECTED;
      state.error = action.payload;
    },
    // addNewBook
    [addNewBook.pending.toString()]: (state) => {
      state.operation = FetchOperation.ADD_NEW;
      state.status = FetchStatus.LOADING;
      state.error = null;
    },
    [addNewBook.rejected.toString()]: (state, action: PayloadAction<ErrorType>) => {
      state.status = FetchStatus.REJECTED;
      state.error = action.payload;
    },
    [addNewBook.fulfilled.toString()]: (state, action: PayloadAction<BookDataType>) => {
      state.status = FetchStatus.RESOLVED;
      booksAdapter.setOne(state, createBook(action.payload));
    },
    // deleteBook
    [deleteBook.pending.toString()]: (state) => {
      state.operation = FetchOperation.DELETE;
      state.status = FetchStatus.LOADING;
      state.error = null;
    },
    [deleteBook.rejected.toString()]: (state, action: PayloadAction<ErrorType>) => {
      state.status = FetchStatus.REJECTED;
      state.error = action.payload;
    },
    [deleteBook.fulfilled.toString()]: (state, action: PayloadAction<string>) => {
      state.status = FetchStatus.RESOLVED;
      const bookId = action.payload;
      booksAdapter.removeOne(state, bookId);
    },
    // updateBook
    [updateBook.pending.toString()]: (state) => {
      state.operation = FetchOperation.UPDATE;
      state.status = FetchStatus.LOADING;
      state.error = null;
    },
    [updateBook.rejected.toString()]: (state, action: PayloadAction<ErrorType>) => {
      state.status = FetchStatus.REJECTED;
      state.error = action.payload;
    },
    [updateBook.fulfilled.toString()]: (state, action: PayloadAction<BookDataType>) => {
      state.status = FetchStatus.RESOLVED;
      const {id, ...newData} = createBook(action.payload);
      booksAdapter.updateOne(state, {id, changes: newData});
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
