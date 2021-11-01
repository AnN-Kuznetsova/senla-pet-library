import {createSlice} from "@reduxjs/toolkit";


const booksSlice = createSlice({
  name: `books`,
  initialState: [],
  reducers: {
    loadBooks: (state, action) => state = action.payload,
  },
});

const {actions, reducer} = booksSlice;


export const {
  loadBooks,
} = actions;

export {
  reducer
};
