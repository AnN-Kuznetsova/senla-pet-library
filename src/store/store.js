import {configureStore} from '@reduxjs/toolkit';

import {reducer as booksReducer} from './books/books';
import {reducer as readersReducer} from './readers/readers';


const middleware = (getDefaultMiddleware) => getDefaultMiddleware({
  immutableCheck: false,
  serializableCheck: false,
  thunk: true,
});

export const store = configureStore({
  reducer: {
    books: booksReducer,
    readers: readersReducer,
 },
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
});
