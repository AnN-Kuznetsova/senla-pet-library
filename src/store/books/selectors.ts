import {RootStateType} from "../..";
import type {BookType, ErrorType} from "../../types";


const getBooks = (state: RootStateType): BookType[] => state.books.list;

const getBooksOperation = (state: RootStateType): string | null => state.books.operation;

const getBooksStatus = (state: RootStateType): string | null => state.books.status;

const getBooksError = (state: RootStateType): ErrorType | null => state.books.error;

const getBookById = (id: string | null) => (state: RootStateType): BookType | null => {
  const book: BookType = state.books.list.find((book) => book.id === id);
  return book || null;
};


export {
  getBooks,
  getBooksOperation,
  getBooksStatus,
  getBooksError,
  getBookById,
};
