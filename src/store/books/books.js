import {createSlice} from "@reduxjs/toolkit";


const booksSlice = createSlice({
  name: `books`,
  initialState: {
    list: [],
    promoBook: null,
  },
  reducers: {
    loadBooks: (state, action) => {state.list = action.payload},
  },
});

const {actions, reducer} = booksSlice;


export const {
  loadBooks,
} = actions;

export {
  reducer
};
