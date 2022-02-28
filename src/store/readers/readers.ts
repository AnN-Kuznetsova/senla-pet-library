import {AxiosInstance} from "axios";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  isPending,
  isRejected,
  PayloadAction,
} from "@reduxjs/toolkit";

import {FetchOperation, FetchStatus} from "../../const";
import {createReader, createReaders, ReaderDataType, toRAWReader} from "../../adapters/reader";
import {createErrorValue} from "../../utils";
import type {ErrorType, ReaderType} from "../../types";
import type {RootStateType} from "../..";


export interface ReadersStateType {
  ids: string[];
  entities: {
    [key: string]: ReaderType;
  };
  operation: FetchOperation | null;
  status: FetchStatus | null;
  error: ErrorType | null;
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
    extra: AxiosInstance;
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
    extra: AxiosInstance;
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


const isARejectedAction = isRejected(loadReaders, updateReader);
const isAPendingAction = isPending(loadReaders, updateReader);


const readersSlice = createSlice({
  name: `readers`,
  initialState,
  reducers: {
    resetReadersStatus: (state) => {
      state.operation = null;
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // load
      .addCase(
        loadReaders.pending.toString(),
        (state) => { state.operation = FetchOperation.LOAD }
      )
      .addCase(
        loadReaders.fulfilled.toString(),
        (state, action: PayloadAction<ReaderDataType[]>) => {
          state.status = FetchStatus.RESOLVED;
          readersAdapter.setAll(state, createReaders(action.payload));
        }
      )
      // updateReader
      .addCase(
        updateReader.pending.toString(),
        (state) => { state.operation = FetchOperation.UPDATE }
      )
      .addCase(
        updateReader.fulfilled.toString(),
        (state, action: PayloadAction<ReaderDataType>) => {
          state.status = FetchStatus.RESOLVED;
          const {id, ...newData} = createReader(action.payload);
          readersAdapter.updateOne(state, {id, changes: newData});
        }
      )
      // PendingAction
      .addMatcher(
        isAPendingAction,
        (state) => {
          state.status = FetchStatus.LOADING;
          state.error = null;
        }
      )
      // RejectedAction
      .addMatcher(
        isARejectedAction,
        (state, action) => {
          state.status = FetchStatus.REJECTED;
          state.error = Object.assign({status: null}, action.payload);
        }
      );
  },
});

const {reducer, actions} = readersSlice;


export const {
  resetReadersStatus,
} = actions;

export {
  reducer,
  loadReaders,
  updateReader,
};
