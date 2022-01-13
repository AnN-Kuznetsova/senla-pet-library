import MockAdapter from "axios-mock-adapter";

import {BooksStateType, loadBooks, reducer, resetBooksStatus} from "./books";
import {FetchOperation, FetchStatus} from "../../const";
import {createAPI} from "../../api";
import { createStore } from "../store";


global.window = Object.create(window);
const url = `http://localhost`;
Object.defineProperty(window, `location`, {
  value: {
    href: url
  }
});


const dispatch = jest.fn();

const api = createAPI();
const apiMock = new MockAdapter(api);

const store = createStore(api);


describe(`Books reducer`, () => {
  test(`should return the initial state`, () => {
    const initialState: BooksStateType = {
      ids: [],
      entities: {},
      operation: null,
      status: null,
      error: null,
    };

    expect(reducer(undefined, {type: ``})).toEqual(initialState);
  });

  test(`should reset books status`, () => {
    const state: BooksStateType = {
      ids: [],
      entities: {},
      operation: `operation`,
      status: `status`,
      error: null,
    };

    const resultState: BooksStateType = {
      ids: [],
      entities: {},
      operation: null,
      status: null,
      error: null,
    };

    expect(reducer(state, resetBooksStatus())).toEqual(resultState);
  });
});


describe(`Books extraReducers`, () => {
  const initialState: BooksStateType = {
    ids: [],
    entities: {},
    operation: null,
    status: null,
    error: null,
  };

  test(`should put correct info for loadBooks pending`, /* async */ () => {
    const actionPending = {
      type: loadBooks.pending.type,
    };

    let state = /* await */ reducer(initialState, actionPending);

    expect(state).toEqual({
      ...initialState,
      operation: FetchOperation.LOAD,
      status: FetchStatus.LOADING,
    });
  // });
//
  // test(`should correct load books`, async () => {
    const mockResponseData = [
      {
        "id": "b1",
        "title": "The Hound of the Baskervilles",
        "autor": "Arthur Conan Doyle",
        "coverImgUrl": "./assets/img/hound.jpg"
      },
      {
        "id": "b2",
        "title": "The Adventures of Sherlock Holmes",
        "autor": "Arthur Conan Doyle",
        "coverImgUrl": "./assets/img/Adventures_of_sherlock_holmes.jpg"
      },
      {
        "id": "b3",
        "title": "The Old Man And The Sea",
        "autor": "Ernest Hemingway",
        "coverImgUrl": "./assets/img/old_man_and_sea_book.jpg"
      }
    ];

    const actionFulfilled = {
      type: loadBooks.fulfilled.type,
      payload: mockResponseData,
    };

    const resultState: BooksStateType = {
      ids: ["b1","b2","b3"],
      entities: {
        b1: {
          id: "b1",
          title: "The Hound of the Baskervilles",
          autor: "Arthur Conan Doyle",
          coverImgUrl: "./assets/img/hound.jpg",
        },
        b2: {
          id: "b2",
          title: "The Adventures of Sherlock Holmes",
          autor: "Arthur Conan Doyle",
          coverImgUrl: "./assets/img/Adventures_of_sherlock_holmes.jpg",
        },
        b3: {
          id: "b3",
          title: "The Old Man And The Sea",
          autor: "Ernest Hemingway",
          coverImgUrl: "./assets/img/old_man_and_sea_book.jpg",

        }
      },
      operation: FetchOperation.LOAD,
      status: FetchStatus.RESOLVED,
      error: null,
    };

    apiMock
      .onGet(`/books`)
      .reply(200, mockResponseData);

    const response = /* await */ loadBooks();

    // reducer(initialState, loadBooks())
    // console.log(response);

    state = /* await */ reducer(state, actionFulfilled);

    expect(state).toEqual(resultState);
  });
});



// describe(`Books operations (fetch) work correctly`, () => {
//   test(`"loadBooks" should make a correct API call for saccess get request`, async () => {
//     const booksLoader = loadBooks();

//     await const books = loadBooks()
//   });
// });
