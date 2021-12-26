import * as React from "react";
import {List, ListItem} from "@mui/material";

import {BooksListItem} from "../books-list-item";
import {getFilteredBooks, getFilteredEntities} from "../../utils";
import {useBooksFilter} from "../books-filter-form";
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

  const {
    renderBooksFilter,
    getBooksFilter,
  } = useBooksFilter();

  const [filters, setFilters] = React.useState(getBooksFilter());
  const [filteredBooks, setFilteredBooks] = React.useState(getFilteredBooks(books, filters));

  const isFilters = mode === BooksListMode.DEFAULT || mode === BooksListMode.BOOK_CHOICE;

  React.useEffect(() => {
    setFilters((filters) => {
      const newFilters = getBooksFilter();

      if (filters != newFilters) {
        return newFilters;
      }

      return filters;
    });
  }, [filters, getBooksFilter]);

  React.useEffect(() => {
    setFilteredBooks(getFilteredBooks(books, filters));
  }, [books, filters]);

  return (
    <>
      {isFilters && renderBooksFilter()}

      <List>{
        filteredBooks.map((book, index) => {
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
