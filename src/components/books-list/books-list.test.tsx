import * as React from "react";
import * as moment from "moment";
import configureStore from "redux-mock-store";
import {Provider} from 'react-redux'
import {mount} from "enzyme";

import {BooksList, BooksListMode} from "./books-list";

const mockStore = configureStore([]);
const store = mockStore({
  books: {
    ids: ["b1","b2","b3"],
      entities: {
        b1: {
          id: "b1",
          title: "The Hound of the Baskervilles",
          autor: "Arthur Conan Doyle",
          coverImgUrl: "",
        },
        b2: {
          id: "b2",
          title: "The Adventures of Sherlock Holmes",
          autor: "Arthur Conan Doyle",
          coverImgUrl: "",
        },
        b3: {
          id: "b3",
          title: "The Old Man And The Sea",
          autor: "Ernest Hemingway",
          coverImgUrl: "",

        }
      },
      operation: null,
      status: null,
      error: null,
  },
  readers: {
    ids: ["r1"],
    entities: {
      r1: {
        id: "r1",
        name: "Reader 1",
        age: "25",
        books: [{
          id: "b2",
          dateOfTaking: moment("2021-10-31"),
        }],
      },
    },
    operation: null,
    status: null,
    error: null,
  },
});

describe(`BooksList`, () => {
  test(`Should render correct books list at BooksListMode === DEFAULT`, () => {
    const props = {
      books: [
        {
          id: "b1",
          title: "The Hound of the Baskervilles",
          autor: "Arthur Conan Doyle",
          coverImgUrl: "",
        },
        {
          id: "b2",
          title: "The Adventures of Sherlock Holmes",
          autor: "Arthur Conan Doyle",
          coverImgUrl: "",
        },
        {
          id: "b3",
          title: "The Old Man And The Sea",
          autor: "Ernest Hemingway",
          coverImgUrl: "",

        },
      ],
      mode: BooksListMode.DEFAULT,
      onBookButtonClick: () => {/**/},
    };

    const booksListElement = mount(
      <Provider store={store}>
        <BooksList {...props} />
      </Provider>
    );

    const booksList = booksListElement.find(`ul[data-test="list"]`);
    const booksListItems = booksList.children();

    expect(booksListElement.length).toBe(1);
    expect(booksList.length).toBe(1);
    expect(booksListItems.length).toBe(3);
    expect(booksListItems.at(1).text()).toContain(`The Adventures of Sherlock Holmes`);
    expect(booksListItems.at(1).text()).toContain(`Arthur Conan Doyle`);

    let moreButton = booksListItems.at(1).find(`button.item-button--more`);
    let deleteButton = booksListItems.at(1).find(`button.item-button--delete`);
    expect(moreButton.length).toBe(1);
    expect(moreButton.is(`[disabled=true]`)).toBeFalsy();
    expect(deleteButton.length).toBe(1);
    expect(deleteButton.is(`[disabled=true]`)).toBeTruthy();

    moreButton = booksListItems.at(2).find(`button.item-button--more`);
    deleteButton = booksListItems.at(2).find(`button.item-button--delete`);
    expect(booksListItems.at(2).text()).toContain(`The Old Man And The Sea`);
    expect(booksListItems.at(2).text()).toContain(`Ernest Hemingway`);
    expect(moreButton.length).toBe(1);
    expect(moreButton.is(`[disabled=true]`)).toBeFalsy();
    expect(deleteButton.length).toBe(1);
    expect(deleteButton.is(`[disabled=true]`)).toBeFalsy();

    booksListElement.unmount();
  });
});
