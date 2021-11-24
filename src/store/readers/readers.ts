import {AxiosInstance} from "axios";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

import {FetchStatus} from "../../api";
import {createReaders, ReaderDataType} from "../../adapters/reader";
import {createErrorValue} from "../../utils";
import type {ErrorType, ReaderType} from "../../types";


interface ReadersStateType {
  list: ReaderType[],
  status: string | null,
  error: ErrorType | null,
}


const initialState = {
  list: [],
  status: null,
  error: null,
} as ReadersStateType;

const loadReaders = createAsyncThunk<
Promise<ReaderDataType[] | unknown>,
  void,
  {
    extra: AxiosInstance
  }
>(
  `readers/loadReaders`,
  async (_, {extra: api, rejectWithValue}) => {
    try {
      const response = await api.get(`/readers`);
      return response.data;
    } catch (error) {
      return rejectWithValue(createErrorValue(error));
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
    [loadReaders.pending.toString()]: (state) => {
      state.status = FetchStatus.LOADING;
      state.error = null;
    },
    [loadReaders.fulfilled.toString()]: (state, action: PayloadAction<ReaderType[]>) => {
      state.status = FetchStatus.RESOLVED; //FETCH_RESOLVED;
      state.list = createReaders(action.payload);
    },
    [loadReaders.rejected.toString()]: (state, action: PayloadAction<ErrorType>) => {
      state.status = FetchStatus.FETCH_REJECTED;
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
  loadReaders,
};
