import * as React from "react";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {DecoratorFn} from "@storybook/react";

import {createBooks} from "../../adapters/book";
import {createReaders} from "../../adapters/reader";
import type {BookType, ReaderType} from "../../types";
import type {BooksStateType} from "../../store/books/books";
import type {ReadersStateType} from "../../store/readers/readers";

const books = createBooks([
  {
    "id": "b1",
    "title": "The Hound of the Baskervilles",
    "autor": "Arthur Conan Doyle",
    "coverImgUrl": "./assets/img/hound.jpg",
  },
  {
    "id": "b2",
    "title": "The Adventures of Sherlock Holmes",
    "autor": "Arthur Conan Doyle",
    "coverImgUrl": "./assets/img/Adventures_of_sherlock_holmes.jpg",
  },
  {
    "id": "b3",
    "title": "The Old Man And The Sea",
    "autor": "Ernest Hemingway",
    "coverImgUrl": "./assets/img/old_man_and_sea_book.jpg",
  },
  {
    "id": "b4",
    "title": "Robinson Crusoe",
    "autor": "Daniel Defoe",
    "coverImgUrl": "./assets/img/Robinson_Cruose_1719_1st_edition.jpg",
  },
  {
    "id": "b5",
    "title": "Jane Eyre",
    "autor": "Charlotte Bronte",
    "coverImgUrl": "./assets/img/Jane_Eyre.jpg",
  },
]);

const readers = createReaders([
  {
    "id": "r1",
    "name": "Ivan",
    "age": "25",
    "books": [],
  },
  {
    "id": "r2",
    "name": "Vladimir",
    "age": "39",
    "books": [
      {
        "id": "b1",
        "dateOfTaking": "2021-11-20",
      },
      {
        "id": "b2",
        "dateOfTaking": "2021-09-20",
      },
      {
        "id": "b3",
        "dateOfTaking": "2021-10-31",
      },
    ],
  },
  {
    "id": "r3",
    "name": "Nikolay",
    "age": "18",
    "books": [],
  },
]);

const createInitialState = <
  StateType extends {ids: string[]; entities: object},
  Type extends {id: string}
>(
    state: StateType,
    entities: Array<Type>
  ): void => {
  entities.forEach((entitie) => {
    state.ids.push(entitie.id);

    Object.assign(state.entities, {
      [entitie.id]: entitie,
    });
  });
};

const booksState: BooksStateType = {
  ids: [],
  entities: {},
  operation: null,
  status: null,
  error: null,
};

const readersState: ReadersStateType = {
  ids: [],
  entities: {},
  operation: null,
  status: null,
  error: null,
};

createInitialState<BooksStateType, BookType>(booksState, books);
createInitialState<ReadersStateType, ReaderType>(readersState, readers);


const mockStore = configureStore([]);

const store = mockStore({
  books: booksState,
  readers: readersState,
});


export const withMockRedux: DecoratorFn = (Story) => {
  return (
    <Provider store={store}>
      <Story />
    </Provider>
  );
};
