import * as React from "react";
import * as ReactDom from "react-dom";
import {Provider} from "react-redux";

import {App} from "./components/app";
import {createAPI} from "./api";
import {fetchBooks} from "./store/books/books";
import {fetchReaders} from "./store/readers/readers";
import {store} from "./store/store";


const api = createAPI();

const renderDom = () => {
  ReactDom.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
  );
};


const booksLoader = store.dispatch(fetchBooks(api));
const readersLoader = store.dispatch(fetchReaders(api));

renderDom();
