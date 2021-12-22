import {createSelector} from "reselect";

import {booksSelectors} from "./books";
import {getReaders} from "../readers/selectors";
import type {RootStateType} from "../..";
import type {BookTakenStatusType, BookType, ErrorType} from "../../types";


const getBooks = (state: RootStateType): BookType[] => booksSelectors.selectAll(state) as BookType[];

const getBooksOperation = (state: RootStateType): string | null => state.books.operation;

const getBooksStatus = (state: RootStateType): string | null => state.books.status;

const getBooksError = (state: RootStateType): ErrorType | null => state.books.error;

const getBookById = (id: string | null) => (state: RootStateType): BookType | null =>
  booksSelectors.selectById(state, id) as BookType || null;

const getBooksByIds = (ids: string[]) => (state: RootStateType): BookType[] =>
  ids.map((id) => getBookById(id)(state));

const getTakenStatusById = createSelector(
  [
    getReaders,
    (state, id: string) => id,
  ],
  (readers, id) => {
    let takenStatus: BookTakenStatusType = null;

    readers.find((reader) => reader.books.find((book) => {
      if (book.id === id) {
        takenStatus = book;
      }
    }
    ));

    return takenStatus;
  }
);

const getFreeBooks = createSelector(
  getBooks,
  getReaders,
  (books, readers) => {
    const takenBooksIds: string[] = readers.reduce((accum, reader) => accum.concat(reader.books.map((book) => book.id)), []);
    return books.filter((book) => !takenBooksIds.includes(book.id));
  }
);


export {
  getBooks,
  getBooksOperation,
  getBooksStatus,
  getBooksError,
  getBookById,
  getBooksByIds,
  getFreeBooks,
  getTakenStatusById,
};
