import {createSelector} from "reselect";

import {getBooks} from "../books/selectors";
import type {BookType} from "../../types";
import type {BooksFiltersType} from "./application";
import type {RootStateType} from "../..";


const getBooksFilters = (state: RootStateType): BooksFiltersType => state.application.booksFilters;

const getFilteredBooks = createSelector(
  getBooks,
  getBooksFilters,
  (books, booksFilters): BookType[] => {
    let filteredBooks: BookType[] = [];

    if (booksFilters.title) {
      filteredBooks = books.filter((book) => book.title.toLowerCase().includes(booksFilters.title.toLowerCase()));
    } else {
      filteredBooks = books;
    }

    if (booksFilters.autor) {
      filteredBooks = filteredBooks.filter((book) => book.autor.toLowerCase().includes(booksFilters.autor.toLowerCase()));
    }

    return filteredBooks;
  }
);


export {
  getBooksFilters,
  getFilteredBooks,
};
