import {AxiosInstance} from "axios";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

import {BookType, ErrorType, NewBookType} from "../../types";
import {FetchStatus} from "../../api";
import {createBooks} from "../../adapters/book";
import {createErrorValue} from "../../utils";


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


const fetchBooks = createAsyncThunk<
  Promise<BookType[] | unknown>,
  void,
  {
    extra: AxiosInstance
  }
>(
  `books/fetchBooks`,
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
  Promise<BookType | unknown>,
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


const booksSlice = createSlice({
  name: `books`,
  initialState,
  reducers: {
    // loadBooks: (state, action) => {state.list = action.payload},
    // addNewBook: (state, action: PayloadAction<BookType>) => {state.list.push(action.payload)},
  },
  extraReducers: {
    [fetchBooks.pending.toString()]: (state) => {
      state.status = FetchStatus.LOADING;
      state.error = null;
    },
    [fetchBooks.fulfilled.toString()]: (state, action: PayloadAction<BookType[]>) => {
      state.status = FetchStatus.RESOLVED;
      state.list = createBooks(action.payload);
    },
    [fetchBooks.rejected.toString()]: (state, action: PayloadAction<ErrorType>) => {
      state.status = FetchStatus.REJECTED;
      state.error = action.payload;
    },
    //[addNewBook.pending.toString()]: (state) => {},
    //[addNewBook.rejected.toString()]: (state, action: PayloadAction<ErrorType>) => {},
    [addNewBook.fulfilled.toString()]: (state, action: PayloadAction<BookType>) => {
      state.list.push(action.payload);
    },
    //[deleteBook.pending.toString()]: (state) => {},
    //[deleteBook.rejected.toString()]: (state, action: PayloadAction<ErrorType>) => {},
    [deleteBook.fulfilled.toString()]: (state, action: PayloadAction<string>) => {
      const bookId = action.payload;
      state.list = state.list.filter((book) => book.id !== bookId);
    },
  },
});

const {/* actions, */ reducer} = booksSlice;


/* export const {
  // loadBooks,
  //addNewBook,
} = actions; */

export {
  reducer,
  fetchBooks,
  addNewBook,
  deleteBook,
};
