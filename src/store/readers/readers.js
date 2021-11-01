import {createSlice} from "@reduxjs/toolkit";


const readersSlice = createSlice({
  name: `readers`,
  initialState: [],
  reducers: {
    loadReaders: (state, action) => state = action.payload,
  },
});

const {actions, reducer} = readersSlice;


export const {
  loadReaders,
} = actions;

export {
  reducer
};
