import MockAdapter from "axios-mock-adapter";

import {BooksStateType, loadBooks, reducer, resetBooksStatus} from "./books";
import {FetchOperation, FetchStatus} from "../../const";
import {createAPI} from "../../api";


global.window = Object.create(window);
const url = `http://localhost`;
Object.defineProperty(window, `location`, {
  value: {
    href: url,
  },
});


const dispatch = jest.fn();

const api = createAPI();
const apiMock = new MockAdapter(api);


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
      operation: FetchOperation.LOAD,
      status: FetchStatus.REJECTED,
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
  let initialState: BooksStateType;

  beforeEach(() => {
    initialState = {
      ids: [],
      entities: {},
      operation: null,
      status: null,
      error: null,
    };
  });


  test(`should put correct info for loadBooks pending`, async () => {
    const actionPending = {
      type: loadBooks.pending.type,
    };

    const state = reducer(initialState, actionPending);

    expect(state).toEqual({
      ...initialState,
      operation: FetchOperation.LOAD,
      status: FetchStatus.LOADING,
    });
  });


  test(`should correct load books`, async () => {
    let state: BooksStateType = {
      ...initialState,
      operation: FetchOperation.LOAD,
      status: FetchStatus.LOADING,
    }

    const mockResponseData = [
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
    ];

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

        },
      },
      operation: FetchOperation.LOAD,
      status: FetchStatus.RESOLVED,
      error: null,
    };

    apiMock
      .onGet(`/books`)
      .reply(200, mockResponseData);

    const responseAction = await loadBooks()(dispatch, ()=>{/**/}, api);
    state = reducer(state, responseAction);

    expect(state).toEqual(resultState);
  });


  test(`should reject with error`, async () => {
    let state: BooksStateType = {
      ...initialState,
      operation: FetchOperation.LOAD,
      status: FetchStatus.LOADING,
    }

    apiMock
      .onGet(`/books`)
      .reply(400);

    const responseAction = await loadBooks()(dispatch, ()=>{/**/}, api);
    state = reducer(state, responseAction);

    expect(state.ids).toEqual([]);
    expect(state.entities).toEqual({});
    expect(state.operation).toBe(FetchOperation.LOAD);
    expect(state.status).toBe(FetchStatus.REJECTED);
    expect(state.error).toBeTruthy();
  });
});
