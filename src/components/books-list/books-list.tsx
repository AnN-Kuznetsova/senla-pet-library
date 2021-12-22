import * as React from "react";
import {List, ListItem} from "@mui/material";

import {BooksListItem} from "../books-list-item";
import {BooksFilterForm} from "../books-filter-form";
import type {BookType} from "../../types";


interface PropsType {
  books: BookType[],
  mode: BooksListMode,
  onBookButtonClick: (prop: unknown) => void,
}


export enum BooksListMode {
  DEFAULT = `DEFAULT`,
  BOOK_CHOICE = `BOOK_CHOICE`,
  TAKED_BOOKS = `TAKED_BOOK`,
}


export const BooksList: React.FC<PropsType> = (props: PropsType) => {
  const {
    books,
    mode,
    onBookButtonClick,
  } = props;

  const isFilters = mode === BooksListMode.DEFAULT || mode === BooksListMode.BOOK_CHOICE;

  return (
    <>
      {isFilters && <BooksFilterForm />}

      <List>{
        books.map((book, index) => {
          return (
            <ListItem key={index + book.id}>
              <BooksListItem
                book={book}
                mode={mode}
                onBookButtonClick={onBookButtonClick}
              />
            </ListItem>
          )
        })
      }</List>
    </>
  );
};
