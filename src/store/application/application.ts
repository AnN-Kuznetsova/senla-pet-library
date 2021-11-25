import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export interface BooksFiltersType {
  title: string,
  autor: string,
}

interface ApplicationStateType {
  booksFilters: BooksFiltersType,
}


const initialState = {
  booksFilters: {
    title: "",
    autor: "",
  },
} as ApplicationStateType;


const applicationSlice = createSlice({
  name: `application`,
  initialState,
  reducers: {
    setBooksTitleFilter: (state, action: PayloadAction<string>) => {state.booksFilters.title = action.payload},
    setBooksAutorFilter: (state, action: PayloadAction<string>) => {state.booksFilters.autor = action.payload},
  },
});

const {actions, reducer} = applicationSlice;


export const {
  setBooksAutorFilter,
  setBooksTitleFilter,
} = actions;

export {
  reducer,
};
