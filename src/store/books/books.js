import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";


const fetchBooks = createAsyncThunk(
  `books/fetchBooks`,
  async (api, thunkAPI) => {
    const response = await api.get(`/books`);
    return response.data;
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
    promoBook: null,
  },
  reducers: {
    // loadBooks: (state, action) => {state.list = action.payload},
  },
  extraReducers: {
    [fetchBooks.fulfilled]: (state, action) => {
      state.list = action.payload;
    },
    [fetchBooks.rejected]: (state, action) => {},
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
