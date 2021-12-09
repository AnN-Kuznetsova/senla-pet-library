import * as React from "react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { DecoratorFn} from "@storybook/react";

import { createBooks } from "../../adapters/book";


const mockStore = configureStore([]);

const store = mockStore({
  books: {
    list: createBooks(
      [
        {
          "id": "b1",
          "title": "The Hound of the Baskervilles",
          "autor": "Arthur Conan Doyle",
          "coverImgUrl": "./assets/img/hound.jpg",
          "dateOfTaking": "2021-11-20"
        },
        {
          "id": "b2",
          "title": "The Adventures of Sherlock Holmes",
          "autor": "Arthur Conan Doyle",
          "coverImgUrl": "./assets/img/Adventures_of_sherlock_holmes.jpg",
          "dateOfTaking": "2021-09-20"
        },
        {
          "id": "b3",
          "title": "The Old Man And The Sea",
          "autor": "Ernest Hemingway",
          "coverImgUrl": "./assets/img/old_man_and_sea_book.jpg",
          "dateOfTaking": "2021-10-31"
        },
        {
          "id": "b4",
          "title": "Robinson Crusoe",
          "autor": "Daniel Defoe",
          "coverImgUrl": "./assets/img/Robinson_Cruose_1719_1st_edition.jpg",
          "dateOfTaking": null
        },
        {
          "id": "b5",
          "title": "Jane Eyre",
          "autor": "Charlotte Bronte",
          "coverImgUrl": "./assets/img/Jane_Eyre.jpg",
          "dateOfTaking": null
        }
      ]
    ),
  }
});


export const withMockRedux: DecoratorFn = (Story) => {
  return (
    <Provider store={store}>
      <Story />
    </Provider>
  );
};
