import * as React from "react";
import {List, ListItem, Typography} from "@mui/material";
import {useEffect, useState} from "react";

import {BooksListItem} from "../books-list-item";
import {getFilteredEntities} from "../../utils";
import {useBooksFilter} from "../books-filter-form";
import type {BookType} from "../../types";


export enum BooksListMode {
  DEFAULT = `DEFAULT`,
  BOOK_CHOICE = `BOOK_CHOICE`,
  TAKED_BOOKS = `TAKED_BOOK`,
}


interface PropsType {
  books: BookType[],
  mode: BooksListMode,
  onBookButtonClick: (prop: unknown) => void,
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

  const [filter, setFilter] = useState(getBooksFilter());
  const [filteredBooks, setFilteredBooks] = useState(getFilteredEntities(books, filter));

  const isFilter = mode === BooksListMode.DEFAULT || mode === BooksListMode.BOOK_CHOICE;

  useEffect(() => {
    setFilter((filter) => {
      const newFilter = getBooksFilter();

      if (filter != newFilter) {
        return newFilter;
      }

      return filter;
    });
  }, [filter, getBooksFilter]);

  useEffect(() => {
    setFilteredBooks(getFilteredEntities(books, filter));
  }, [books, filter]);

  return (
    <>
      {!filteredBooks.length && <Typography variant="h4">
        There are no books on the list.
      </Typography>}

      {!!filteredBooks.length && isFilter && renderBooksFilter()}

      {!!filteredBooks.length &&
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
      }
    </>
  );
};
