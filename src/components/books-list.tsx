import * as React from "react";
import {List, ListItem, ListItemText} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";

import {BookModal} from "./book-modal";
import {BookType} from "../types";
import {ItemButton} from "./item-button";
import {Wait} from "./wait";
import {deleteBook} from "../store/books/books";
import {getBooks} from "../store/books/selectors";


interface PropsType {
  openModal: (children: React.ReactElement) => void,
  closeModal: () => void,
}


export const BooksList: React.FC<PropsType> = (props: PropsType) => {
  const dispatch = useDispatch();
  const books = useSelector(getBooks);
  const {
    openModal,
    closeModal,
  } = props;

  const handleDeleteBookButtonClick = (bookId: string) => {
    openModal(<Wait />);
    dispatch(deleteBook({
      bookId,
      cb: closeModal,
    }));
  };

  const handleMoreButtonClick = (book: BookType) => {
    openModal(<BookModal book={book} />);
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
