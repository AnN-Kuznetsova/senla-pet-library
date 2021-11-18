import {BookType, ErrorType} from "../../types";
import {RootStateType} from "../..";


const getBooks = (state: RootStateType): BookType[] => state.books.list;

const getBooksStatus = (state: RootStateType): string | null => state.books.status;

const getBooksFetchError = (state: RootStateType): ErrorType | null => state.books.fetchError;

const getBooksDeleteError = (state: RootStateType): ErrorType | null => state.books.deleteError;

const getBooksAddNewError = (state: RootStateType): ErrorType | null => state.books.addNewError;


export {
  getBooks,
  getBooksStatus,
  getBooksFetchError,
  getBooksDeleteError,
  getBooksAddNewError,
};
