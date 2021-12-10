import {booksSelectors} from "./books";
import type {RootStateType} from "../..";
import type {BookType, ErrorType} from "../../types";


const getBooks = (state: RootStateType): BookType[] => booksSelectors.selectAll(state) as BookType[];

const getBooksOperation = (state: RootStateType): string | null => state.books.operation;

const getBooksStatus = (state: RootStateType): string | null => state.books.status;

const getBooksError = (state: RootStateType): ErrorType | null => state.books.error;

const getBookById = (id: string | null) => (state: RootStateType): BookType | null =>
  booksSelectors.selectById(state, id) as BookType || null;


export {
  getBooks,
  getBooksOperation,
  getBooksStatus,
  getBooksError,
  getBookById,
};
