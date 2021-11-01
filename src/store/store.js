import {configureStore} from '@reduxjs/toolkit';

import {reducer as booksReducer} from './books/books';


const middleware = (getDefaultMiddleware) => getDefaultMiddleware({
  immutableCheck: false,
  serializableCheck: false,
  thunk: true,
});

export const store = configureStore({
 reducer: {booksReducer},
 middleware,
 devTools: process.env.NODE_ENV !== 'production',
});
