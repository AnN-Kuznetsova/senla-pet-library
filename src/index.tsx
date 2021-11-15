import * as React from "react";
import * as ReactDom from "react-dom";
import {Provider} from "react-redux";

import {App} from "./components/app";
import {createAPI} from "./api";
import {fetchBooks} from "./store/books/books";
import {fetchReaders} from "./store/readers/readers";
import {createStore} from "./store/store";


const api = createAPI();
const store = createStore(api);


const renderDom = () => {
  ReactDom.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
  );
};


store.dispatch(fetchBooks());
store.dispatch(fetchReaders());

renderDom();


export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;
