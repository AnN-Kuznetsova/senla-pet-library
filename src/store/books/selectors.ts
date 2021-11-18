import {BookType, ErrorType} from "../../types";
import {RootStateType} from "../..";


const getBooks = (state: RootStateType): BookType[] => state.books.list;

const getBooksStatus = (state: RootStateType): string | null => state.books.status;

const getBooksFetchError = (state: RootStateType): ErrorType | null => state.books.fetchError;

const getBooksError = (state: RootStateType): ErrorType | null => state.books.error;


export {
  getBooks,
  getBooksFetchError,
  getBooksError,
  getBooksStatus,
};
