import React from "react";
import ReactDom from "react-dom";
import {Provider} from "react-redux";

import {App} from "./components/app";
import {loadBooks} from "./store/books/books";
import {loadReaders} from "./store/readers/readers";
import {store} from "./store/store";


const books = store.dispatch(loadBooks(require(`./mocks/books.json`)));
const readers = store.dispatch(loadReaders(require(`./mocks/readers.json`)));

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector(`#root`)
);
