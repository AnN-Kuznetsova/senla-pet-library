import {AxiosInstance} from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {FetchStatus} from "../../api";
import {ReaderType} from "../../types";
import {createReaders, ReaderDataType} from "../../adapters/reader";


interface ReadersStateType {
  list: ReaderType[],
  status: string | null,
  error: string | null,
}


const initialState = {
  list: [],
  status: null,
  error: null,
} as ReadersStateType;

const fetchReaders = createAsyncThunk(
  `readers/fetchReaders`,
  async (api: AxiosInstance, {rejectWithValue}): Promise<ReaderDataType[] | unknown> => {
    try {
      const response = await api.get(`/readers`);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

const readersSlice = createSlice({
  name: `readers`,
  initialState,
  reducers: {
    //loadReaders: (state, action) => state = action.payload,
  },
  extraReducers: {
    [fetchReaders.pending.toString()]: (state) => {
      state.status = FetchStatus.LOADING;
      state.error = null;
    },
    [fetchReaders.fulfilled.toString()]: (state, action) => {
      state.status = FetchStatus.RESOLVED;
      state.list = createReaders(action.payload);
    },
    [fetchReaders.rejected.toString()]: (state, action) => {
      state.status = FetchStatus.REJECTED;
      state.error = action.payload;
    },
  },
});

const {/* actions, */ reducer} = readersSlice;


/* export const {
  loadReaders,
} = actions; */

export {
  reducer,
  fetchReaders,
};
