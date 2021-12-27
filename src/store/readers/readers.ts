import {AxiosInstance} from "axios";
import {createAsyncThunk, createEntityAdapter, createSlice, PayloadAction} from "@reduxjs/toolkit";

import {FetchOperation, FetchStatus} from "../../const";
import {createReader, createReaders, ReaderDataType, toRAWReader} from "../../adapters/reader";
import {createErrorValue} from "../../utils";
import type {ErrorType, ReaderType} from "../../types";
import type {RootStateType} from "../..";


export interface ReadersStateType {
  ids: string[],
  entities: {
    [key: string]: ReaderType,
  },
  operation: string | null,
  status: string | null,
  error: ErrorType | null,
}

export const readersAdapter = createEntityAdapter();
const initialState = readersAdapter.getInitialState({
  operation: null,
  status: null,
  error: null,
}) as ReadersStateType;

export const readersSelectors = readersAdapter.getSelectors(
  (state: RootStateType) => state.readers
);


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

const updateReader = createAsyncThunk<
  Promise<ReaderType | unknown>,
  ReaderType,
  {
    extra: AxiosInstance,
  }
>(
  `readers/updateReader`,
  async (reader, {extra: api, rejectWithValue}) => {
    try {
      const responce = await api.put(`/readers/${reader.id}`, toRAWReader(reader));
      return responce.data;
    } catch (error) {
      return rejectWithValue(createErrorValue(error));
    }
  }
);


const readersSlice = createSlice({
  name: `readers`,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // load
      .addCase(
        loadReaders.pending.toString(),
        (state) => {
          state.operation = FetchOperation.LOAD;
          state.status = FetchStatus.LOADING;
          state.error = null;
        }
      )
      .addCase(
        loadReaders.fulfilled.toString(),
        (state, action: PayloadAction<ReaderDataType[]>) => {
          state.status = FetchStatus.RESOLVED;
          readersAdapter.setAll(state, createReaders(action.payload));
        }
      )
      .addCase(
        loadReaders.rejected.toString(),
        (state, action: PayloadAction<ErrorType>) => {
          state.status = FetchStatus.REJECTED;
          state.error = action.payload;
        }
      )
      // updateReader
      .addCase(
        updateReader.pending.toString(),
        (state) => {
          state.operation = FetchOperation.UPDATE;
          state.status = FetchStatus.LOADING;
          state.error = null;
        }
      )
      .addCase(
        updateReader.rejected.toString(),
        (state, action: PayloadAction<ErrorType>) => {
          state.status = FetchStatus.REJECTED;
          state.error = action.payload;
        }
      )
      .addCase(
        updateReader.fulfilled.toString(),
        (state, action: PayloadAction<ReaderDataType>) => {
          state.status = FetchStatus.RESOLVED;
          const {id, ...newData} = createReader(action.payload);
          readersAdapter.updateOne(state, {id, changes: newData});
        }
      );
  },
});

const {reducer} = readersSlice;


export {
  reducer,
  loadReaders,
  updateReader,
};
