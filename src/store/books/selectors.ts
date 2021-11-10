import {BookType, ErrorType} from "../../types";
import {RootState} from "../store";


const getBooks = (state: RootState): BookType[] => state.books.list;

const getBooksStatus = (state: RootState): string | null => state.books.status;

const getBooksError = (state: RootState): ErrorType | null => state.books.error;


export {
  getBooks,
  getBooksError,
  getBooksStatus,
};
