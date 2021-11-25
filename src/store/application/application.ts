import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export interface FilterType {
  [key: string]: string,
}

interface ApplicationStateType {
  booksFilters: FilterType,
}


const initialState = {
  booksFilters: {},
} as ApplicationStateType;


const applicationSlice = createSlice({
  name: `application`,
  initialState,
  reducers: {
    setBooksFilter: (state, action: PayloadAction<FilterType>) => {state.booksFilters = Object.assign(state.booksFilters, action.payload)},
  },
});

const {actions, reducer} = applicationSlice;


export const {
  setBooksFilter,
} = actions;

export {
  reducer,
};
