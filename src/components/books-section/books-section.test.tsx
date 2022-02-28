import * as React from "react";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {mount} from "enzyme";

import {BooksSection} from "./books-section";


const mockStore = configureStore([]);
const store = mockStore({
  books: {
    ids: ["b1", "b2", "b3"],
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

      },
    },
    operation: null,
    status: null,
    error: null,
  },
  readers: {
    ids: [],
    entities: {},
    operation: null,
    status: null,
    error: null,
  },
});


describe(`BooksSection`, () => {
  test(`Should render ShowBooksButton and click for button should render the books list and books search form`, () => {
    const booksSectionElement = mount(
      <Provider store={store}>
        <BooksSection />
      </Provider>
    );

    const showBooksButton = booksSectionElement.find(`button[data-test="showBooksButton"]`);
    let listWrapper = booksSectionElement.find(`.list-wrapper`);
    let booksSearchForm = booksSectionElement.find(`form.form`);

    expect(booksSectionElement.length).toBe(1);
    expect(showBooksButton.length).toBe(1);
    expect(listWrapper.length).toBe(0);
    expect(booksSearchForm.length).toBe(0);

    showBooksButton.simulate(`click`);
    booksSectionElement.update();
    listWrapper = booksSectionElement.find(`.list-wrapper`);
    booksSearchForm = booksSectionElement.find(`form.form`);

    expect(listWrapper.length).toBe(1);
    expect(booksSearchForm.length).toBe(1);

    booksSectionElement.unmount();
  });
});
