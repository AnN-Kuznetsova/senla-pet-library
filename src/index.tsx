import "./assets/styles/style.scss";

import * as React from "react";
import * as ReactDom from "react-dom";
import {Provider} from "react-redux";

import {App} from "./components/app";
import {createAPI} from "./api";
import {loadBooks} from "./store/books/books";
import {loadReaders} from "./store/readers/readers";
import {createStore} from "./store/store";


const api = createAPI();
const store = createStore(api);


const renderDom = (): void => {
  ReactDom.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
  );
};


store.dispatch(loadBooks());
store.dispatch(loadReaders());

renderDom();


export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;


// задачка с анаграммами

/* const str = `адрес карп кума куст мир мука парк рим среда стук рост сорт трос`;

function getAnagrams(str: string) {
  const array = str.split(` `);
  const anagrams: Array<string[]> = [];

  function foo (arr: string[]) {
    const newArr = [...arr];
    const comparisonStr = arr[0].split(``).sort().join();
    anagrams.push([]);

    for (let i = arr.length - 1; i >= 0; i--) {
      if (arr[i].split(``).sort().join() ===  comparisonStr) {
        anagrams[anagrams.length - 1].push(...newArr.splice(i, 1));
      }
    }

    if (newArr.length > 0) {
      foo(newArr);
    }
  }

  foo(array);
  console.log(anagrams);
}

getAnagrams(str); */
