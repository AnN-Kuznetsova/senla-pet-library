import React from "react";
import ReactDom from "react-dom";
import {Provider} from "react-redux";

import {App} from "./components/app";
import {createAPI} from "./api";
import {loadBooks} from "./store/books/books";
import {loadReaders} from "./store/readers/readers";
import {store} from "./store/store";


const onFailRequest = (error) => {
  // обработать ошибку загрузки данных
};

const api = createAPI(onFailRequest);

const renderDom = () => {
  ReactDom.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
  );
};

const books = store.dispatch(loadBooks(require(`./mocks/books.json`)));
const readers = store.dispatch(loadReaders(require(`./mocks/readers.json`)));

renderDom();
