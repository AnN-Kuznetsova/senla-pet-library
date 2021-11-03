import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import { FetchStatus } from "../../api";


const fetchReaders = createAsyncThunk(
  `readers/fetchReaders`,
  async (api, {rejectWithValue}) => {
    try {
      const response = await api.get(`/readers`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const readersSlice = createSlice({
  name: `readers`,
  initialState: {
    list: [],
    status: null,
    error: null,
  },
  /* reducers: {
    loadReaders: (state, action) => state = action.payload,
  }, */
  extraReducers: {
    [fetchReaders.rejected]: (state, action) => {
      state.status = FetchStatus.LOADING;
      state.error = null;
    },
    [fetchReaders.fulfilled]: (state, action) => {
      state.status = FetchStatus.RESOLVED;
      state.list = action.payload;
    },
    [fetchReaders.rejected]: (state, action) => {
      state.status = FetchStatus.REJECTED;
      state.error = action.payload;
    },
  },
});

const {actions, reducer} = readersSlice;


export const {
  loadReaders,
} = actions;

export {
  reducer,
  fetchReaders,
};
