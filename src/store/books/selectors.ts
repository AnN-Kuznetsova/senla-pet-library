import {RootStateType} from "../..";
import type {BookType, ErrorType} from "../../types";


const getBooks = (state: RootStateType): BookType[] => state.books.list;

const getBooksStatus = (state: RootStateType): string | null => state.books.status;

const getBooksLoadError = (state: RootStateType): ErrorType | null => state.books.loadError;

const getBooksDeleteError = (state: RootStateType): ErrorType | null => state.books.deleteError;

const getBooksAddNewError = (state: RootStateType): ErrorType | null => state.books.addNewError;


export {
  getBooks,
  getBooksStatus,
  getBooksLoadError,
  getBooksDeleteError,
  getBooksAddNewError,
};
