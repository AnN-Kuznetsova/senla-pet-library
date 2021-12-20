import * as React from "react";
import {List, ListItem} from "@mui/material";

import {BooksListItem} from "../books-list-item";
import {BooksFilterForm} from "../books-filter-form";
import type {BookType} from "../../types";


interface PropsType {
  books: BookType[],
  openModal: (children: React.ReactElement) => void,
}


export const BooksList: React.FC<PropsType> = (props: PropsType) => {
  const {
    books,
    openModal,
  } = props;

  return (
    <>
      <BooksFilterForm />
      <List>{
        books.map((book, index) => {
          return (
            <ListItem key={index + book.id}>
              <BooksListItem
                book={book}
                openModal={openModal}
              />
            </ListItem>
          )
        })
      }</List>
    </>
  );
};
