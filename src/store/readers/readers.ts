import {AxiosInstance} from "axios";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

import {FetchOperation, FetchStatus} from "../../const";
import {createReaders, ReaderDataType} from "../../adapters/reader";
import {createErrorValue} from "../../utils";
import type {ErrorType, ReaderType} from "../../types";


export interface ReadersStateType {
  list: ReaderType[],
  operation: string | null,
  status: string | null,
  error: ErrorType | null,
}


const initialState = {
  list: [],
  operation: null,
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
  reducers: {},
  extraReducers: {
    [loadReaders.pending.toString()]: (state) => {
      state.operation = FetchOperation.LOAD;
      state.status = FetchStatus.LOADING;
      state.error = null;
    },
    [loadReaders.fulfilled.toString()]: (state, action: PayloadAction<ReaderType[]>) => {
      state.status = FetchStatus.RESOLVED;
      state.list = createReaders(action.payload);
    },
    [loadReaders.rejected.toString()]: (state, action: PayloadAction<ErrorType>) => {
      state.status = FetchStatus.REJECTED;
      state.error = action.payload;
    },
  },
});

const {reducer} = readersSlice;


export {
  reducer,
  loadReaders,
};
