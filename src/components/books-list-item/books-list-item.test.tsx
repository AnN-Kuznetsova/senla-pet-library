import * as React from "react";
import * as moment from "moment";
import configureStore from "redux-mock-store";
import {Provider} from 'react-redux'
import {mount, render} from "enzyme";

import {DATE_FORMAT} from "../../adapters/reader";
import {BooksListItem} from "./books-list-item";
import {BooksListMode} from "../books-list/books-list";
import {BooksStateType} from "../../store/books/books";
import {ItemButtonMode} from "../item-button/item-button";
import {ReadersStateType} from "../../store/readers/readers";


jest.mock(`react`, () => {
  const originalModule = jest.requireActual(`react`);

  return {
    ...originalModule,
    useLayoutEffect: jest.requireActual(`react`).useEffect,
  }
});

const mockStore = configureStore([]);


describe(`BooksListItem`, () => {
  test(`Should render correct when "BooksListMode" is "DEFAULT"`, () => {
    const store = mockStore({
      books: {
        ids: [],
        entities: {},
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

    const booksListItemElement = render(
      <Provider store={store}>
        <BooksListItem
          book={{
            id: `1`,
            title: `Book Title`,
            autor: `Book Autor`,
            coverImgUrl: null,
          }}
          mode={BooksListMode.DEFAULT}
          onBookButtonClick={()=>{/**/}}
        />
      </Provider>
    );

    expect(booksListItemElement.length).toBe(3);
    expect(booksListItemElement).toMatchSnapshot();
    expect(booksListItemElement.text()).toContain(`Book Title`);
    expect(booksListItemElement.text()).toContain(`Book Autor`);
  });

  test(`Should render correct when "BooksListMode" is "BOOK_CHOICE"`, () => {
    const booksState: BooksStateType = {
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
    };
    const readersState: ReadersStateType = {
      ids: ["r1"],
      entities: {
        r1: {
          id: "r1",
          name: "Reader 1",
          age: "25",
          books: [{
            id: "b2",
            dateOfTaking: moment("2021-10-31", DATE_FORMAT),
          }],
        },
      },
      operation: null,
      status: null,
      error: null,
    };

    const store = mockStore({
      books: booksState,
      readers: readersState,
    });

    const booksListItemElement = mount(
      <Provider store={store}>
        <BooksListItem
          book={booksState.entities.b3}
          mode={BooksListMode.BOOK_CHOICE}
          onBookButtonClick={()=>{/**/}}
        />
      </Provider>
    );

    expect(booksListItemElement.length).toBe(1);
    expect(booksListItemElement).toMatchSnapshot();
    expect(booksListItemElement.children().at(0).children().length).toBe(2);
    expect(booksListItemElement.text()).toContain(`The Old Man And The Sea`);
    expect(booksListItemElement.text()).toContain(`Ernest Hemingway`);

    const itemButtons = booksListItemElement.find(`.item-button`);
    expect(itemButtons.at(0).hasClass(ItemButtonMode.ON_RIGHT)).toBeTruthy();
  });

  test(`Should render correct when "BooksListMode" is "TAKED_BOOKS"`, () => {
    const booksState: BooksStateType = {
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
    };
    const readersState: ReadersStateType = {
      ids: ["r1"],
      entities: {
        r1: {
          id: "r1",
          name: "Reader 1",
          age: "25",
          books: [{
            id: "b2",
            dateOfTaking: moment("2021-10-31", DATE_FORMAT),
          }],
        },
      },
      operation: null,
      status: null,
      error: null,
    };

    const store = mockStore({
      books: booksState,
      readers: readersState,
    });

    //Date.now = jest.fn(() => new Date(Date.UTC(2022, 1, 14)).valueOf());
    //Date.now = jest.fn(() => new Date('2021-10-31').valueOf());
    Date.now = jest.fn()
      .mockReturnValueOnce(new Date(`2022-3-14`).valueOf())
      .mockReturnValueOnce(new Date(`2021-10-31`).valueOf())
      .mockReturnValue(new Date().valueOf());

    {
      const booksListItemElement = mount(
        <Provider store={store}>
          <BooksListItem
            book={booksState.entities.b2}
            mode={BooksListMode.TAKED_BOOKS}
            onBookButtonClick={()=>{/**/}}
          />
        </Provider>
      );

      const children = booksListItemElement.children().at(0).children();

      expect(booksListItemElement.length).toBe(1);
      expect(booksListItemElement).toMatchSnapshot();
      expect(children.length).toBe(3);
      expect(booksListItemElement.text()).toContain(`The Adventures of Sherlock Holmes`);
      expect(booksListItemElement.text()).toContain(`Arthur Conan Doyle`);
      expect(booksListItemElement.find(`.item-button`).at(0).hasClass(ItemButtonMode.WARNING)).toBeTruthy();
      expect(children.at(1).text()).toContain(`31 October 2021`);
      expect(children.at(1).text()).toContain(`for 3 months`);
      booksListItemElement.unmount();
    }

    {
      const booksListItemElement = mount(
        <Provider store={store}>
          <BooksListItem
            book={booksState.entities.b2}
            mode={BooksListMode.TAKED_BOOKS}
            onBookButtonClick={()=>{/**/}}
          />
        </Provider>
      );

      const children = booksListItemElement.children().at(0).children();
      expect(children.at(1).text()).toContain(`31 October 2021`);
      console.log(moment());

      expect(children.at(1).text()).toContain(`after a month`);
      booksListItemElement.unmount();
    }
  });
});
