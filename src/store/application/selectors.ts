import {createSelector} from "reselect";

import {getBooks} from "../books/selectors";
import type {BookType} from "../../types";
import type {FilterType} from "./application";
import type {RootStateType} from "../..";


const getBooksFilters = (state: RootStateType): FilterType => state.application.booksFilters;

const getFilteredBooks = createSelector(
  getBooks,
  getBooksFilters,
  (books: BookType[], booksFilters: FilterType): BookType[] => {
    let filteredBooks = books;

    for (const filter in booksFilters) {
      if (Object.prototype.hasOwnProperty.call(booksFilters, filter)) {
        const filterValue = booksFilters[filter];

        if (filterValue) {
          filteredBooks = filteredBooks.filter((book): boolean => {
            const bookFilterValue: string = <string>book[filter];
            return bookFilterValue.toLowerCase().includes(filterValue.toLowerCase());
          });
        }
      }
    }

    return filteredBooks;
  }
);


export {
  getBooksFilters,
  getFilteredBooks,
};
