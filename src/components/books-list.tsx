import * as React from "react";
import {List, ListItem, ListItemText} from "@mui/material";
import {useDispatch} from "react-redux";

import {BookModal} from "./book-modal";
import {ItemButton} from "./item-button";
import {deleteBook} from "../store/books/books";
import type {BookType} from "../types";
import { Info, InfoType } from "./info";


interface PropsType {
  books: BookType[],
  openModal: (children: React.ReactElement) => void,
  closeModal: () => void,
}


export const BooksList: React.FC<PropsType> = (props: PropsType) => {
  const {
    books,
    openModal,
    closeModal,
  } = props;

  const dispatch = useDispatch();

  const handleDeleteBookButtonClick = (bookId: string) => {
    openModal(<Info type={InfoType.WAIT} />); 
    dispatch(deleteBook({
      bookId,
      cb: closeModal,
    }));
  };

  const handleMoreButtonClick = (book: BookType) => {
    openModal(<BookModal bookId={book.id} />);
  };

  return (
    <List>{
      books.map((book, index) => (
        <ListItem key={index + book.id}>
          <ListItemText
            primary={book.title}
            secondary={book.autor}
            style={{color: `${book.isTaken ? `red` : `black`}`}}
          />
          <ItemButton
            onClick={handleMoreButtonClick.bind(null, book)}
            className="item-button--more"
          />
          <ItemButton
            onClick={handleDeleteBookButtonClick.bind(null, book.id)}
            isDisabled={book.isTaken ? true : false}
            className="item-button--delete"
          />
        </ListItem>
      ))
    }</List>
  );
};
