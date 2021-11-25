import {AxiosInstance} from "axios";
import {configureStore} from "@reduxjs/toolkit";

import {reducer as applicationReducer} from "./application/application";
import {reducer as booksReducer} from "./books/books";
import {reducer as readersReducer} from "./readers/readers";


export const createStore = (api: AxiosInstance) => {
  return configureStore({
   reducer: {
     books: booksReducer,
     readers: readersReducer,
     application: applicationReducer,
  },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
    thunk: {
      extraArgument: api,
    },
  }),
   devTools: process.env.NODE_ENV !== `production`,
 });
};
